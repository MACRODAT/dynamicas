import { User } from "../types";

export const SET_USER = 'SET_USER';
export const SET_USER_DISCONNECT = 'SET_USER_DISCONNECT';

// Action interfaces
interface SetUser {
  type: typeof SET_USER;
  payload: User;
}

// Action interfaces
interface SetUserDisconnect {
  type: typeof SET_USER_DISCONNECT;
  payload: boolean;
}

export type UserActions = 
	null |
	SetUser |
	SetUserDisconnect;
