import { combineReducers } from 'redux';
import { processReducer } from './3dprint_reducer';
import { joiningFastenersReducer } from './joining_reducer';
import { materialReducer } from './material_reducer';
import { parametersReducer } from './parameters_reducer';
import { geometryReducer } from './geometry_reducer';
import { resultsReducer } from './results_reducer';
import applicationReducer from './action_reducer';

const rootReducer = combineReducers({
	process: processReducer,
	joiningFasteners: joiningFastenersReducer,
	material: materialReducer,
	parameters: parametersReducer,
	geometry: geometryReducer,
	results: resultsReducer,
	application: applicationReducer,
});

export default rootReducer;
