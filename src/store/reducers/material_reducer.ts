import { MaterialType } from "../../types";
import { MaterialActions, SET_CUSTOM_DENSITY, SET_MATERIAL } from "../material";

export interface MaterialState {
	material: MaterialType;
	customDensity: number;
	done: boolean;
  }
  
  const initialMaterialState: MaterialState = {
	material: MaterialType.ANY,
	customDensity: 0,
	done: false,
  };
  
  const checkDone = (e: MaterialState): boolean => {
	// console.log(e, e.customDensity > 0 && e.customDensity < 10000 && e.material != MaterialType.ANY)
	return (e.customDensity > 0 && e.customDensity < 10000 && e.material != MaterialType.ANY)
  }

  export function materialReducer(
	state = initialMaterialState,
	action: MaterialActions
  ): MaterialState {
	switch (action.type) {
	  case SET_MATERIAL:
		let customDensity_;
		switch (action.payload) {
			case MaterialType.ABS:
			  customDensity_ = 1050;
			  break;
			case MaterialType.PLA:
			  customDensity_ = 1250;
			  break;
			case MaterialType.Aluminum:
			  customDensity_ = 2710;
			  break;
			case MaterialType.PETG:
			  customDensity_ = 1300;
			  break;
			case MaterialType.NYLON:
			  customDensity_ = 1140;
			  break;
			default:
			  customDensity_ = 0;
		}
		return { ...state, done: checkDone({...state, material: action.payload, customDensity: customDensity_}), 
			material: action.payload, customDensity: customDensity_};
	  case SET_CUSTOM_DENSITY:
		return { ...state, done: checkDone(state), customDensity: action.payload };
	  default:
		return state;
	}
}
