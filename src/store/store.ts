// store.ts
import { createStore } from 'redux';
import rootReducer from './reducers/reducer';

const store = createStore(
  rootReducer,
  // Redux DevTools extension for debugging in browser
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
