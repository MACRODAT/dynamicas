// store.ts
import rootReducer from './reducers/reducer';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { resendLogin } from '../firebase';
import { userDisconnect } from './logic/userLogic';
import { isFlightAction } from './parameters';

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
  if (isFlightAction(action.type))
  {
    let st = store.getState();
    // console.log(st)
    // send the data to python
    fetch("")
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
  console.log(obj)
  resendLogin(obj)

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
  // store.dispatch(reloginUser((store.getState() as any).user.user) as any)
});

export { store, persistor };
