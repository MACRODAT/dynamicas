// store.ts
import { Middleware, createStore } from 'redux';
import rootReducer from './reducers/reducer';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import { reloginUser } from './logic/initialLogic';
import { SET_USER_DISCONNECT, SET_USER_RELOGIN } from './user';
import { resendLogin } from '../firebase';
import { userDisconnect } from './logic/userLogic';

const persistConfig = {
  key: 'root',
  storage,
  // blacklist: ['user.relogin'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer as any);

let relogin_ = true;
let trials = 3;


const initializationMiddleware: Middleware = (storeAPI) => (next) => (action: any) => {
  // On store creation, dispatch the initialization action
  // if (storeAPI.getState().user.relogin === true && action.type == SET_USER_RELOGIN) {
  //   storeAPI.dispatch(reloginUser(storeAPI.getState().user.user) as any);
  // }

  // ADD ANY MIDDLEWARE HERE


  return next(action);
};

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // necessary for redux-persist
    }).concat(initializationMiddleware),
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
      relogin_ = ful;
      if (ful)
      {
        trials -= 1;
      }else {
        trials = 3;
      }
      return; 
    }, (rej) => {
      relogin_ = true;
      trials -= 1;
      return; 
    })
  }, 100000)
  // store.dispatch(reloginUser((store.getState() as any).user.user) as any)
});

export { store, persistor };
