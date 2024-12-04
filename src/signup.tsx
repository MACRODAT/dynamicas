import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { States, allInterfaces } from './helpers'
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { setMenu } from './store/logic/actionLogic';
import { remote_addr } from './firebase';


const SignUP: React.FC<States> = (state: States) => {

	const dispatch = useDispatch();
	// Component state for form fields
	const [formData, setFormData] = useState({
		avatar: '',
		lastname: '',
		firstname: '',
		password: '',
		email: ''
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
			const response = await axios.post('http://' + remote_addr + '/register', formData, {
				headers: { 'Content-Type': 'application/json' }
			}).then((response) => {
				if (response.data.success)
				{
					dispatch(setMenu("login") as any)
				}
				else
				{
					setError(response.data.error)
				}
				// console.log(response.data.success);
			});
			//console.log(response.data); // Handle the response or show a success message
		} catch (error) {
			console.error("Error during signup:", error); // Handle the error as needed
		}
	};

	return (
		<Container>
			<Row className="justify-content-center">
				<Col md={6}>
					<h3 className="text-center my-4">Sign Up</h3>
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

						<Form.Group controlId="formFirstname">
							<Form.Label>First Name <FaUser /></Form.Label>
							<Form.Control
								type="text"
								name="firstname"
								placeholder="Enter First Name"
								value={formData.firstname}
								onChange={handleChange}
							/>
						</Form.Group>

						<Form.Group controlId="formLastname">
							<Form.Label>Last Name <FaUser /></Form.Label>
							<Form.Control
								type="text"
								name="lastname"
								placeholder="Enter Last Name"
								value={formData.lastname}
								onChange={handleChange}
							/>
						</Form.Group>

						<Form.Group controlId="formEmail">
							<Form.Label>Email <FaEnvelope /></Form.Label>
							<Form.Control
								type="email"
								name="email"
								placeholder="Enter Email"
								value={formData.email}
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
							Sign Up
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

export default connect(allInterfaces)(SignUP)
