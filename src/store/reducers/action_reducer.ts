// reducer.ts
import { SET_MENU, SET_SUBMENUS, SET_OTHER_PARAMS, SET_THEME, ADD_SUBMENUS } from '../action';

let historyManager: Map<string, string[]> = new Map<string, string[]>();

export interface ApplicationState {
  menu: string;
  submenus: string[];
  otherParams: { [key: string]: string };
  themeSchema: { [key: string]: string};
  theme: string;
}

// Define the initial state
const initialState: ApplicationState = {
  menu: 'process',
  submenus: [
    ''
  , '', '', '', ''
  ],
  otherParams: {},
  theme: 'blue sky',  // Default theme
  themeSchema: {
    'primary-color': '#903829',
    'front-200': '#839911',
    // 'back-100': '#060836',
    'back-100': '#060806'
  }
};

// Application reducer
const applicationReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_MENU:
      // console.log(historyManager.get(state.menu))
      return {
        ...state,
        submenus: historyManager.has(action.payload) ? 
          historyManager.get(action.payload) as string[] : [""],
        menu: action.payload,
      };

    case SET_SUBMENUS:
      return {
        ...state,
        submenus: action.payload,
      };
    
    case ADD_SUBMENUS:
      if (state.submenus.length >= action.level){

        state.submenus[action.level] = (action.payload);
        state.submenus = state.submenus.slice(0, action.level + 1);
      }
      else
      {
        state.submenus.push(action.payload);
      }
      historyManager.set(state.menu, state.submenus);
      // console.log(historyManager.get(state.menu))
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
