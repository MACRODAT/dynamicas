import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { States, allInterfaces } from '../../helpers'


const GeometryIntro: React.FC<States> = (state: States) => {

	const dispatch = useDispatch();

	return (
		<div>
			<h2>Geometry</h2>
			<p>
				What do you intend to build ?
				Start by choosing either of the available geometries (airfoil, etc..),
				and we'll guide you step by step into designing your own
				flying object!
			</p>
		</div>
	)
}

export default connect(allInterfaces)(GeometryIntro)
