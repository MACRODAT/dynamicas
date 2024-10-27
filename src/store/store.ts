// store.ts
import { createStore } from 'redux';
import rootReducer from './reducers/reducer';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer as any);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // necessary for redux-persist
    }),
});

// const store = createStore(
//   rootReducer,
//   // Redux DevTools extension for debugging in browser
//   (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
// );


const persistor = persistStore(store);

export { store, persistor };
