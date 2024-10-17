import React from 'react'
import { connect, useDispatch } from 'react-redux';
import { States, allInterfaces } from '../../helpers';
import EngineeringConsole from './console';
import AirfoilPlot from '../airfoilPlot';
import { Form } from 'react-bootstrap';
import { parametersAngleOfAttacl, parametersIncomingStream2D } from '../../store/logic/parametersLogic';

const ConfigureAirfoil: React.FC<States> = (state: States) => {

	const dispatch = useDispatch();

	const handleAngle = (event: React.ChangeEvent<HTMLInputElement>) => {
		let val = event.target.value;
		let val_ = Number(val);
		dispatch(parametersAngleOfAttacl(val_) as any)
	}

	const handleStream = (event: React.ChangeEvent<HTMLInputElement>) => {
		let val = event.target.value;
		let val_ = Number(val);
		dispatch(parametersIncomingStream2D(val_) as any)
	}

	return (
		<div>
		<h2>2D Airfoil Simulation</h2>
		<hr />
		<div>
			<h4>Airfoil Geometry</h4>
			<AirfoilPlot airfoilName={state.geo.geometrySelectedAirfoil.name} />
			<Form className=''>
				<Form.Group>
					<Form.Label>
						Incoming stream velocity (m/s):
					</Form.Label>
					<Form.Control 
						onChange={handleStream}
						value={state.params.streamVelocityX}
						type="number" />
				</Form.Group>
				<Form.Group>
					<Form.Label>
						Angle of attack (degrees):
					</Form.Label>
					<Form.Control 
						onChange={handleAngle}
						value={state.params.angleOfAttack}
						type="number" />
				</Form.Group>
			</Form>
		</div>
		</div>
	);
}

export default connect (allInterfaces)(ConfigureAirfoil)