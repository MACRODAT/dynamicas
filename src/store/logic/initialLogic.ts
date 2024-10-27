import { User } from "../../types";
import { SET_USER_RELOGIN, UserActions } from "../user";

export const reloginUser = (relogin: boolean): UserActions => {
	// console.log("First log !", user)

	return {
		type: SET_USER_RELOGIN,
		payload: relogin,
	};
};
