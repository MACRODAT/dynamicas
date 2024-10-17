import { PROCESS_SET_PROCESS, ProcessActions, SET_3D_PRINT, SET_FILAMENT_DIAMETER, SET_FILLING_PERCENT, SET_NOZZLE_DIAMETER, SET_PRINTING_SPEED } from "../3dprint";

export interface ProcessState {
	selectedProcess: string,
	printing: boolean;
	nozzleDiameter: number;
	printingSpeed: number;
	filamentDiameter: number;
	fillingPercent: number;
  }
  
  const initialProcessState: ProcessState = {
	selectedProcess: '',
	printing: false,
	nozzleDiameter: 0,
	printingSpeed: 0,
	filamentDiameter: 0,
	fillingPercent: 0,
  };
  
  export function processReducer(
	state = initialProcessState,
	action: ProcessActions
  ): ProcessState {
	switch (action.type) {
	  case SET_3D_PRINT:
		return { ...state, printing: action.payload };
	  case PROCESS_SET_PROCESS:
		return { ...state, selectedProcess: action.payload};
	  case SET_NOZZLE_DIAMETER:
		return { ...state, nozzleDiameter: action.payload };
	  case SET_PRINTING_SPEED:
		return { ...state, printingSpeed: action.payload };
	  case SET_FILAMENT_DIAMETER:
		return { ...state, filamentDiameter: action.payload };
	  case SET_FILLING_PERCENT:
		return { ...state, fillingPercent: action.payload };
	  default:
		return state;
	}
  }
  