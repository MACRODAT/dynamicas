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
	return (e.customDensity > 0 && e.customDensity < 10000 && e.material != MaterialType.ANY)
  }

  export function materialReducer(
	state = initialMaterialState,
	action: MaterialActions
  ): MaterialState {
	switch (action.type) {
	  case SET_MATERIAL:
		state.material = action.payload;
		switch (state.material)
		{
			case MaterialType.ABS:
				state.customDensity = 1050;
				break;
			case MaterialType.PLA:
				state.customDensity = 1250;
				break;
			case MaterialType.Aluminum:
				state.customDensity = 2710;
				break;
			case MaterialType.PETG:
				state.customDensity = 1300;
				break;
				break;
			case MaterialType.NYLON:
				state.customDensity = 1.14;
				break;
			default:
				state.customDensity = 0;
		}
		return { ...state, done: checkDone(state), material: action.payload};
	  case SET_CUSTOM_DENSITY:
		return { ...state, done: checkDone(state), customDensity: action.payload };
	  default:
		return state;
	}
}
