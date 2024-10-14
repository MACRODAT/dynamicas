// reducer.ts
import { SET_MENU, SET_SUBMENUS, SET_OTHER_PARAMS, SET_THEME, ADD_SUBMENUS } from '../action';

export interface ApplicationState {
  menu: string;
  submenus: string[];
  otherParams: { [key: string]: string };
  theme: string;
}

// Define the initial state
const initialState: ApplicationState = {
  menu: 'process',
  submenus: [
    '3D print'
  , '', '', '', ''
  ],
  otherParams: {},
  theme: 'light',  // Default theme
};

// Application reducer
const applicationReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_MENU:
      return {
        ...state,
        menu: action.payload,
      };

    case SET_SUBMENUS:
      return {
        ...state,
        submenus: action.payload,
      };
    
    case ADD_SUBMENUS:
      state.submenus[action.level] = (action.payload);
      return {
        ...state,
        submenus: state.submenus,
      };

    case SET_OTHER_PARAMS:
      return {
        ...state,
        otherParams: {
          ...state.otherParams,
          ...action.payload,  // Merge the new params with the existing ones
        },
      };

    case SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };

    default:
      return state;
  }
};

export default applicationReducer;
