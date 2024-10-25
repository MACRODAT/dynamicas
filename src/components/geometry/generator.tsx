import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { States, allInterfaces } from '../../helpers'
import '../process/3dprint.scss'
import { Form } from 'react-bootstrap'
import camberPic from '../../res/camber.png';

const OwnGenerator: React.FC<States> = (state: States) => {
	const [useHelp, setUseHelp] = useState(false);
	const [camber, setCamber] = useState(2);
	const [pos, setPos] = useState(40);
	const [thickness, setThickness] = useState(12);
	const [pts, setPts] = useState(101);

	const dispatch = useDispatch();

	const setHelp = (e: any) => {
		setUseHelp(!useHelp)
	}

	return (
		<div>
			<h3>Configure a custom NACA airfoil</h3>
			<hr />
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
				{/* EXPECTED WEIGHT */}
				<div className='box'>
						<h6>Max camber (%)</h6>
						{
						useHelp ?
							<>
								<p>
									What's the maximum camber of your airfoil (see picture for reference):
								</p>
								<div className='centerImage'>
									<img src={camberPic} alt="Nozzle" className='image' />
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
										Camber [{camber} %]:
									</Form.Label>
									<Form.Range
											min={0}
											max={9.5}
											step={0.05}
											onChange={(e) => setCamber(Number(e.target.value))}
											value={camber}
										/>
								</Form>
							</div>
						</div>
				</div>
			</div>
		</div>
	)
}

export default connect(allInterfaces)(OwnGenerator)
