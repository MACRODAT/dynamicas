// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

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
console.log(analytics)


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
	
				fetch('http://127.0.0.1:5000/register', {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(obj)
				}).then((val) => {
					val.json().then((val) => {
						if (val.success)
						{
							// set up redux store
							// obj.loginSuccess = true
							resolve(obj)
							// return obj
						}
						else{
							// obj["loginSuccess"] = false
							// return obj
							reject(val.error)
							console.log(val.error)
						}
					})
				}).catch((reason) => {
					// obj["loginSuccess"] = false
					reject(reason)
					// return obj
				})
				// ...
			}).catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.customData.email;
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error);
				// ...
		});
	})
}

const signInWithoutGoogle = () => {
		
}

export {
	fb_app, analytics, signInWithGoogle, signInWithoutGoogle
}