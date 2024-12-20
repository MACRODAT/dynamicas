// store.ts
import rootReducer from './reducers/reducer';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { afterRequest, checkLogin, generateConfigToken, remote_addr, resendLogin } from '../firebase';
import { userDisconnect } from './logic/userLogic';
import { INCREMENT_PRIORITY, isFlightAction } from './parameters';
import { AirfoilType } from '../types';
import { SET_USER_DISCONNECT } from './user';
import axios from 'axios';
import { config } from 'process';
import { SET_GEOMETRY_AIRFOIL_NAME, SET_GEO_UNDONE, isAllGeometryAction } from './geometry';

const persistConfig = {
  key: 'root',
  storage,
  // blacklist: ['user.relogin'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer as any);

let relogin_ = true;
let trials = 3;


const logger = (store: any) => (next: any) => (action: any) => {
  // console.log(action.type)
  let result = next(action)
  if (isFlightAction(action.type) || isAllGeometryAction(action.type))
  {
    let st = store.getState();
    // console.log(st)
    // send the data to python
    const p = st.parameters
    if (action.type == INCREMENT_PRIORITY)
    {
      return result
    }
    if (isAllGeometryAction(action.type) && action.type != SET_GEOMETRY_AIRFOIL_NAME)
    {
      return result;
    }
    let geometry_dat = []
    if (action.type == SET_GEOMETRY_AIRFOIL_NAME)
    {
      if (action.payload && action.payload.name != "")
      {
        if (action.data.length > 0)
        {
          return Response;
        }
        axios.get(`http://${remote_addr}/airfoil/${action.payload.name}/dat`).then((data_txt) => {
          if (data_txt.status == 200)
          {
            geometry_dat = data_txt.data
            axios.post(`http://${remote_addr}/myprojects/${st.user.project}/airfoilData`,
            {
              name: st.user.project,
              airfoilName: action.payload.name,
              airfoilData: geometry_dat
            }, generateConfigToken(st.user.jwt_token_)).then((res) => {
              console.log(res)
              if (res.status == 200 && res.data.success)
              {

              }
              else
              {
                store.dispatch({type: SET_GEO_UNDONE})
              }
            }).catch((err_) => {
              console.log(err_);
              store.dispatch({type: SET_GEO_UNDONE})
            })
          }
        })
      }
      return result;
    }
    fetch(`http://${remote_addr}/myprojects/${st.user.project}/comms`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
          'Authorization': `Bearer ${st.user.jwt_token_}`
        },
        body: JSON.stringify({
          name: st.user.project,
          ...st.geometrySelectedAirfoil,
          ...p
        })
    }).then((val: any) => {
      console.log(val)
      store.dispatch({type: INCREMENT_PRIORITY})
      // afterRequest(val)
    }).catch((err: any) => {
      // console.log(err)
    })
  }
  // console.log('next state', store.getState())
  return result
}

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // necessary for redux-persist
    }).concat(logger),
});

const persistor = persistStore(store, null, () => {
  // after rehydration
  // console.log(store.getState())
  let userReq = (store.getState() as any).user.user;
  let obj = {
    firstname: userReq.firstname,
    lastname: userReq.lastname,
    email: userReq.email,
    firebase: true,
    avatar: userReq.avatar,
    password: userReq.uid,
    // loginSuccess: true,
  }
  // console.log(obj)
  checkLogin((store.getState() as any).user.jwt_token_).then((val) => {
    if (!val)
    {
      let timer = setInterval(() => {
        // console.log("Recalled ", trials, "  ", relogin_)
        if (trials == 0)
        {
          clearInterval(timer)
          store.dispatch(userDisconnect(true) as any)
          return;
        }
        else if (!relogin_)
        {
          return;
        }
        resendLogin(obj).then((ful : any) => {
          if (ful == null)
          {
            trials -= 1;
            relogin_ = true;
          }else {
            trials = 3;
            relogin_ = false;
          }
          return; 
        }, (rej) => {
          relogin_ = true;
          trials -= 1;
          return; 
        })
      }, 4000)
    }
  })

  
  // store.dispatch(reloginUser((store.getState() as any).user.user) as any)
});

export { store, persistor };
