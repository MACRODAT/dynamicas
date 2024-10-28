import React, { useState } from 'react';

import { Form } from 'react-bootstrap';
import { addSubmenu, setGeometryType, setSubmenus } from '../store/logic/actionLogic';
import { connect, useDispatch } from 'react-redux';
import { GeometryState } from '../store/reducers/geometry_reducer';
import { geometrySetAirfoilName, geometrySetClass } from '../store/logic/geometryLogic';
import { airfoilData } from './geometry/airfoil';
import { States, allInterfaces } from '../helpers';
import { processPrintingSpeed, processSet3DDiameter, processSetProcess } from '../store/logic/processLogic';
import { parametersSimulationType } from '../store/logic/parametersLogic';
import { solverSetMaxIterations } from '../store/logic/solverLogic';

import { CiEdit } from "react-icons/ci";
import { MdOutlineDownloadDone } from "react-icons/md";
import Priorities from './priority/priorities';

// interface SubmenuProps {
//   menu: string;
// }

// const mapStateToProps = (state : any, ownProps: any) => {
//   const geoState: GeometryState = state.geometry;
// 	return {geometrystate: geoState, ownProps: ownProps};
// }

const SubmenuCreator: React.FC<States> = (state: States) => {
  const [selectedProcess, setselectedProcess] = useState<string>(state.process.selectedProcess);
  
  const {menu} = state.ownProps;

  const [description, setDescription] = useState<string>('');
  const [geometryImportType, setGeometryImportType] = useState<string>('provided');

  const geometrystate: GeometryState = state.geo;

  const dispatch = useDispatch();

  const handleProcessChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setselectedProcess(newValue);
    dispatch(processSetProcess(newValue) as any);
    // dispatch(setSubmenus([newValue]) as any); //TOCHECK
    updateDescription(newValue);
    // dispatch(addSubmenu(newValue, 0) as any);
  };

  const handleGeometryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    dispatch(addSubmenu(val, 0) as any);
    // dispatch(geometrySetClass(val) as any);
    dispatch(setGeometryType(val) as any);
    let d: airfoilData = {description: "", name: "", screenshot: ""};
    dispatch(geometrySetAirfoilName(d) as any);
  }

  const handleSimulationType = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    dispatch(addSubmenu(val, 0) as any);
    dispatch(parametersSimulationType(val) as any);
  }

  const handleSolverType = (event: string) => {
    dispatch(addSubmenu(event, 0) as any);
  }

  const handleGeometryImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGeometryImportType(event.target.value)
    dispatch(addSubmenu(event.target.value, 1) as any)
    dispatch(setGeometryType(event.target.value) as any);
  }

  const updateDescription = (menuItem: string) => {
    switch (menuItem) {
      case '3D print':
        setDescription('3D printing involves building up an object layer by layer using a nozzle. You can adjust the nozzle diameter, printing speed, and other parameters to control the resolution and speed of your print.');
        break;
      case 'Joining (Fasteners)':
        setDescription('Fasteners like rivets, screws, and snaps provide various levels of disassembly options. Choose the method based on your structural requirements.');
        break;
      case 'Joining (Adhesives)':
        setDescription('Adhesives provide bonding without additional hardware. Suitable for lightweight or non-structural components.');
        break;
      case 'Flight Parameters':
        setDescription('Flight parameters include setting margins for time, speed, and weight to ensure proper flight performance and efficiency.');
        break;
      case 'Geometry':
        setDescription('Select the type of geometry to define the 3D shape of your UAV. You can import custom geometries or select predefined types like airfoil, fixed wing, or quadcopter.');
        break;
      case 'Solver':
        setDescription('The solver is used to calculate the results of your simulation. It uses many important parameters, but you will be best leaving important parameters as they are.')
        break;
      default:
        setDescription('Select a menu item to configure its options.');
        break;
    }
  };

  const handleNozzleDiameter = (event: React.ChangeEvent<HTMLInputElement>) => {
    let val = event.target.value;
    let val_ = Number(val);
    dispatch(processSet3DDiameter(val_) as any)
  }
  
  const handlePrintingSpeed = (event: React.ChangeEvent<HTMLInputElement>) => {
    let val = event.target.value;
    let val_ = Number(val);
    dispatch(processPrintingSpeed(val_) as any)
  }
 
  const handleMaxIterations = (event: React.ChangeEvent<HTMLInputElement>) => {
    let val = event.target.value;
    let val_ = Number(val);
    dispatch(solverSetMaxIterations(val_) as any)
  }

  const renderProcessSubmenuOptions = () => {
    switch (selectedProcess) {
      case '3D print':
        return (
          <div className="">
            <h6 className={"link" + (state.process.done ? ' done' : ' notdone')}
                onClick={() => dispatch(addSubmenu('3D Print', 0) as any)}>
                  {
                    state.process.done ?
                    <MdOutlineDownloadDone /> : 
                    <CiEdit />
                  }
              Set up 3d printing options ({state.process.done ? "Complete" : "Incomplete"})
            </h6>
          </div>
        );
      case 'Joining (Fasteners)':
        return (
          <div className="p-1">
            <Form.Group  className='my-3' controlId="fasteningMethod">
              <Form.Label>Fastening Method</Form.Label>
              <Form.Control as="select" defaultValue="Rivet">
                <option value="Rivet">Rivet</option>
                <option value="Screw">Screw</option>
                <option value="Snap">Snap</option>
              </Form.Control>
              <hr />
              <Form.Text className=" front-400">
                Choose the method for joining components. Rivets provide permanent fastening, while screws and snaps allow for disassembly.
              </Form.Text>
            </Form.Group>
            <hr />
          </div>
        );
      case 'Joining (Adhesives)':
        return (
          <div className="p-3">
            <Form.Group  className='my-3' controlId="enableAdhesives">
              <Form.Label>Enable Adhesives</Form.Label>
              <Form.Check type="checkbox" defaultChecked />
              <Form.Text className=" front-400">
                Enabling adhesives allows the use of bonding agents like glue or epoxy for component assembly.
              </Form.Text>
            </Form.Group>
          </div>
        );
	  default:
		  return <div className="p-3">Select a menu item to configure its options.</div>;
		  
	};
  };

  const renderParametersOptions = () => {
        if (geometrystate.selectedGeometry == "provided")
        {
          return (
            <div className='p-1'>
              <Form.Group className='my-3'>
                <Form.Label>
                  Set simulation type:
                </Form.Label>
                <Form.Control as='select' 
                      value={state.params.simulationType}
                      onChange={handleSimulationType}
                      >
                  <option value="">Select one.</option>
                  <option value="2D">2D simulation</option>
                  <option value="3D">3D simulation</option>
                </Form.Control>
              </Form.Group>
            </div>
          )
        }

        return (
          <div className="p-1">
            <Form.Group  className='my-3' controlId="flightTimeMargin">
              <Form.Label>Flight Time Margin (min)</Form.Label>
              <Form.Control type="number" placeholder="5" defaultValue={5} />
              <Form.Text className=" front-400">
                Set the margin of error for flight time, ensuring the UAV has a safety buffer.
              </Form.Text>
            </Form.Group>
            
            <hr />
            <Form.Group  className='my-3' controlId="expectedFlightTime">
              <Form.Label>Expected Flight Time (min)</Form.Label>
              <Form.Control type="number" placeholder="20" defaultValue={20} />
              <Form.Text className=" front-400">
                The estimated flight time based on power consumption and load.
              </Form.Text>
            </Form.Group>
            <hr />

            <Form.Group  className='my-3' controlId="speedMargin">
              <Form.Label>Speed Margin (m/s)</Form.Label>
              <Form.Control type="number" placeholder="2" defaultValue={2} />
              <Form.Text className=" front-400">
                Set the margin of error for speed to ensure stability and control during flight.
              </Form.Text>
            </Form.Group>
            <hr />

            <Form.Group  className='my-3' controlId="expectedSpeed">
              <Form.Label>Expected Speed (m/s)</Form.Label>
              <Form.Control type="number" placeholder="15" defaultValue={15} />
              <Form.Text className=" front-400">
                The estimated average speed based on propulsion and drag.
              </Form.Text>
            </Form.Group>
          </div>
        );
	};

  const renderSolutionOptions = () => {
    // console.log(state.geo)
    if (geometrystate.selectedGeometry == "provided")
    {
      return (
        <div className='p-1'>
            <div className='menuRes' onClick={() => handleSolverType("")}>
              Intro
            </div>
            <div className='menuRes' onClick={() => handleSolverType("folder")}>
              View my folder structure
            </div>
            <div className='menuRes'>
              Item 1
            </div>
            <div className='menuRes'>
              Item 1
            </div>
        </div>
      )
    }
  }

  const renderSolverOptions = () => {
        if (geometrystate.selectedGeometry == "provided")
        {
          return (
            <div className='p-1'>
              <Form.Group className='my-3'>
                <Form.Label>
                  Set max iterations:
                </Form.Label>
                <Form.Control
                      type='number'
                      value={state.solver.maxIterations}
                      onChange={handleMaxIterations}
                       />
              </Form.Group>
            </div>
          )
        }

        return (
          <div className="p-1">
            To be implemented
           
          </div>
        );
	};

  const renderGeometryOptions = () => {
      return (
        <div className="">
          <hr />
          <Form.Group  className='my-3 done' controlId="geometryType">
            <Form.Label>Which airfoil to use?</Form.Label>
            <Form.Control className='done' as="select" disabled={true} value={geometrystate.geometryType} onChange={handleGeometryChange}>
              <option value="">Please choose</option>
              {/* <option value="Airfoil">Fixed wing</option> */}
              <option value="Fixed wing">Fixed Wing</option>
              <option value="Multirotor">Multirotor</option>
              {/* <option value="Custom">Custom</option> */}
            </Form.Control>
            <Form.Text className="front-400 italic">
              Choose the type of geometry to import or preview for your UAV. Options include predefined geometries like airfoil and fixed wing, or custom geometries.
            </Form.Text>
          </Form.Group>
          <hr />

          {
            geometrystate.geometryType == "Fixed wing" ? 
            <Form.Group className='my-3' controlId="geometryImport">
              <Form.Label>how do you want to set your wing airfoil profile?</Form.Label>
              <Form.Control as="select" defaultValue={geometrystate.selectedGeometry} onChange={handleGeometryImport}>
                <option value="">Please select</option>
                <option value="provided">Preset NACA airfoils (select best)</option>
                <option value="ownGenerator">My own (Using NACA generator)</option>
                <option value="ownCustom" disabled={true}>My own (Import coordinates)</option>
              </Form.Control>
            </Form.Group> : <></>
          }
          
          
          {
            (geometryImportType == "provided") ? 
            (
              <Form.Group  className='my-3' controlId="importGeometry">
                <Form.Label>Select one of the preset NACA airfoils to continue.</Form.Label>
              </Form.Group>
            ) : <></>
          }
          {
            (geometryImportType == "ownGenerator") ? 
            (
              <Form.Group  className='my-3' controlId="importGeometry">
                <Form.Label>Please use the NACA airfoil generator to select an appropriate geometry.</Form.Label>
              </Form.Group>
            ) : <></>
          }
          {
            (geometryImportType == "ownCustom") ? 
            (
              <>
                <Form.Group  className='my-3' controlId="importGeometry">
                  <Form.Label>Import Geometry</Form.Label>
                  <Form.Control type="file" />
                  <Form.Text className=" front-400">
                    Upload a file containing the 3D geometry of your UAV. This will allow you to preview and manipulate the geometry.
                  </Form.Text>
                </Form.Group>
                <Form.Group  className='my-3' controlId="meshQuality">
                  <Form.Label>Mesh Quality</Form.Label>
                  <Form.Control type="number" placeholder="5" defaultValue={5} />
                  <Form.Text className=" front-400">
                    Mesh quality determines the level of detail in the 3D model. Higher values provide more accuracy but may slow down rendering.
                  </Form.Text>
                </Form.Group>
              </>
            ) : <></>
          }
          
          
        </div>
      );
  }

  const menuOptions = [
    '',
    '3D print',
    'Joining (Fasteners)',
    'Joining (Adhesives)',
  ];

  const renderMainMenus = () => {
    // console.log(menu)
	switch (menu)
	{
		case 'process':
			return (
				<>
					<Form.Group  className='my-3 bold' controlId="menuSelection">
						<Form.Label>What's your manufacturing process?</Form.Label>
						<Form.Control as="select" value={selectedProcess} onChange={handleProcessChange}>
              {menuOptions.map((menuOption) => (
                <option key={menuOption} value={menuOption}>
                {menuOption}
                </option>
              ))}
						</Form.Control>
					</Form.Group>
				
					{/* Render options for the selected menu */}
					<div className="dynamic-description mt-3">
						<p className='italic'>{description}</p>
					</div>
					<div className="menu-options mt-3">
						{renderProcessSubmenuOptions()}
					</div>

          <hr />

          <Form.Group className='my-3 bold' controlId='aircraftType'>
            <Form.Label>What's your air vehicle type?</Form.Label>
            <Form.Control as="select" 
                  onChange={(e) => dispatch(geometrySetClass(e.target.value) as any)}
                  value={state.geo.geometryType}>
              <option key="">Select one</option>
              <option key="Fixed wing">Fixed wing</option>
              <option key="multirotor" disabled={true}>Multirotor</option>
            </Form.Control>
          </Form.Group>
          <div className="dynamic-description mt-3">
						<p className='italic'>Set up the type aircraft that you're intending to build.</p>
					</div>
					<div className="menu-options mt-3">
            <h6 className={"link" + (state.params.doneInitialSketch ? ' done' : ' notdone')}
                onClick={() => dispatch(addSubmenu('fixed wing specs', 0) as any)}>
                  {
                    state.process.done ?
                    <MdOutlineDownloadDone /> : 
                    <CiEdit />
                  }
              Set up initial {state.geo.geometryType} specs. ({state.params.doneInitialSketch ? "Complete" : "Incomplete"})
            </h6>
					</div>
				</>
			)
		case 'parameters':
			return (
				<>
					<h3>Parameters</h3>
					<div className="dynamic-description mt-3">
						<p>{description}</p>
					</div>
					<div className="menu-options mt-3">
						{renderParametersOptions()}
					</div>
				</>
				)
		case 'solver':
			return (
				<>
					<h3>Solver</h3>
					<div className="dynamic-description mt-3">
						<p>The solver is used to calculate the results of your simulation. 
              It uses many important parameters, but you will be best leaving important 
              parameters as they are.</p>
					</div>
					<div className="menu-options mt-3">
						{renderSolverOptions()}
					</div>
				</>
				)
				
		case 'geometry':
			return (
				<>
					<h3>Geometry</h3>
					<div className="dynamic-description mt-3">
						<p>How do you want your {state.geo.geometryType} to look like ? let's choose some elements.</p>
					</div>
					<div className="menu-options">
						{renderGeometryOptions()}
					</div>
				</>
			)
    case 'Priorities':
      return <Priorities />
    case 'results':
      return (
        <>
          <h3>Results pane</h3>
					<div className="dynamic-description mt-3">
						<p>Display the results as computer from your simulation.</p>
					</div>
					<div className="menu-options mt-3">
						{renderSolutionOptions()}
					</div>
        </>
      )
    default:
      return <p className='italic'>No actions here.</p>
	}
  }

  return (
    <div id="submenu-container">
      {renderMainMenus()}
    </div>
  );
};

export default connect(allInterfaces) (SubmenuCreator);
