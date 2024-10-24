import { ProcessState } from "./store/reducers/3dprint_reducer";
import { ApplicationState } from "./store/reducers/action_reducer";
import { GeometryState } from "./store/reducers/geometry_reducer";
import { JoiningFastenersState } from "./store/reducers/joining_reducer";
import { MaterialState } from "./store/reducers/material_reducer";
import { ParametersState } from "./store/reducers/parameters_reducer";
import { ResultsState } from "./store/reducers/results_reducer";
import { SolverState } from "./store/reducers/solver_reducer";
import { UserState } from "./store/reducers/user_reducer";

const toUpper = (s : string) => {
	if (s == undefined)
	{
		return "";
	}
	return s[0].toUpperCase() + s.slice(1);
}

const toUpperList = (arr : string[]) => {
	if (arr == undefined || arr.length == 0)
	{
		return [];
	}
	return arr.filter((s: String) => s.length > 0).map((s: (String)) => {
		// if (s.length == 0) return undefined;
		return s[0].toUpperCase() + s.slice(1)
	});
}

// utils.ts
const readFileAsText = (file: File): Promise<string> => {
	return new Promise((resolve, reject) => {
	  const reader = new FileReader();
	  reader.onload = () => resolve(reader.result as string);
	  reader.onerror = error => reject(error);
	  reader.readAsText(file);
	});
};

// Function to parse .dat file content into an array of coordinates
function parseDatFile(content: string): { x: number; y: number }[] {
    const lines = content.split('\n').slice(1);
    const coordinates = lines
        .filter(line => line.trim() !== '') // Ignore empty lines
        .map(line => {
            const [x, y] = line.trim().split(/\s+/).map(Number); // Split by spaces and convert to numbers
            return { x, y };
        });

    return coordinates;
}

export type States = {
	geo: GeometryState, 
	process: ProcessState, 
	action: ApplicationState, 
	join : JoiningFastenersState,
	material : MaterialState,
	params : ParametersState,
	res : ResultsState,
	solver: SolverState,
	user: UserState,
	ownProps: any
};

let allInterfaces = (state: any, ownProps: any) => {
	let geo : GeometryState = state.geometry;
	let action : ApplicationState = state.action;
	let process : ProcessState = state.process;
	let join : JoiningFastenersState = state.JoiningFasteners;
	let material : MaterialState = state.material;
	let params : ParametersState = state.parameters;
	let res : ResultsState = state.results;
	let solver : SolverState = state.solver;
	let user : UserState = state.user;

	return {
		geo: geo,
		action: action,
		process: process,
		join: join,
		material: material,
		params: params,
		solver: solver,
		res: res,
		user: user,
		ownProps: ownProps,
	}
}
  

export {
	toUpper, toUpperList,
	readFileAsText,
	parseDatFile,
	allInterfaces
}