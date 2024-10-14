// actions.ts
export const SET_MENU = 'SET_MENU';
export const SET_SUBMENUS = 'SET_SUBMENUS';
export const ADD_SUBMENUS = 'ADD_SUBMENUS';
export const SET_OTHER_PARAMS = 'SET_OTHER_PARAMS';
export const SET_THEME = 'SET_THEME';


// Action to set the current menu
export const setMenu = (menu: string) => ({
  type: SET_MENU,
  payload: menu,
});

// Action to set the submenus
export const setSubmenus = (submenus: string[]) => ({
  type: SET_SUBMENUS,
  payload: submenus,
});

// Action to set the submenus
export const addSubmenu = (submenu: string, level: number) => ({
  type: ADD_SUBMENUS,
  payload: submenu,
  level: level,
});

// Action to set other parameters (key-value pairs)
export const setOtherParams = (otherParams: { [key: string]: string }) => ({
  type: SET_OTHER_PARAMS,
  payload: otherParams,
});

// Action to set the theme
export const setTheme = (theme: string) => ({
  type: SET_THEME,
  payload: theme,
});
