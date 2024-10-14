import { GeometryActions, SET_GEOMETRY_CLASS } from "../geometry";

export const geometrySetClass = (class_: string) : GeometryActions => {

	// add any relevant action here !!!

	return {
		payload: class_,
		type: SET_GEOMETRY_CLASS
	}
}