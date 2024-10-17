import { AirfoilType } from "../types";

// Flight Time
export const SET_FLIGHT_TIME_MARGINS = 'SET_FLIGHT_TIME_MARGINS';
export const SET_FLIGHT_TIME_EXPECTED = 'SET_FLIGHT_TIME_EXPECTED';

export const SET_SIMULATION_TYPE = 'SET_SIMULATION_TYPE';

// Weight
export const SET_WEIGHT_MARGINS = 'SET_WEIGHT_MARGINS';
export const SET_WEIGHT_EXPECTED = 'SET_WEIGHT_EXPECTED';

// Speed
export const SET_SPEED_MARGINS = 'SET_SPEED_MARGINS';
export const SET_SPEED_EXPECTED = 'SET_SPEED_EXPECTED';

// Airfoil
export const SET_AIRFOIL_TYPE = 'SET_AIRFOIL_TYPE';

//2D
export const SET_STREAM_VELOCITY_2D = 'SET_STREAM_VELOCITY_2D';
export const SET_ANGLE_OF_ATTACK = 'SET_ANGLE_OF_ATTACK';

// Action interfaces
interface SetFlightTimeMarginsAction {
  type: typeof SET_FLIGHT_TIME_MARGINS;
  payload: number;
}

interface SetFlightTimeExpectedAction {
  type: typeof SET_FLIGHT_TIME_EXPECTED;
  payload: number;
}

interface SetWeightMarginsAction {
  type: typeof SET_WEIGHT_MARGINS;
  payload: number;
}

interface SetWeightExpectedAction {
  type: typeof SET_WEIGHT_EXPECTED;
  payload: number;
}

interface SetSpeedMarginsAction {
  type: typeof SET_SPEED_MARGINS;
  payload: number;
}

interface SetSpeedExpectedAction {
  type: typeof SET_SPEED_EXPECTED;
  payload: number;
}

interface SetAirfoilTypeAction {
  type: typeof SET_AIRFOIL_TYPE;
  payload: AirfoilType;
}

interface SetSimulationType {
  type: typeof SET_SIMULATION_TYPE;
  payload: string;
}

interface SetAngleOfAttack {
  type: typeof SET_ANGLE_OF_ATTACK;
  payload: number;
}

interface SetStreamVelocity2D {
  type: typeof SET_STREAM_VELOCITY_2D;
  payload: number;
}

export type ParametersActions =
  | SetFlightTimeMarginsAction
  | SetFlightTimeExpectedAction
  | SetWeightMarginsAction
  | SetWeightExpectedAction
  | SetSpeedMarginsAction
  | SetSpeedExpectedAction
  | SetSimulationType
  | SetAngleOfAttack
  | SetStreamVelocity2D
  | SetAirfoilTypeAction;
