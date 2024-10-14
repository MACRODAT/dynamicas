import { Point } from "../types";

export const PREVIEW_FLOW = 'PREVIEW_FLOW';
export const LIST_PARAMETERS = 'LIST_PARAMETERS';

// Action interfaces
interface PreviewFlowAction {
  type: typeof PREVIEW_FLOW;
  payload: Point[];
}

interface ListParametersAction {
  type: typeof LIST_PARAMETERS;
  payload: number[];
}

export type ResultsActions = PreviewFlowAction | ListParametersAction;
