// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { User } from "./types";
import { SET_TOKEN, SET_USER_DISCONNECT } from "./store/user";
import { store } from "./store/store";
import axios from "axios";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyC0etWUwLpHGhHwVyxJyFPCIO_QIEo7-GM",
	authDomain: "dynamicas-1.firebaseapp.com",
	projectId: "dynamicas-1",
	storageBucket: "dynamicas-1.appspot.com",
	messagingSenderId: "969771586385",
	appId: "1:969771586385:web:c3ad1ed9b6cf5324e73970",
	measurementId: "G-3ZHF3BNCQM"
  };
  
// Initialize Firebase
const fb_app = initializeApp(firebaseConfig);

const analytics = getAnalytics(fb_app);
// console.log(analytics)


const provider = new GoogleAuthProvider();

const auth = getAuth();


const signInWithGoogle = async () => {
	const auth = getAuth();
	return new Promise((resolve, reject) => {
		signInWithPopup(auth, provider)
			.then((result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential?.accessToken;
				// The signed-in user info.
				const user = result.user;
				// IdP data available using getAdditionalUserInfo(result)
	
				// logging in
				let obj = {
					firstname: user.displayName?.split(' ')[0],
					lastname: user.displayName?.split(' ')[1],
					email: user.email,
					emailVerified: user.emailVerified,
					firebase: true,
					uid: user.uid,
					avatar: user.email?.split('@')[0],
					password: user.uid,
					// loginSuccess: true,
				}
	
				// console.log(obj)
				resendLogin(obj).then((resolve_) => resolve({...obj, access_token: resolve_}), (reject_) => reject(reject_))
				// fetch('http://127.0.0.1:5000/register', {
				// 	method: 'POST',
				// 	headers: {
				// 		'Accept': 'application/json',
				// 		'Content-Type': 'application/json',
				// 	},
				// 	body: JSON.stringify(obj)
				// }).then((val) => {
				// 	val.json().then((val) => {
				// 		if (val.success)
				// 		{
				// 			// set up redux store
				// 			resolve(obj)
				// 		}
				// 		else{
				// 			reject(val.error)
				// 		}
				// 	})
				// }).catch((reason) => {
				// 	reject(reason)
				// })
				// ...
			}).catch((error) => {
				// Handle Errors here.
		});
	})
}

const signInWithoutGoogle = () => {
		
}

const checkLogin = async (token_: string) => {
	return new Promise((resolve, reject) => {
		const config = {
			headers: { Authorization: `Bearer ${token_}` }
		};
		axios.get("http://127.0.0.1:5000/dashboard", config).then((res) => {

			// console.log(res)
			return res.status == 200;
		}, (rej) => {
			// console.log(rej)
			return false;
		})
	})
}
const resendLogin = async (user: any) => {
	return new Promise(
		(resolve, reject) => {
				fetch('http://127.0.0.1:5000/register', {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(user)
				}).then((response) => {
					if (!response.ok) {
						throw new Error(`HTTP error! status: ${response.status}`);
					}
					return response.json(); // Only parse JSON if response is OK
				}).then((val) => {
						// console.log(val)
						if (val.success)
						{
							// set up redux store
							resolve(val.access_token)
						}
						else{
							resolve(null)
						}
				}).catch((reason) => {
					reject(null)
				})
		}
	)
}

const afterRequest = (res: any) => {
	try{
		if (res && res.data && res.data.access_token)
		{
			store.dispatch({type: SET_TOKEN, payload: res.data.access_token})
		}
	}catch {}
	try{
		if (res && res.data.relogin)
		{
			// the user needs to reconnect
			store.dispatch({type: SET_USER_DISCONNECT})
		}
	}catch {}
	try{
		if (res.type === 'cors' || (res.msg && res.msg == "Token has expired"))
		{
			store.dispatch({type: SET_USER_DISCONNECT})
		}
	}catch {}
	try{
		if (res.status == 401)
		{
			store.dispatch({type: SET_USER_DISCONNECT})
		}
	}catch {}
}

const generateConfigToken = (token_: string) => {
	const config = {
		headers: { Authorization: `Bearer ${token_}` }
	};
	return config;
}

export {
	fb_app, analytics, signInWithGoogle, signInWithoutGoogle, resendLogin,
	afterRequest, checkLogin, generateConfigToken
}