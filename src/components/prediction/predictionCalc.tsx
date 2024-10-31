import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { States, allInterfaces } from '../../helpers'
import JSZip from 'jszip';
import axios from 'axios';
import { afterRequest, generateConfigToken } from '../../firebase';
import { Button, Form } from 'react-bootstrap';
import { IoCheckmarkDoneCircle } from "react-icons/io5";


const PredictionRecalc: React.FC<States> = (state: States) => {
	let [processing, setProcessing] = useState(false);
	let [success, setSuccess] = useState(false);
	let [date_success, setDateSuccess] = useState(new Date());


	const startCalc = () => 
	{
		setProcessing(true);
		setSuccess(false);
		const config = generateConfigToken(state.user.jwt_token_);
		axios.get(`http://127.0.0.1:5000/myprojects/${state.user.project}/prediction/calculate`, {
				...config,
				responseType: 'json'
			})
			.then(async (res) => {
				afterRequest(res);
				setProcessing(false);
				setSuccess(true);
				setDateSuccess(new Date())
			})
			.catch((err) => {
				afterRequest(err);
				setProcessing(false);
				setSuccess(false);
			});
	}

	return (
		<div className='blendWithImages'>
			<h3>Airfoil performance: start calculations</h3>
			<p className='bold important'>
				In order to predict results, you have to hit the "Recalculate" button, for every
				re-iteration of your aircraft.
			</p>
			{
				processing ?
				<h6 className='front-200'>Processing your request for airfoil {state.geo.geometrySelectedAirfoil.name}</h6>
				:
				<></>
			}
			{
				success ?
				<h6 className='success'>
					<IoCheckmarkDoneCircle size={50} />
					Have performed successful calculations for {state.geo.geometrySelectedAirfoil.name + " "} 
					 at {date_success.toTimeString()}
				</h6>
				:
				<></>
			}
			<Form>
				<Form.Group>
					<Form.Label>
						Start reiteration calculations
					</Form.Label>
					<Button className='inline m-4' onClick={startCalc} disabled={processing}>
						{
							processing ? "Recalculating" : "Recalculate"
						}
					</Button>
				</Form.Group>
			</Form>
		</div>
	)
}

export default connect(allInterfaces)(PredictionRecalc)
