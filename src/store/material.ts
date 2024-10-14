import { MaterialType } from "../types";

export const SET_MATERIAL = 'SET_MATERIAL';
export const SET_CUSTOM_DENSITY = 'SET_CUSTOM_DENSITY';

interface SetMaterialAction {
  type: typeof SET_MATERIAL;
  payload: MaterialType;
}

interface SetCustomDensityAction {
  type: typeof SET_CUSTOM_DENSITY;
  payload: number;
}

export type MaterialActions = SetMaterialAction | SetCustomDensityAction;
