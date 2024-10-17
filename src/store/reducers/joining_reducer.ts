import { JoiningMethod } from "../../types";
import { JoiningFastenersActions, SET_FASTENING_METHOD, SET_JOINING_FASTENERS } from "../joining_fasteners";

export interface JoiningFastenersState {
	fasteners: boolean;
	method: JoiningMethod;
  }
  
  const initialJoiningFastenersState: JoiningFastenersState = {
	fasteners: false,
	method: JoiningMethod.Rivet,
  };
  
  export function joiningFastenersReducer(
	state = initialJoiningFastenersState,
	action: JoiningFastenersActions
  ): JoiningFastenersState {
	switch (action.type) {
	  case SET_JOINING_FASTENERS:
		return { ...state, fasteners: action.payload };
	  case SET_FASTENING_METHOD:
		return { ...state, method: action.payload };
	  default:
		return state;
	}
  }
  