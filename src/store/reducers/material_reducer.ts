import { MaterialType } from "../../types";
import { MaterialActions, SET_CUSTOM_DENSITY, SET_MATERIAL } from "../material";

export interface MaterialState {
	material: MaterialType;
	customDensity: number;
  }
  
  const initialMaterialState: MaterialState = {
	material: MaterialType.PlasticPLA,
	customDensity: 0,
  };
  
  export function materialReducer(
	state = initialMaterialState,
	action: MaterialActions
  ): MaterialState {
	switch (action.type) {
	  case SET_MATERIAL:
		return { ...state, material: action.payload };
	  case SET_CUSTOM_DENSITY:
		return { ...state, customDensity: action.payload };
	  default:
		return state;
	}
}
  