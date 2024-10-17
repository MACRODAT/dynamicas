import { MaterialType } from "../../types";
import { ProcessActions, PROCESS_SET_PROCESS, SET_NOZZLE_DIAMETER, SET_PRINTING_SPEED, SET_FILAMENT_DIAMETER, SET_FILLING_PERCENT } from "../3dprint";
import { MaterialActions, SET_MATERIAL } from "../material";

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

export const processSetMaterial = (material: string) : MaterialActions => {

	return {
		payload: MaterialType[material as keyof typeof MaterialType],
		type: SET_MATERIAL
	}
}

export const processPrintingSpeed = (speed: number) : ProcessActions => {

	return {
		payload: speed,
		type: SET_PRINTING_SPEED
	}
}

export const processFilamentDiameter = (diameter: number) : ProcessActions => {

	return {
		payload: diameter,
		type: SET_FILAMENT_DIAMETER
	}
}

export const processFillingPercent = (filling: number) : ProcessActions => {

	return {
		payload: filling,
		type: SET_FILLING_PERCENT
	}
}