import React from 'react'
import { connect, useDispatch } from 'react-redux';
import { States, allInterfaces } from '../../helpers';
import EngineeringConsole from '../parameters/console';
import { Button, Form } from 'react-bootstrap';

const Solver2D: React.FC<States> = (state: States) => {
	const solverType = "Incompressible"; // Solver type (e.g., incompressible flow)
	const angleOfAttack = 5;    // Angle of attack in degrees
	const freestreamVelocity = 30; // Freestream velocity (m/s)

	let data = [
		"Summary:",
		"-------------------------------------------",
		"Selected airfoil " + state.geo.geometrySelectedAirfoil.name,
		"Material: " + state.material.material.toString(),
		"Density: " + state.material.customDensity + " Kg/m3",
		"Simulation type: 2D",
		"Selected Process: " + state.process.selectedProcess,
		"-------------------------------------------",
		"Solver:",
		"Max iterations: " + state.solver.maxIterations,
		"Convergence: " + state.solver.convergence,
		"Mesh size: " + state.solver.meshSize,
	]

	return (
		<div>
		<h4>Solver (2D simulation)</h4>

		<div>
			<EngineeringConsole datatext={data} />
			<Form>
				<Form.Group>
					<Form.Label>
						Start the simulation:
					</Form.Label>
					<Button>Start</Button>
				</Form.Group>
			</Form>
		</div>
		</div>
	);
}

export default connect (allInterfaces)(Solver2D)