import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { States, allInterfaces } from '../../helpers'
import JSZip from 'jszip';
import axios from 'axios';
import { afterRequest, generateConfigToken } from '../../firebase';


const PredictionIntro: React.FC<States> = (state: States) => {


	return (
		<div className='blendWithImages'>
			<h3>Airfoil performance prediction</h3>
			<p>
				This section is dedicated to people with some acknowldge in aerodynamics. If you're unsure
				about some parameters that are displayed here, you can just skip this section
				and head for the next one.
			</p>
			<p>
				This section provides tools to predict the performance
				of your future aircraft. Please ensure you click on <em>"Recalculate"</em>
				for every iteration of your airfoil.
			</p>
			<p>
				If you're unhappy about any of the predicted results, you can adjust
				airfoil parameters in previous sections to your liking.
			</p>
		</div>
	)
}

export default connect(allInterfaces)(PredictionIntro)
