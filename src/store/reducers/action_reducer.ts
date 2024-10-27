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
  else if (theme == 'green park')
  {
    return {
      'primary-color': '#0f0809',
      'back-100': '#D2DEE7',
      'back-200': '#CEDBE5',
      'back-300': '#C6D4DB',
      'back-400': '#BECCD1',
      'back-500': '#ADBCBC',
      'green-100': '#149E59',
      'front-100': '#0C0C0C',
      'front-200': '#0C0C0C',
      'front-300': '#2D4526',
      'front-400': '#475C41',
      'front-500': '#8B9C93',
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
      let subs: any = Object.assign([], state.submenus);
      if (subs.length >= action.level){

        subs[action.level] = (action.payload);
        subs = subs.slice(0, action.level + 1);
      }
      else
      {
        subs.push(action.payload);
      }
      historyManager.set(state.menu, subs);
      // console.log(historyManager.get(state.menu))
      return {
        ...state,
        submenus: subs,
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
