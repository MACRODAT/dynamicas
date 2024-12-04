import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { States, allInterfaces } from '../../helpers'
import EngineeringConsole from '../parameters/console';
import axios from 'axios';
import { afterRequest, generateConfigToken, remote_addr } from '../../firebase';


const PriorityDetails: React.FC<States> = (state: States) => {
	const [details, setDetails] = useState(["Fetching data..."])

	useEffect(() => {
		const config = generateConfigToken(state.user.jwt_token_);
		axios.get(`http://${remote_addr}/myprojects/${state.user.project}/summary`, config)
			.then((res: any) => {
				afterRequest(res);
				setDetails(res.data.summary.split('\n'))
			}).catch((err) => {
				afterRequest(err)
			});
	}, [state.params.updateCount])
	const dispatch = useDispatch();
	

	return (
		<div>
			<h3>Draft details</h3>
			<EngineeringConsole datatext={details} />
		</div>
	)
}

export default connect(allInterfaces)(PriorityDetails)
