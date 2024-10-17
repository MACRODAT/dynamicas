import { SET_MESH_SIZE, SET_SOLVER_CONVERGENCE, SET_SOLVER_MAX_ITERATIONS, SolverActions } from "../solver";

export interface SolverState {
	maxIterations: number,
	convergence: number,
	meshSize: number
}
  
const initialResultsState: SolverState = {
	maxIterations: 1000,
	convergence: 0.00000001,
	meshSize: 0.01
};
  
export function solverReducer(
	state = initialResultsState,
	action: SolverActions
  ): SolverState {
	switch (action.type) {
	  case SET_SOLVER_MAX_ITERATIONS:
		return { ...state, maxIterations: action.payload };
	  case SET_MESH_SIZE:
		return { ...state, meshSize: action.payload };
	  case SET_SOLVER_CONVERGENCE:
		return { ...state, convergence: action.payload };
	  default:
		return state;
	}
}
  