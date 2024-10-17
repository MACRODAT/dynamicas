import { SET_MESH_SIZE, SET_SOLVER_CONVERGENCE, SET_SOLVER_MAX_ITERATIONS, SolverActions } from "../solver";

export const solverSetMaxIterations = (iterations: number) : SolverActions => {

	// add any relevant action here !!!

	return {
		payload: iterations,
		type: SET_SOLVER_MAX_ITERATIONS
	}
}

export const solverSetConvergence = (convergence: number) : SolverActions => {

	// add any relevant action here !!!

	return {
		payload: convergence,
		type: SET_SOLVER_CONVERGENCE
	}
}

export const solverMeshSize = (iterations: number) : SolverActions => {

	// add any relevant action here !!!

	return {
		payload: iterations,
		type: SET_MESH_SIZE
	}
}
