import { ADD_SUBMENUS, AppActions, SET_MENU, SET_OTHER_PARAMS, SET_SUBMENUS, SET_THEME } from '../action';
import { SET_GEOMETRY_TYPE } from '../geometry';
import { geometrySetClass } from './geometryLogic';


// Action Creators
export const setMenu = (menu: string): AppActions => {

	return {
		type: SET_MENU,
		payload: menu,
	};
};


export const addSubmenu = (submenu: string, level: number): AppActions => {

	return {
		type: ADD_SUBMENUS,
		payload: submenu,
		level: level,
	}
};
  
  export const setGeometryType = (type: string): AppActions => ({
	type: SET_GEOMETRY_TYPE,
	payload: type,
  });
  
  export const setSubmenus = (submenus: string[]): AppActions => ({
	type: SET_SUBMENUS,
	payload: submenus,
  });

  
  export const setOtherParams = (otherParams: { [key: string]: string }): AppActions => ({
	type: SET_OTHER_PARAMS,
	payload: otherParams,
  });
  
  export const setTheme = (theme: string): AppActions => ({
	type: SET_THEME,
	payload: theme,
  });
  
