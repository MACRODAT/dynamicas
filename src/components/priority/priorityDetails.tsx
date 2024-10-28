import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { States, allInterfaces } from '../../helpers'


const PriorityDetails: React.FC<States> = (state: States) => {

	const dispatch = useDispatch();

	return (
		<div>
			<h3>Draft details</h3>
		</div>
	)
}

export default connect(allInterfaces)(PriorityDetails)
