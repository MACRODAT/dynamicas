import { ParametersActions, SET_ANGLE_OF_ATTACK, SET_FLIGHT_TIME_EXPECTED, SET_MAX_FUSELAGE, SET_MAX_WINGSPAN, SET_PAYLOAD_WEIGHT, SET_SIMULATION_TYPE, SET_SPEED_EXPECTED, SET_STREAM_VELOCITY_2D, SET_WEIGHT_EXPECTED } from '../parameters';


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

// Action Creators
export const parametersSetFlightTime = (time_: number): ParametersActions => {

	return {
		type: SET_FLIGHT_TIME_EXPECTED,
		payload: time_,
	};
};

// Action Creators
export const parametersSetFlightSpeed = (speed: number): ParametersActions => {

	return {
		type: SET_SPEED_EXPECTED,
		payload: speed,
	};
};

export const parametersSetPayloadWeight = (minPayload: number): ParametersActions => {
	return {
		type: SET_PAYLOAD_WEIGHT,
		payload: minPayload,
	};
};

export const parametersSetWingspan = (val: number): ParametersActions => {
	return {
		type: SET_MAX_WINGSPAN,
		payload: val,
	};
};

export const parametersSetFuselage = (val: number): ParametersActions => {
	return {
		type: SET_MAX_FUSELAGE,
		payload: val,
	};
};

export const parametersSetExpectedWeight = (val: number): ParametersActions => {
	return {
		type: SET_WEIGHT_EXPECTED,
		payload: val,
	};
};
