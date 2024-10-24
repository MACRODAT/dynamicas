import { User } from "../../types";
import { SET_USER, SET_USER_DISCONNECT, UserActions } from "../user";

export interface UserState {
	user: User,
	connected: boolean
}

const emptyUser: User = {
	avatar: "user001", 
	firstname: "", 
	lastname: "", 
	loginDate: new Date()
};

const initialResultsState: UserState = {
	user: emptyUser,
	connected: false
};
  
export function userReducer(
	state = initialResultsState,
	action: UserActions
  ): UserState {
	switch (action?.type) {
	  case SET_USER:
		return { ...state, user: action.payload };
	  case SET_USER_DISCONNECT:
		return { ...state, user: emptyUser, connected: false};
	  default:
		return state;
	}
}
  