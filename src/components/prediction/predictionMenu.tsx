import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { States, allInterfaces } from '../../helpers'
import { addSubmenu } from '../../store/logic/actionLogic';


const Prediction: React.FC<States> = (state: States) => {

	const dispatch = useDispatch();

	return (
		<div>
			<h6 className='bold'>Predicted flight performance</h6>
			<p className='italic'>
				You'll find here predicted values for your draft -so far-. It is still a draft, so
				you might choose to alter parameters in previous sections to match your criteria.
				These values might change somewhat during the next phases of design (with more involved
				simulations once you choose a particular design).
			</p>
			<hr />
			<div className='p-1'>
				<div className='menuRes' onClick={() => null}>
					Intro
				</div>
				<div className='menuRes' onClick={() => dispatch(addSubmenu("AIRFOIL REPORT", 0) as any)}>
					View report
				</div>
				<div className='menuRes' onClick={() => dispatch(addSubmenu("AIRFOIL PLOT", 0) as any)}>
					View plots
				</div>
				<div className='menuRes'>
					Predict geometry
				</div>
			</div>
		</div>
	)
}

export default connect(allInterfaces)(Prediction)
