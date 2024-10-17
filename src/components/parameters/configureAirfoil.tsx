import React from 'react'
import { connect, useDispatch } from 'react-redux';
import { States, allInterfaces } from '../../helpers';
import EngineeringConsole from './console';

const ConfigureAirfoil: React.FC<States> = (state: States) => {
	const airfoil = "NACA0012"; // Example airfoil geometry
	const meshSize = 0.01;      // Mesh size around the airfoil
	const solverType = "Incompressible"; // Solver type (e.g., incompressible flow)
	const maxIterations = 1000; // Max solver iterations
	const convergence = 1e-6;   // Convergence criteria for the solver
	const angleOfAttack = 5;    // Angle of attack in degrees
	const freestreamVelocity = 30; // Freestream velocity (m/s)

	// Placeholder for rendering results
  const simulationResults = {
    liftCoefficient: 0.85,
    dragCoefficient: 0.02,
    pressureDistribution: [/* Array of pressure data */],
  };

  let data = [
	"Summary:",
	"-------------------------------------------",
	"Selected airfoil " + state.geo.geometrySelectedAirfoil.name,
	"Material: " + state.material.material.toString(),
	"Simulation type: 2D",
	"Selected Process: " + state.process.selectedProcess,
	"-------------------------------------------",
	"Solver:",
	"Max iterations: 1000",
  ]

  return (
    <div>
      <h2>2D Airfoil Simulation</h2>

      <div>
        <h4>Airfoil Geometry</h4>
		<EngineeringConsole datatext={data} />

	  </div>
    </div>
  );
}

export default connect (allInterfaces)(ConfigureAirfoil)