export const SET_SOLVER_MAX_ITERATIONS = 'SET_MAX_ITERATIONS';
export const SET_SOLVER_CONVERGENCE = 'SET_LIST_PARAMETERS';
export const SET_MESH_SIZE = 'SET_MESH_SIZE';

// Action interfaces
interface SolverMeshSize {
  type: typeof SET_MESH_SIZE;
  payload: number;
}

// Action interfaces
interface SolverMaxIterations {
  type: typeof SET_SOLVER_MAX_ITERATIONS;
  payload: number;
}

interface SolverConvergence {
  type: typeof SET_SOLVER_CONVERGENCE;
  payload: number;
}

export type SolverActions = 
	SolverConvergence |
	SolverMaxIterations |
	SolverMeshSize;
