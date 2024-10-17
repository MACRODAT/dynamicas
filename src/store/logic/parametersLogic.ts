import { ParametersActions, SET_ANGLE_OF_ATTACK, SET_SIMULATION_TYPE, SET_STREAM_VELOCITY_2D } from '../parameters';


// Action Creators
export const parametersSimulationType = (type_: string): ParametersActions => {

	return {
		type: SET_SIMULATION_TYPE,
		payload: type_,
	};
};

// Action Creators
export const parametersIncomingStream2D = (speed: number): ParametersActions => {

	return {
		type: SET_STREAM_VELOCITY_2D,
		payload: speed,
	};
};

// Action Creators
export const parametersAngleOfAttacl = (angle: number): ParametersActions => {

	return {
		type: SET_ANGLE_OF_ATTACK,
		payload: angle,
	};
};
