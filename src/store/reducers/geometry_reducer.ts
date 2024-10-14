import { Point, Shape } from "../../types";
import { ADD_SHAPE, GeometryActions, IMPORT_GEOMETRY, LIST_SHAPES, PREVIEW_GEOMETRY, PREVIEW_MESH, SET_GEOMETRY_CLASS, SET_GEOMETRY_TYPE, SET_MESH_QUALITY } from "../geometry";

export interface GeometryState {
	geometryType: string,
	selectedGeometry: string,
	importedGeometry: Point[];
	previewedGeometry: Point[];
	previewedMesh: Point[];
	shapes: Shape[];
	meshQuality: number;
  }
  
  const initialGeometryState: GeometryState = {
	geometryType: "",
	selectedGeometry: "",
	importedGeometry: [],
	previewedGeometry: [],
	previewedMesh: [],
	shapes: [],
	meshQuality: 0,
  };
  
  export function geometryReducer(
	state = initialGeometryState,
	action: GeometryActions
  ): GeometryState {
	switch (action.type) {
	  case IMPORT_GEOMETRY:
		return { ...state, importedGeometry: action.payload };
	  case SET_GEOMETRY_TYPE:
		return { ...state, selectedGeometry: action.payload};
	  case SET_GEOMETRY_CLASS:
		return { ...state, geometryType: action.payload};
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
	  default:
		return state;
	}
  }
  