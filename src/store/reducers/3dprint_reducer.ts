import { PROCESS_SET_PROCESS, ProcessActions, SET_3D_PRINT, SET_FILAMENT_DIAMETER, SET_FILLING_PERCENT, SET_NOZZLE_DIAMETER, SET_PRINTING_SPEED } from "../3dprint";

export interface ProcessState {
	selectedProcess: string,
	printing: boolean;
	nozzleDiameter: number;
	printingSpeed: number;
	filamentDiameter: number;
	fillingPercent: number;
	done: boolean;
  }
  
  const initialProcessState: ProcessState = {
	selectedProcess: '',
	done: false,
	printing: false,
	nozzleDiameter: 0,
	printingSpeed: 0,
	filamentDiameter: 0,
	fillingPercent: 0,
  };

  const checkDone = (e: ProcessState): boolean => {
	console.log(e)
	return (
		e.filamentDiameter > 0 && e.filamentDiameter < 10
		&& e.nozzleDiameter > 0 && e.nozzleDiameter < 2.1
		&& e.printingSpeed > 0 && e.printingSpeed < 200
		&& e.fillingPercent > 0 && e.fillingPercent <= 100
		&& e.selectedProcess != ""
	)
  }
  
  export function processReducer(
	state = initialProcessState,
	action: ProcessActions
  ): ProcessState {
	switch (action.type) {
	  case SET_3D_PRINT:
		return { ...state, done: checkDone(state), printing: action.payload };
	  case PROCESS_SET_PROCESS:
		state.selectedProcess =  action.payload;
		return { ...state, done: checkDone(state), selectedProcess: action.payload};
	  case SET_NOZZLE_DIAMETER:
		state.nozzleDiameter =  action.payload;
		return { ...state, done: checkDone(state), nozzleDiameter: action.payload };
	  case SET_PRINTING_SPEED:
		state.printingSpeed =  action.payload;
		return { ...state, done: checkDone(state), printingSpeed: action.payload };
	  case SET_FILAMENT_DIAMETER:
		state.filamentDiameter =  action.payload;
		return { ...state, done: checkDone(state), filamentDiameter: action.payload };
	  case SET_FILLING_PERCENT:
		state.fillingPercent =  action.payload;
		return { ...state, done: checkDone(state), fillingPercent: action.payload };
	  default:
		return state;
	}
  }
  