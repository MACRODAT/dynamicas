import { AirfoilType } from "../../types";
import { ParametersActions, SET_AIRFOIL_TYPE, SET_ANGLE_OF_ATTACK, SET_FLIGHT_TIME_EXPECTED, SET_FLIGHT_TIME_MARGINS, SET_MAX_FUSELAGE, SET_MAX_WINGSPAN, SET_PAYLOAD_WEIGHT, SET_SIMULATION_TYPE, SET_SPEED_EXPECTED, SET_SPEED_MARGINS, SET_STREAM_VELOCITY_2D, SET_WEIGHT_EXPECTED, SET_WEIGHT_MARGINS } from "../parameters";

export interface ParametersState {
	flightTime: { margins: number; expected: number };
	weight: { margins: number; expected: number };
	speed: { margins: number; expected: number };
	payloadWeight: number;
	wingSpanMax: number;
	fuselageLengthMax: number;
	airfoilType: AirfoilType;
	streamVelocityX: number;
	angleOfAttack: number;
	done: boolean;
	simulationType: string,
}
  
  const initialParametersState: ParametersState = {
	flightTime: { margins: 0, expected: 0 },
	weight: { margins: 0, expected: 0 },
	speed: { margins: 0, expected: 0 },
	airfoilType: AirfoilType.Airfoil,
	done: false,
	simulationType: '',
	angleOfAttack: -1,
	streamVelocityX: -100,
	payloadWeight: 0.1,
	wingSpanMax: 100,
	fuselageLengthMax: 60,
  };

  const CheckDone = (e: ParametersState): boolean => {
	// console.log(e)
	if (e.simulationType == "2D")
	{
		if (e.angleOfAttack >= -90 && e.streamVelocityX >= 0 &&  e.streamVelocityX < 400)
		{
			return true;
		}
		return false;
	}
	return false;
  }
  
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
	  case SET_ANGLE_OF_ATTACK:
		state.angleOfAttack = action.payload;
		return {...state, done: CheckDone(state), angleOfAttack: action.payload}
	  case SET_SIMULATION_TYPE:
		state.simulationType = action.payload;
		return {...state, done: CheckDone(state), simulationType: action.payload}
	  case SET_STREAM_VELOCITY_2D:
		state.streamVelocityX = action.payload;
		return {...state, done: CheckDone(state), streamVelocityX: action.payload}
	  case SET_PAYLOAD_WEIGHT:
		return {...state, done: CheckDone(state), payloadWeight: action.payload}
	  case SET_MAX_FUSELAGE:
		return {...state, done: CheckDone(state), fuselageLengthMax: action.payload}
	  case SET_MAX_WINGSPAN:
		return {...state, done: CheckDone(state), wingSpanMax: action.payload}
	  default:
		return state;
	}
  }
  