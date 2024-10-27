import { User } from "../../types";
import { SET_PROJECT, SET_USER, SET_USER_DISCONNECT, SET_USER_RELOGIN, UserActions } from "../user";

export interface UserState {
	user: User,
	project: string,
	connected: boolean,
	relogin: boolean
}

const emptyUser: User = {
	avatar: "user001", 
	firstname: "", 
	lastname: "", 
	loginDate: new Date(),
	loggedIn: false,
	email: "",
	uid: "",
};

const initialResultsState: UserState = {
	user: emptyUser,
	connected: false,
	project: "",
	relogin: true
};
  
export function userReducer(
	state = initialResultsState,
	action: UserActions
  ): UserState {
	switch (action?.type) {
	  case SET_USER:
		return { ...state, user: action.payload, connected: true };
	  case SET_USER_DISCONNECT:
		return { ...state, user: emptyUser, connected: false};
	  case SET_PROJECT:
			return { ...state, project: action.payload};
	  case SET_USER_RELOGIN:
		return {...state, relogin: action.payload}
		return state
	  default:
		return state;
	}
}
  