import { User } from "../../types"
import { SET_USER, SET_USER_DISCONNECT, UserActions } from "../user"

export const userSetUser = (user: User) : UserActions => {

	// add any relevant action here !!!

	return {
		payload: user,
		type: SET_USER
	}
}

export const userDisconnect = (disconnect: boolean) : UserActions => {

	// add any relevant action here !!!

	if (disconnect)
	{
		return {
			payload: true,
			type: SET_USER_DISCONNECT
		}
	}

	return null;
}
