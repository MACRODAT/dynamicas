import { ParametersActions, SET_SIMULATION_TYPE } from '../parameters';


// Action Creators
export const parametersSimulationType = (type_: string): ParametersActions => {

	return {
		type: SET_SIMULATION_TYPE,
		payload: type_,
	};
};
