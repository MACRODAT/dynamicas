import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { States, allInterfaces } from '../../helpers'


const DefaultResults: React.FC<States> = (state: States) => {

	const dispatch = useDispatch();

	return (
		<div>
			<h5>
				Results page
			</h5>
			<p>
				This page should display all the upcoming stream data from your
				simulation. You can explore the folder structure that we created for
				your simulation configuration, explore the solver output, 
				the result data, etc.
			</p>
		</div>
	)
}

export default connect(allInterfaces)(DefaultResults)
