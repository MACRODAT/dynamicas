import { AirfoilType } from "../../types";
import { ParametersActions, SET_AIRFOIL_TYPE, SET_FLIGHT_TIME_EXPECTED, SET_FLIGHT_TIME_MARGINS, SET_SIMULATION_TYPE, SET_SPEED_EXPECTED, SET_SPEED_MARGINS, SET_WEIGHT_EXPECTED, SET_WEIGHT_MARGINS } from "../parameters";

export interface ParametersState {
	flightTime: { margins: number; expected: number };
	weight: { margins: number; expected: number };
	speed: { margins: number; expected: number };
	airfoilType: AirfoilType;
	done: boolean;
	simulationType: string,
  }
  
  const initialParametersState: ParametersState = {
	flightTime: { margins: 0, expected: 0 },
	weight: { margins: 0, expected: 0 },
	speed: { margins: 0, expected: 0 },
	airfoilType: AirfoilType.Airfoil,
	done: false,
	simulationType: ''
  };
  
  export function parametersReducer(
	state = initialParametersState,
	action: ParametersActions
  ): ParametersState {
	switch (action.type) {
	  case SET_FLIGHT_TIME_MARGINS:
		return {
		  ...state,
		  flightTime: { ...state.flightTime, margins: action.payload },
		};
	  case SET_FLIGHT_TIME_EXPECTED:
		return {
		  ...state,
		  flightTime: { ...state.flightTime, expected: action.payload },
		};
	  case SET_SIMULATION_TYPE:
		return {
			...state,
			simulationType: action.payload
		}
	  case SET_WEIGHT_MARGINS:
		return { ...state, weight: { ...state.weight, margins: action.payload } };
	  case SET_WEIGHT_EXPECTED:
		return {
		  ...state,
		  weight: { ...state.weight, expected: action.payload },
		};
	  case SET_SPEED_MARGINS:
		return { ...state, speed: { ...state.speed, margins: action.payload } };
	  case SET_SPEED_EXPECTED:
		return { ...state, speed: { ...state.speed, expected: action.payload } };
	  case SET_AIRFOIL_TYPE:
		return { ...state, airfoilType: action.payload };
	  default:
		return state;
	}
  }
  