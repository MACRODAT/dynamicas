import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { States, allInterfaces } from '../../helpers'
import '../process/3dprint.scss'
import { Form } from 'react-bootstrap'
import camberPic from '../../res/camber.png';
import camberPicMax from '../../res/maxcamber.jpg';

const autoUpdate = false;

const OwnGenerator: React.FC<States> = (state: States) => {
	const [loading, setLoading] = useState(false);
	const [url_, setUrl] = useState("");
	const [useHelp, setUseHelp] = useState(false);
	const [camber, setCamber] = useState(2);
	const [pos, setPos] = useState(40);
	const [thickness, setThickness] = useState(12);
	const [pts, setPts] = useState(101);
	

	// const dispatch = useDispatch();
	const code = String(Math.floor(camber)) + String(Math.floor(pos / 10)) + 
						thickness.toString().padStart(2, '0');

	const fetchData = async () => {
		try {
			const response = await fetch("http://127.0.0.1:5000/naca/" + code + "/" + pts + "/png"); // Adjust the URL if necessary
			if (!response.ok) {
				throw new Error("Failed to fetch airfoils");
			}
			const screenshotBlob = await response.blob();
			const screenshotURL = URL.createObjectURL(screenshotBlob);
			setUrl(screenshotURL);
			// setAirfoils(airfoilData);
		} catch (err: any) {
			console.log(err.message);
		} finally {
			setLoading(false);
		}
	}

	const downloadDat = async () => {
		
		try {
			const response = await fetch("http://127.0.0.1:5000/naca/" + code + "/" + pts + "/dat"); // Adjust the URL if necessary
			if (!response.ok) {
				throw new Error("Failed to fetch airfoils");
			}
			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = url;
			link.download = 'airfoil.dat';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			window.URL.revokeObjectURL(url); // Clean up the URL object
		} catch (err: any) {
			console.log(err.message);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		if (autoUpdate)
		{
			fetchData()
		}
	}, [camber, pos, thickness, pts])

	const setHelp = (e: any) => {
		setUseHelp(!useHelp)
	}

	return (
		<div>
			<h3>Configure a custom NACA airfoil (NACA {code})</h3>
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
				{/* camber */}
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
											max={9}
											step={1}
											onChange={(e) => setCamber(Number(e.target.value))}
											value={camber}
										/>
								</Form>
							</div>
						</div>
				</div>
				{/* max camber pos */}
				<div className='box'>
						<h6>Max camber position (%)</h6>
						{
						useHelp ?
							<>
								<p>
									Where do you want the maximum camber of your airfoil 
									relative to the leading edge (see picture for reference):
								</p>
								<div className='centerImage'>
									<img src={camberPicMax} alt="Nozzle" className='image' />
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
										Max Camber Position [{pos} %]:
									</Form.Label>
									<Form.Range
											min={0}
											max={90}
											step={10}
											onChange={(e) => setPos(Number(e.target.value))}
											value={pos}
										/>
								</Form>
							</div>
						</div>
				</div>
				{/* thickness */}
				<div className='box'>
						<h6>Max Thickness (%)</h6>
						{
						useHelp ?
							<>
								<p>
									What's the maximum thickness of your airfoil (see picture for reference):
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
										Max Camber Position [{thickness} %]:
									</Form.Label>
									<Form.Range
											min={1}
											max={40}
											step={1}
											onChange={(e) => setThickness(Number(e.target.value))}
											value={thickness}
										/>
								</Form>
							</div>
						</div>
				</div>
				{/* number of points */}
				<div className='box'>
						<h6>Number of points</h6>
						{
						useHelp ?
							<>
								<p>
									What's the number of points generated for your airfoil ?
								</p>
								<div className='centerImage'>
									{/* <img src={camberPic} alt="Nozzle" className='image' /> */}
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
										Number of points [{pts} points]:
									</Form.Label>
									<Form.Range
											min={100}
											max={400}
											step={50}
											onChange={(e) => setPts(Number(e.target.value))}
											value={pts}
										/>
								</Form>
							</div>
						</div>
				</div>
			</div>
			<hr />
			<h6>
				{loading ? "Loading..." : ""}
			</h6>
			<div
				style={{width: '100%', maxWidth: '500px', 
				minWidth: '200px', margin: 'auto', 
				left: 'auto', right: 'auto'}}
				>
				<img src={url_} style={{width: '100%'}} />
			</div>
			<h6 className='link' onClick={() => fetchData()}>
				Refresh
			</h6>
			<h6 className='link' onClick={() => downloadDat()}>
				Download .dat file for airfoil.
			</h6>
		</div>
	)
}

export default connect(allInterfaces)(OwnGenerator)
