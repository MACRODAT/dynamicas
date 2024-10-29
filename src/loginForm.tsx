import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { States, allInterfaces } from './helpers'
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { setMenu } from './store/logic/actionLogic';
import { SET_TOKEN, SET_USER } from './store/user';
import { User } from './types';


const LoginForm: React.FC<States> = (state: States) => {

	const dispatch = useDispatch();
	// Component state for form fields
	const [formData, setFormData] = useState({
		avatar: '',
		password: '',
	});

	const [error_, setError] = useState("");

	// Handle form input changes
	const handleChange = (e: any) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	// Handle form submission
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			const response_ = await axios.post('http://127.0.0.1:5000/login', formData, {
				headers: { 'Content-Type': 'application/json' }
			}).then((response) => {
				console.log(response);
				if (response.data.success)
				{
					// let user_ : User = {
					// 	...formData,
					// 	email: ''
					// }
					dispatch({type: SET_TOKEN, payload: response.data.access_token})
					dispatch({type: SET_USER, payload: {...response.data.user, firebase: false} })
					dispatch(setMenu("") as any)
				}
				else
				{
					setError("Invalid login")
				}
			});
		} catch (error) {
			setError("Error during LoginForm."); // Handle the error as needed
		}
	};

	return (
		<Container>
			<Row className="justify-content-center">
				<Col md={6}>
					<h3 className="text-center my-4">Login</h3>
					<h6 className='danger' style={{color: 'red'}}>{error_}</h6>
					<Form onSubmit={handleSubmit}>
						<Form.Group controlId="formAvatar">
							<Form.Label>Avatar</Form.Label>
							<Form.Control
								type="text"
								name="avatar"
								placeholder="Avatar URL"
								value={formData.avatar}
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Group controlId="formPassword">
							<Form.Label>Password <FaLock /></Form.Label>
							<Form.Control
								type="password"
								name="password"
								placeholder="Enter Password"
								value={formData.password}
								onChange={handleChange}
							/>
						</Form.Group>

						<Button variant="primary" type="submit" className="w-100 mt-3">
							Login
						</Button>
						<Button variant="secondary" className="w-100 mt-3" onClick={() => dispatch(setMenu("") as any)}>
							Back
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	);
}

export default connect(allInterfaces)(LoginForm)
