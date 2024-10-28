import { AirfoilType, aircraftPriorities } from "../../types";
import { ParametersActions, SET_AIRFOIL_TYPE, SET_ANGLE_OF_ATTACK, SET_FLIGHT_TIME_EXPECTED, SET_FLIGHT_TIME_MARGINS, SET_MAX_FUSELAGE, SET_MAX_WINGSPAN, SET_PAYLOAD_WEIGHT, SET_PRIORITIES, SET_SIMULATION_TYPE, SET_SPEED_EXPECTED, SET_SPEED_MARGINS, SET_STREAM_VELOCITY_2D, SET_WEIGHT_EXPECTED, SET_WEIGHT_MARGINS } from "../parameters";



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
	doneInitialSketch: boolean;
	simulationType: string,
	priorities: aircraftPriorities;
}
  
  const initialParametersState: ParametersState = {
	flightTime: { margins: 0, expected: 0 },
	weight: { margins: 0, expected: 0 },
	speed: { margins: 0, expected: 0 },
	airfoilType: AirfoilType.Airfoil,
	done: false,
	doneInitialSketch: false,
	simulationType: '',
	angleOfAttack: -1,
	streamVelocityX: -100,
	payloadWeight: 0.1,
	wingSpanMax: 100,
	fuselageLengthMax: 60,
	priorities: {
		maneuverability: 3,
		stability: 3,
		payload: 3,
		speed: 3,
		endurance: 3,
		stallBehavior: 3,
		manufacturability: 3,
	}
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

  const b = (v: number, min_: number,max_: number): boolean => {
	return v > min_ && v < max_;
  }

  const max__ = (a: number, b: number): number => {
	return a > b? a : b; 
  }
  
  const CheckDoneInitialSketch = (e: ParametersState): boolean => {
	// console.log(e)
	return (
		b(e.flightTime.expected, 0, 300) &&
		b(e.speed.expected, 0, 200) &&
		b(e.fuselageLengthMax, 0, 301) && 
		b(e.wingSpanMax, 0, 401) && 
		b(e.payloadWeight, 0, 10.1) && 
		b(e.weight.expected, 0, 20) 
	)
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
		  doneInitialSketch: CheckDoneInitialSketch(state), 
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
		  doneInitialSketch: CheckDoneInitialSketch(state),
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
		return {...state, 
				doneInitialSketch: CheckDoneInitialSketch(state), 
				payloadWeight: action.payload, 
				weight: 
					{
						expected: max__(action.payload * 1.5, state.weight.expected),
						margins: state.weight.margins
					}
				}
	  case SET_MAX_FUSELAGE:
		return {...state, doneInitialSketch: CheckDoneInitialSketch(state), fuselageLengthMax: action.payload}
	  case SET_MAX_WINGSPAN:
		return {...state, doneInitialSketch: CheckDoneInitialSketch(state), wingSpanMax: action.payload}
	  case SET_PRIORITIES:
		return {...state, priorities: action.payload}
	  default:
		return state;
	}
  }
  