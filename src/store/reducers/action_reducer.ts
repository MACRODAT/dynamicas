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

const chooseTheme = (theme: string): { [key: string]: string} => {
  
  if (theme == 'blue sky')
  {
    return {
      'primary-color': '#903829',
      'back-100': '#060836',
      'back-200': '#1a1d59e5',
      'back-300': '#0f157ebe',
      'green-100': '#0f7e18be',
      'front-100': '#f0f9f9',
      'front-200': '#fafafa',
      'front-300': '#d7d7d7',
      'front-400': '#a5a5a5',
      'front-500': '#757575',
    }
  }
  else if (theme == 'black space')
  {
    return {
      'primary-color': '#0f0809',
      'back-100': '#060006',
      'back-200': '#151716',
      'back-300': '#212321',
      'back-400': '#393A37',
      'back-500': '#686963',
      'green-100': '#149E59',
      'front-100': '#E3E3E3',
      'front-200': '#FAFAFA',
      'front-300': '#E3F2FD',
      'front-400': '#CEDBE5',
      'front-500': '#B9C4CC',
    }
  }
  return {

  }
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
  themeSchema: chooseTheme('blue sky')
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
        themeSchema: chooseTheme(action.payload)
      };

    default:
      return state;
  }
};

export default applicationReducer;
