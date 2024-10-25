import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { States, allInterfaces } from '../../helpers'


const FixedWingSpecs: React.FC<States> = (state: States) => {

	const dispatch = useDispatch();

	return (
		<div>
			<h3>Configure fixed wing specs</h3>
		</div>
	)
}

export default connect(allInterfaces)(FixedWingSpecs)
