import { JoiningMethod } from "../types";

export const SET_JOINING_FASTENERS = 'SET_JOINING_FASTENERS';
export const SET_FASTENING_METHOD = 'SET_FASTENING_METHOD';

interface SetJoiningFastenersAction {
  type: typeof SET_JOINING_FASTENERS;
  payload: boolean;
}

interface SetFasteningMethodAction {
  type: typeof SET_FASTENING_METHOD;
  payload: JoiningMethod;
}

export type JoiningFastenersActions =
  | SetJoiningFastenersAction
  | SetFasteningMethodAction;
