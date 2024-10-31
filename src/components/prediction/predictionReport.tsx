import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { States, allInterfaces } from '../../helpers'
import EngineeringConsole from '../parameters/console';
import axios from 'axios';
import { afterRequest, generateConfigToken } from '../../firebase';
import { Form } from 'react-bootstrap';


const PredictionReport: React.FC<States> = (state: States) => {
	const [details, setDetails] = useState(["Fetching data..."])
	const [subexec, setSubexec] = useState("r_min")
	const dispatch = useDispatch();

	useEffect(() => {
		const config = generateConfigToken(state.user.jwt_token_);
		axios.get(`http://127.0.0.1:5000/myprojects/${state.user.project}/prediction/report/${subexec}`, config)
			.then((res: any) => {
				afterRequest(res);
				if (res.data.success)
				{

					setDetails(res.data.summary.split('\n'))
				}
				else
				{
					setDetails(["[ERROR]","ERROR IN FETCHING DATA FROM SERVER"])
				}
			}).catch((err) => {
				afterRequest(err)
			});
	}, [state.params.updateCount, subexec])
	

return (
		<div>
			<h3>Airfoil performance prediction details</h3>
			<Form>
				<Form.Group className='inline m-2'>
					<Form.Label className='inline'>Select a subprocess:</Form.Label>
					<Form.Select value={subexec} className='inline' onChange={e => setSubexec(e.target.value)}>
						<option value='r_min'>Minimum reynolds calculations</option>
						<option value='r_max'>Maximum reynolds calculations</option>
					</Form.Select>
				</Form.Group>
			</Form>
			<EngineeringConsole datatext={details} />
		</div>
	)
}

export default connect(allInterfaces)(PredictionReport)
