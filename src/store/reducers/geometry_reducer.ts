import { airfoilData } from "../../components/geometry/airfoil";
import { Point, Shape } from "../../types";
import { ADD_SHAPE, GeometryActions, IMPORT_GEOMETRY, LIST_SHAPES, PREVIEW_GEOMETRY, PREVIEW_MESH, SET_GEOMETRY_AIRFOIL_NAME, SET_GEOMETRY_CLASS, SET_GEOMETRY_TYPE, SET_GEO_UNDONE, SET_MESH_QUALITY } from "../geometry";

export interface GeometryState {
	geometryType: string,
	geometrySelectedAirfoil: airfoilData,
	selectedGeometry: string,
	importedGeometry: Point[];
	previewedGeometry: Point[];
	previewedMesh: Point[];
	shapes: Shape[];
	meshQuality: number;
	done: boolean;
	geometryData: string[];
}

const initialGeometryState: GeometryState = {
	geometryData: [],
	geometrySelectedAirfoil: {name: "", description: "", screenshot: ""},
	geometryType: "",
	selectedGeometry: "",
	importedGeometry: [],
	previewedGeometry: [],
	previewedMesh: [],
	shapes: [],
	meshQuality: 0,
	done: false,
};
  
export function geometryReducer(
	state = initialGeometryState,
	action: GeometryActions
  ): GeometryState {
	switch (action.type) {
	  case IMPORT_GEOMETRY:
		return { ...state, done:true, importedGeometry: action.payload };
	  case SET_GEOMETRY_AIRFOIL_NAME:
		if (action.payload.name != "" && action.payload.description != "")
		{
			return { ...state, done:true, geometrySelectedAirfoil: action.payload, geometryData: action.data };
		}else{
			return { ...state, done:false, geometrySelectedAirfoil: action.payload, geometryData: action.data  };
		}
	  case SET_GEOMETRY_TYPE:
		// console.log("type: ", state.done);
		return { ...state, done: false, selectedGeometry: action.payload};
		case SET_GEOMETRY_CLASS:
		//   console.log("class: ", state.done);
		return { ...state, done: false, geometryType: action.payload};
	  case PREVIEW_GEOMETRY:
		return { ...state, previewedGeometry: action.payload };
	  case PREVIEW_MESH:
		return { ...state, previewedMesh: action.payload };
	  case LIST_SHAPES:
		return { ...state, shapes: action.payload };
	  case SET_MESH_QUALITY:
		return { ...state, meshQuality: action.payload };
	  case ADD_SHAPE:
		return { ...state, shapes: [...state.shapes, action.payload] };
	  case SET_GEO_UNDONE:
		return { ...state, done: false}
	  default:
		return state;
	}
  }
  