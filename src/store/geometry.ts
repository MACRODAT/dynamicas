import { Point, Shape } from "../types";

export const IMPORT_GEOMETRY = 'IMPORT_GEOMETRY';
export const PREVIEW_GEOMETRY = 'PREVIEW_GEOMETRY';
export const PREVIEW_MESH = 'PREVIEW_MESH';
export const LIST_SHAPES = 'LIST_SHAPES';
export const SET_MESH_QUALITY = 'SET_MESH_QUALITY';
export const ADD_SHAPE = 'ADD_SHAPE';

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

export type GeometryActions =
  | ImportGeometryAction
  | PreviewGeometryAction
  | PreviewMeshAction
  | ListShapesAction
  | SetMeshQualityAction
  | AddShapeAction;
