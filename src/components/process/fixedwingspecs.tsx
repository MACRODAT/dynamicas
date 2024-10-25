import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { States, allInterfaces } from '../../helpers'
import './3dprint.scss'
import { Form } from 'react-bootstrap'
import wingspan from '../../res/wingspan.png';
import { parametersSetFlightSpeed, parametersSetFlightTime, parametersSetFuselage, parametersSetPayloadWeight, parametersSetWingspan } from '../../store/logic/parametersLogic'


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

				{/* payload */}
				<div className='box'>
					<h4>Payload weight</h4>
					{
					useHelp ?
						<>
							<p>
								Set up the maximum payload weight that you intend to carry in
								your vehicle.
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
									Maximum payload weight [{state.params.payloadWeight} Kg]:
								</Form.Label>
								<Form.Range
										min={0.05}
										max={10}
										step={0.05}
										onChange={(e) => dispatch(parametersSetPayloadWeight(Number(e.target.value)) as any)}
										value={state.params.payloadWeight}
									/>
							</Form>
						</div>
					</div>
				</div>
				
				{/* wingspan */}
				<div className='box'>
					<h4>Maximum wingspan</h4>
					{
					useHelp ?
						<>
							<p>
								Set up the maximum wingspan for your aircraft. It is the width of the image below.
							</p>
							<div className='centerImage'>
								<img src={wingspan} alt="Nozzle" className='image' />
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
									Maximum wingspan [{state.params.wingSpanMax} cm]:
								</Form.Label>
								<Form.Range
										min={12}
										max={400}
										step={0.05}
										onChange={(e) => dispatch(parametersSetWingspan(Number(e.target.value)) as any)}
										value={state.params.wingSpanMax}
									/>
							</Form>
						</div>
					</div>
				</div>
				{/* fuselage */}
				<div className='box'>
					<h4>Maximum fuselage</h4>
					{
					useHelp ?
						<>
							<p>
								Set up the maximum length of the fuselage of your aircraft. It is the height of the image below.
							</p>
							<div className='centerImage'>
								<img src={wingspan} alt="Nozzle" className='image' />
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
									Maximum fuselage length [{state.params.fuselageLengthMax} cm]:
								</Form.Label>
								<Form.Range
										min={10}
										max={300}
										step={0.05}
										onChange={(e) => dispatch(parametersSetFuselage(Number(e.target.value)) as any)}
										value={state.params.fuselageLengthMax}
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
