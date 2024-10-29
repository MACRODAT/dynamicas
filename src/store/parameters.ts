import { AirfoilType, aircraftPriorities } from "../types";

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

export const SET_PAYLOAD_WEIGHT = 'SET_PAYLOAD_WEIGHT';
export const SET_MAX_WINGSPAN = 'SET_MAX_WINGSPAN';
export const SET_MAX_FUSELAGE = 'SET_MAX_FUSELAGE';
export const SET_PRIORITIES = 'SET_PRIORITIES';
export const INCREMENT_PRIORITY = 'INCREMENT_PRIORITY';

// Define the union type for all actions
export type AllFlightActions = 
    | typeof SET_FLIGHT_TIME_MARGINS
    | typeof SET_FLIGHT_TIME_EXPECTED
    | typeof SET_SIMULATION_TYPE
    | typeof SET_WEIGHT_MARGINS
    | typeof SET_WEIGHT_EXPECTED
    | typeof SET_SPEED_MARGINS
    | typeof SET_SPEED_EXPECTED
    | typeof SET_AIRFOIL_TYPE
    | typeof SET_STREAM_VELOCITY_2D
    | typeof SET_ANGLE_OF_ATTACK
    | typeof SET_PAYLOAD_WEIGHT
    | typeof SET_MAX_WINGSPAN
    | typeof INCREMENT_PRIORITY
    | typeof SET_MAX_FUSELAGE
    | typeof SET_PRIORITIES;

// Type guard function to check if action is of type AllFlightActions
export function isFlightAction(actionType: string): actionType is AllFlightActions {
  return [
    SET_FLIGHT_TIME_MARGINS,
    SET_FLIGHT_TIME_EXPECTED,
    SET_SIMULATION_TYPE,
    SET_WEIGHT_MARGINS,
    SET_WEIGHT_EXPECTED,
    SET_SPEED_MARGINS,
    SET_SPEED_EXPECTED,
    SET_AIRFOIL_TYPE,
    SET_STREAM_VELOCITY_2D,
    SET_ANGLE_OF_ATTACK,
    SET_PAYLOAD_WEIGHT,
    SET_MAX_WINGSPAN,
    INCREMENT_PRIORITY,
    SET_MAX_FUSELAGE,
    SET_PRIORITIES
  ].includes(actionType as AllFlightActions);
}

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

interface SetPayloadWeight {
  type: typeof SET_PAYLOAD_WEIGHT;
  payload: number;
}

interface SetFuselageLength {
  type: typeof SET_MAX_FUSELAGE;
  payload: number;
}

interface SetMaxWingspan {
  type: typeof SET_MAX_WINGSPAN;
  payload: number;
}

interface SetPriorities {
  type: typeof SET_PRIORITIES;
  payload: aircraftPriorities;
}

interface IncrementUpdate {
  type: typeof INCREMENT_PRIORITY;
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
  | SetPayloadWeight
  | SetPriorities
  | SetFuselageLength
  | SetMaxWingspan
  | IncrementUpdate
  | SetAirfoilTypeAction;
