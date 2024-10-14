import { Point } from "../../types";
import { LIST_PARAMETERS, PREVIEW_FLOW, ResultsActions } from "../results";

interface ResultsState {
	flowPreview: Point[];
	parameters: number[];
  }
  
  const initialResultsState: ResultsState = {
	flowPreview: [],
	parameters: [],
  };
  
  export function resultsReducer(
	state = initialResultsState,
	action: ResultsActions
  ): ResultsState {
	switch (action.type) {
	  case PREVIEW_FLOW:
		return { ...state, flowPreview: action.payload };
	  case LIST_PARAMETERS:
		return { ...state, parameters: action.payload };
	  default:
		return state;
	}
  }
  