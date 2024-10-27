import { User } from "../types";

export const SET_USER = 'SET_USER';
export const SET_USER_DISCONNECT = 'SET_USER_DISCONNECT';
export const SET_USER_RELOGIN = 'SET_USER_RELOGIN';
export const SET_PROJECT = 'SET_PROJECT';
export const SET_TOKEN = 'SET_TOKEN';

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

// Action interfaces
interface SetUserRelogin {
  type: typeof SET_USER_RELOGIN;
  payload: boolean;
}

// Action interfaces
interface SetUserToken {
  type: typeof SET_TOKEN;
  payload: string;
}

// Action interfaces
interface SetProject {
  type: typeof SET_PROJECT;
  payload: string;
}

export type UserActions = 
	null |
  SetUserToken |
	SetUser |
  SetProject |
  SetUserRelogin |
	SetUserDisconnect;
