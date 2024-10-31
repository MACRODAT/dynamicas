import { type } from "os";
import { airfoilData } from "../components/geometry/airfoil";
import { Point, Shape } from "../types";

export const IMPORT_GEOMETRY = 'IMPORT_GEOMETRY';
export const PREVIEW_GEOMETRY = 'PREVIEW_GEOMETRY';
export const PREVIEW_MESH = 'PREVIEW_MESH';
export const LIST_SHAPES = 'LIST_SHAPES';
export const SET_MESH_QUALITY = 'SET_MESH_QUALITY';
export const ADD_SHAPE = 'ADD_SHAPE';
export const SET_GEOMETRY_TYPE = 'SET_GEOMETRY_TYPE';
export const SET_GEOMETRY_CLASS = 'SET_GEOMETRY_CLASS';
export const SET_GEOMETRY_AIRFOIL_NAME = 'SET_GEOMETRY_AIRFOIL_NAME';
export const SET_GEO_UNDONE = 'SET_GEO_UNDONE';
export const SET_GEO_DONE = 'SET_GEO_DONE';

export type AllGeometryActions = 
                      typeof IMPORT_GEOMETRY 
                      | typeof PREVIEW_GEOMETRY
                      | typeof PREVIEW_MESH
                      | typeof LIST_SHAPES
                      | typeof SET_MESH_QUALITY
                      | typeof ADD_SHAPE
                      | typeof SET_GEOMETRY_TYPE
                      | typeof SET_GEOMETRY_CLASS
                      | typeof SET_GEO_UNDONE
                      | typeof SET_GEO_DONE
                      | typeof SET_GEOMETRY_AIRFOIL_NAME
// Type guard function to check if action is of type AllGeometryActions
export function isAllGeometryAction(actionType: string): actionType is AllGeometryActions {
  return [
    IMPORT_GEOMETRY,
    PREVIEW_GEOMETRY,
    PREVIEW_MESH,
    LIST_SHAPES,
    SET_MESH_QUALITY,
    ADD_SHAPE,
    SET_GEOMETRY_TYPE,
    SET_GEOMETRY_CLASS,
    SET_GEO_DONE,
    SET_GEO_UNDONE,
    SET_GEOMETRY_AIRFOIL_NAME
  ].includes(actionType as AllGeometryActions);
}

// Action interfaces
interface ImportGeometryAction {
  type: typeof IMPORT_GEOMETRY;
  payload: Point[];
}

interface PreviewGeometryAction {
  type: typeof PREVIEW_GEOMETRY;
  payload: Point[];
}

interface PreviewMeshAction {
  type: typeof PREVIEW_MESH;
  payload: Point[];
}

interface ListShapesAction {
  type: typeof LIST_SHAPES;
  payload: Shape[];
}

interface SetMeshQualityAction {
  type: typeof SET_MESH_QUALITY;
  payload: number;
}

interface AddShapeAction {
  type: typeof ADD_SHAPE;
  payload: Shape;
}

interface SetGeometryType {
  type: typeof SET_GEOMETRY_TYPE;
  payload: string;
}

interface SetGeometryClass {
  type: typeof SET_GEOMETRY_CLASS;
  payload: string;
}

interface SetGeometryAirfoilName {
  type: typeof SET_GEOMETRY_AIRFOIL_NAME;
  payload: airfoilData;
  data: string[];
}

interface SetGeoUndone {
  type: typeof SET_GEO_UNDONE;
}

interface SetGeoDone {
  type: typeof SET_GEO_DONE;
}

export type GeometryActions =
  | ImportGeometryAction
  | PreviewGeometryAction
  | PreviewMeshAction
  | ListShapesAction
  | SetMeshQualityAction
  | AddShapeAction
  | SetGeometryType
  | SetGeoUndone
  | SetGeoDone
  | SetGeometryAirfoilName
  | SetGeometryClass ;
