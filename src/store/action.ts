import { SET_GEOMETRY_TYPE } from "./geometry";

// actions.ts
export const SET_MENU = 'SET_MENU';
export const SET_SUBMENUS = 'SET_SUBMENUS';
export const ADD_SUBMENUS = 'ADD_SUBMENUS';
export const SET_OTHER_PARAMS = 'SET_OTHER_PARAMS';
export const SET_THEME = 'SET_THEME';

// Action interfaces
interface SetMenuAction {
  type: typeof SET_MENU;
  payload: string;
}

interface SetGeometryTypeAction {
  type: typeof SET_GEOMETRY_TYPE;
  payload: string;
}

interface SetSubmenusAction {
  type: typeof SET_SUBMENUS;
  payload: string[];
}

interface AddSubmenuAction {
  type: typeof ADD_SUBMENUS;
  payload: string;
  level: number;
}

interface SetOtherParamsAction {
  type: typeof SET_OTHER_PARAMS;
  payload: { [key: string]: string };
}

interface SetThemeAction {
  type: typeof SET_THEME;
  payload: string;
}

// Union of all action types
export type AppActions =
  | SetMenuAction
  | SetGeometryTypeAction
  | SetSubmenusAction
  | AddSubmenuAction
  | SetOtherParamsAction
  | SetThemeAction;