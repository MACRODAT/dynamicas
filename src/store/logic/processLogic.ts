import { ProcessActions, PROCESS_SET_PROCESS, SET_NOZZLE_DIAMETER } from "../3dprint";

export const processSetProcess = (process: string) : ProcessActions => {

	// add any relevant action here !!!

	return {
		payload: process,
		type: PROCESS_SET_PROCESS
	}
}

export const processSet3DDiameter = (diameter: number) : ProcessActions => {

	// add any relevant action here !!!

	return {
		payload: diameter,
		type: SET_NOZZLE_DIAMETER
	}
}