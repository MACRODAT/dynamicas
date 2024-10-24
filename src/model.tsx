import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { States, allInterfaces } from './helpers'


const Sample: React.FC<States> = (state: States) => {

	const dispatch = useDispatch();

	return (
		<div>
			
		</div>
	)
}

export default connect(allInterfaces)(Sample)
