import { User } from "../../types";
import { SET_PROJECT, SET_TOKEN, SET_USER, SET_USER_DISCONNECT, SET_USER_RELOGIN, UserActions } from "../user";

export interface UserState {
	user: User,
	project: string,
	connected: boolean,
	jwt_token_: string,
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
	jwt_token_: ""
};
  
export function userReducer(
	state = initialResultsState,
	action: UserActions
  ): UserState {
	switch (action?.type) {
	  case SET_USER:
		return { ...state, user: action.payload, connected: true};
	  case SET_USER_DISCONNECT:
		return { ...state, user: emptyUser, connected: false};
	  case SET_TOKEN:
		return {...state, jwt_token_: action.payload}
	  case SET_PROJECT:
			return { ...state, project: action.payload};
	  default:
		return state;
	}
}
  