import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { States, allInterfaces } from '../../helpers'
import './3dprint.scss'
import { Form } from 'react-bootstrap'
import { parametersSetFlightSpeed, parametersSetFlightTime } from '../../store/logic/parametersLogic'


const FixedWingSpecs: React.FC<States> = (state: States) => {

	const [useHelp, setUseHelp] = useState(false);

	const dispatch = useDispatch();

	const setHelp = (e: any) => {
		setUseHelp(!useHelp)
	}

	return (
		<div>
			<h3>Configure fixed wing specs</h3>
			<div className="box">
				<Form>
					<Form.Group>
						<Form.Check 
							checked={useHelp} 
							label="Use help."
							type='switch'
							onChange={setHelp}
							/>
						
					</Form.Group>
				</Form>
	  		</div>
			<div className="container3d">
		
				{/* Nozzle Information */}
				<div className='box'>
					<h4>Flight time</h4>
					{
					useHelp ?
						<>
							<p>
								Set up the minimum flight time for the aircraft. It will be used as a reference
								for the next parameters. 
							</p>
							<div className='centerImage'>
								{/* <img src={nozzle} alt="Nozzle" className='image' /> */}
							</div>
						</>
						:
						""
					}
				
					<div className='centerImage actionBox'>
						{
							useHelp ? 
								<>
									Actions:
									<hr />
								</> : <></>
						}
						<div className="div">
							<Form>
								<Form.Label>
									Expected (min) flight time [{state.params.flightTime.expected} min]:
								</Form.Label>
								<Form.Range
										min={1}
										max={240}
										step={0.5}
										onChange={(e) => dispatch(parametersSetFlightTime(Number(e.target.value)) as any)}
										value={state.params.flightTime.expected}
									/>
							</Form>
						</div>
					</div>
				</div>
				<div className='box'>
					<h4>Cruise speed</h4>
					{
					useHelp ?
						<>
							<p>
								Set up the cruise speed for your fixed wing. The max speed might be more than
								this speed. 
							</p>
							<div className='centerImage'>
								{/* <img src={nozzle} alt="Nozzle" className='image' /> */}
							</div>
						</>
						:
						""
					}
				
					<div className='centerImage actionBox'>
						{
							useHelp ? 
								<>
									Actions:
									<hr />
								</> : <></>
						}
						<div className="div">
							<Form>
								<Form.Label>
									Minimum cruise speed [{state.params.speed.expected} km/h]:
								</Form.Label>
								<Form.Range
										min={1}
										max={180}
										step={0.5}
										onChange={(e) => dispatch(parametersSetFlightSpeed(Number(e.target.value)) as any)}
										value={state.params.speed.expected}
									/>
							</Form>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default connect(allInterfaces)(FixedWingSpecs)
