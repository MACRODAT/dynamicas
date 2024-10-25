import React, { MouseEventHandler, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { GeometryState } from '../../store/reducers/geometry_reducer';
import { ApplicationState } from '../../store/reducers/action_reducer';
import { ProcessState } from '../../store/reducers/3dprint_reducer';
import nozzle from "../../res/nozles.webp";
import diameter from "../../res/diameter.webp";
import materials from "../../res/materials.webp";
import printingspeed from "../../res/printingspeed.jpg";
import fillingPercent from "../../res/fillingPercen.png";
import filamentDiameter from "../../res/filamentDiameter.webp";
import './3dprint.scss'
import { Form } from 'react-bootstrap';
import { MaterialState } from '../../store/reducers/material_reducer';
import { processFilamentDiameter, processFillingPercent, processPrintingSpeed, processSet3DDiameter, processSetMaterial } from '../../store/logic/processLogic';

type Stator = {process: ProcessState, action: ApplicationState, material: MaterialState, ownProps: any};

let mapStateToProps = (state: any, ownProps: any): 
                      Stator => {
  let actionState : ApplicationState = state.action;
  let process : ProcessState = state.process;
  let material : MaterialState = state.material;
  return {
	process: process,
    action: actionState,
    material: material,
    ownProps: ownProps
  }
}

const TDPrint: React.FC<Stator> = (state: Stator) => {
  const [activeMenu, setActiveMenu] = useState<string>('');
  const [useHelp, setUseHelp] = useState(false);

  const dispatch = useDispatch();

  const setHelp = (e: any) => {
	setUseHelp(!useHelp)
  }

  const changeMaterial = (e: any) => {
	const val = e.target.value;
	dispatch(processSetMaterial(val) as any)
  }

  const handleFilamentDiameter = (event: React.ChangeEvent<HTMLInputElement>) => {
	const val = event.target.value;
	const nbr = Number(val);
    dispatch(processFilamentDiameter(nbr) as any)
  }

  const handleFillingPercent = (event: React.ChangeEvent<HTMLInputElement>) => {
	const val = event.target.value;
	const nbr = Number(val);
    dispatch(processFillingPercent(nbr) as any)
  }

  return (
    <div style={{}} className=''>
      <h1>3D Printing as manufacturing process</h1>
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
		
		{/* Nozzle Information */}
		<div className='box'>
			<h4>Nozzle</h4>
			{
				useHelp ?
				<>
					<p>
						The nozzle is one of the most crucial parts of a 3D printer, as it dictates how the material is deposited
						layer by layer. For precise airfoil or drone component creation, a high-quality nozzle is required.
					</p>
					<div className='centerImage'>
						<img src={nozzle} alt="Nozzle" className='image' />
					</div>
					<div className="centerImage">
						Source: <a href="https://blog.diyelectronics.co.za/diyelectronics-3d-printer-nozzle-guide/">Diy Electronics</a>
					</div>
				</>
				:
				""
			}
			
			<div className='centerImage actionBox'>
				Actions:
				<hr />
				<div className="div">
					No action can be taken here. Please select the best material for your nozzle.
				</div>
			</div>
		</div>

		{/* Nozzle Diameter */}
		<div className='box'>
			<h4>Nozzle Diameter</h4>
			{
				useHelp ?
				<>
					<p>
						Nozzle diameter affects the precision of your prints. Smaller diameters (e.g., 0.2mm) provide finer detail but take longer to print. 
						Larger diameters (e.g., 0.4mm or 0.6mm) allow for faster printing but reduce the level of detail. 
						For drone components requiring both strength and aerodynamics, a 0.4mm nozzle is a great starting point.
					</p>
					<div className='centerImage'>
						<img src={diameter} alt="Nozzle" className='image' />
					</div>
				</> : ""
			}

			<div className='centerImage actionBox'>
				Actions:
				<hr />
				<div className="div">
					Selected nozzle diameter: <b>{state.process.nozzleDiameter}mm</b>
					<Form>
						<Form.Label>
							Change nozzle diameter:
						</Form.Label>
						<Form.Range
								min={0.1}
								max={1.6}
								step={0.05}
								onChange={(e) => dispatch(processSet3DDiameter(Number(e.target.value)) as any)}
								value={state.process.nozzleDiameter}
							/>
					</Form>
				</div>
			</div>
		</div>

		{/* Materials */}
		<div className='box'>
			<h4>Material Types</h4>
			{
				useHelp ?
				<>
					<p>
						Choosing the right material is essential for creating durable and lightweight drone components.
						Here are a few common materials:
					</p>
					<ul>
					<li><b>PLA</b>: Easy to print, good for prototypes, but not very durable.</li>
					<li><b>ABS</b>: Stronger than PLA and more heat-resistant, but can be tricky to print due to warping.</li>
					<li><b>PETG</b>: A good middle ground between PLA and ABS, offering strength and heat resistance.</li>
					<li><b>Nylon</b>: Lightweight, durable, and ideal for mechanical parts like drone arms.</li>
					</ul>
					
					<div className='centerImage'>
						<img src={materials} alt="Nozzle" className='image' />
					</div>
				</> : ""
			}
			<div className='centerImage actionBox'>
				Actions:
				<hr />
				<div className="div">
					<Form>
						<Form.Group>
							<Form.Label>
								Select your material of choice: 
							</Form.Label>
							<Form.Select 
									value={state.material.material}
									onChange={changeMaterial}
									>
								<option value="ANY">Select</option>
								<option value="PLA">PLA</option>
								<option value="ABS">ABS</option>
								<option value="PETG">PETG</option>
								<option value="NYLON">NYLON</option>
							</Form.Select>
						</Form.Group>
					</Form>
				</div>
			</div>
		</div>

		{/* Filament diameter */}
		<div className='box'>
			<h4>Filament diameter</h4>
			{
				useHelp ?
				<>
					<p>
					3D printing filament in different colours with models created using 
					the filament. 
					Filament comes in a range of diameters, 
					most commonly 1.75 mm and 2.85 mm, 
					with the latter often being confused with the less 
					common 3 mm. Filament consists of one continuous slender plastic 
					thread spooled into a reel.
					</p>
					<div className='centerImage'>
						<img src={filamentDiameter} alt="Nozzle" className='image' />
					</div>			
				</> :  ""
			}
			<div className='centerImage actionBox'>
				Actions:
				<hr />
				<div className="div">
					<Form>
						<Form.Group>
							<Form.Label>
								Selected diameter for your filament: 
							</Form.Label>
							<Form.Range
								min={0.1}
								max={10}
								step={0.05}
								onChange={handleFilamentDiameter}
								value={state.process.filamentDiameter}
							/>
						</Form.Group>
					</Form>
					<b>{state.process.filamentDiameter}mm</b>
				</div>
			</div>
		</div>

		{/* Printing Speed */}
		<div className='box'>
			<h4>Printing Speed</h4>
			{
				useHelp ?
				<>
					<p>
					The speed at which your 3D printer moves affects the quality and accuracy of the final product. 
					For detailed airfoil designs, a slower speed (around 40-60 mm/s) ensures precision.
					</p>
					<div className='centerImage'>
						<img src={printingspeed} alt="Nozzle" className='image' />
					</div>			
				</> :  ""
			}
			<div className='centerImage actionBox'>
				Actions:
				<hr />
				<div className="div">
					Selected speed: <b>{state.process.printingSpeed}mm/s</b>
					<Form>
						<Form.Label>
							Change nozzle diameter:
						</Form.Label>
						<Form.Range
								min={10}
								max={100}
								step={5}
								onChange={(e) => dispatch(processPrintingSpeed(Number(e.target.value)) as any)}
								value={state.process.printingSpeed}
							/>
					</Form>
				</div>
			</div>
		</div>


		{/* Filling percent */}
		<div className='box'>
			<h4>Filling percent</h4>
			{
				useHelp ?
				<>
					<p>
					While non-functional 3D prints can be printed with a low infill density (0-15%), 
					functional components should have an infill percentage of at least 50%. 3D infill patterns, 
					such as cubic, octet, and gyroid provide high strength in all directions.
					</p>
					<div className='centerImage'>
						<img src={fillingPercent} alt="Nozzle" className='image' />
					</div>			
				</> :  ""
			}
			<div className='centerImage actionBox'>
				Actions:
				<hr />
				<div className="div">
					<Form>
						<Form.Group>
							<Form.Label>
								Selected a filling % for your print:
							</Form.Label>
							<Form.Range
								min={1}
								max={100}
								step={1}
								onChange={handleFillingPercent}
								value={state.process.fillingPercent}
							/>
						</Form.Group>
					</Form>
					<b>{state.process.fillingPercent}%</b>
				</div>
			</div>
		</div>
	  </div>

    </div>
  );
};

export default connect(mapStateToProps)(TDPrint);
