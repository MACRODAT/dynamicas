import { airfoilData } from "../../components/geometry/airfoil";
import { GeometryActions, SET_GEOMETRY_AIRFOIL_NAME, SET_GEOMETRY_CLASS } from "../geometry";

export const geometrySetClass = (class_: string) : GeometryActions => {

	// add any relevant action here !!!

	return {
		payload: class_,
		type: SET_GEOMETRY_CLASS
	}
}

export const geometrySetAirfoilName = (class_: airfoilData) : GeometryActions => {

	// add any relevant action here !!!

	return {
		payload: class_,
		type: SET_GEOMETRY_AIRFOIL_NAME
	}
}