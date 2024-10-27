import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { States, allInterfaces } from './helpers'
import './styles/landing.scss'

import { getAuth, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { fb_app, signInWithGoogle } from './firebase';
import { userSetUser } from './store/logic/userLogic';
import { User } from './types';




const LoginPage: React.FC<States> = (state: States) => {

	const dispatch = useDispatch();
	let email = "";
	let password = "";

	
	let startSignInWithGoogle = () => {
		signInWithGoogle().then((res: any) => {
			let usr: User = {
				avatar: res.avatar,
				firstname: res.firstname,
				lastname: res.lastname,
				email: res.email,
				loggedIn: true,
				loginDate: new Date(Date.now()),
			}
			console.log(usr)
			dispatch(userSetUser(usr) as any)
		})
	}
	


	return (
		<div className="landing-page">
			<header className="header">
				<h1>Dynamicas</h1>
				<p id="description">Your ultimate UAV design tool</p>
				<button className="cta-button" onClick={startSignInWithGoogle}>
					Start building
				</button>
			</header>

			<section className="features">
				<h2 id="keys">Key Features</h2>
				<div className="feature-list">
					<div className="feature">
						<h3>Process-by-process</h3>
						<p>
							Through a simple <em>process-by-process</em> workflow,
							anyone is able to build blueprints for their future
							air vehicles!
						</p>
					</div>
					<div className="feature">
						<h3>Aerodynamics Analysis</h3>
						<p>Analyze airfoil performance with our built-in computational tools.</p>
					</div>
					<div className="feature">
						<h3>Drag-and-Drop Interface</h3>
						<p>Seamlessly build UAVs using our intuitive interface.</p>
					</div>
					<div className="feature">
						<h3>Flight Parameter Optimization</h3>
						<p>Adjust parameters to find the best performance for your UAV designs.</p>
					</div>
				</div>
			</section>

			<section className="how-it-works">
				<h2>How It Works</h2>
				<p>Getting started with Dynamicas is simple:</p>
				<ol>
				<li>Register or log in using your Google account.</li>
				<li>Explore our features and select your UAV components.</li>
				<li>Design, analyze, and optimize your UAV for flight!</li>
				</ol>
			</section>

			<footer className="footer">
				<p>© 2024 Macrodat Dynamicas. All rights reserved.</p>
				<p>Contact us: macrodatservices@gmail.com</p>
			</footer>
		</div>
	)
}

export default connect(allInterfaces)(LoginPage)
