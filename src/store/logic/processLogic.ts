import { ProcessActions, PROCESS_SET_PROCESS } from "../3dprint";

export const processSetProcess = (process: string) : ProcessActions => {

	// add any relevant action here !!!

	return {
		payload: process,
		type: PROCESS_SET_PROCESS
	}
}