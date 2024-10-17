import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { addSubmenu, setGeometryType, setSubmenus } from '../store/logic/actionLogic';
import { connect, useDispatch } from 'react-redux';
import { GeometryState } from '../store/reducers/geometry_reducer';
import { geometrySetAirfoilName, geometrySetClass } from '../store/logic/geometryLogic';
import { airfoilData } from './geometry/airfoil';

interface SubmenuProps {
  menu: string;
}

const mapStateToProps = (state : any, ownProps: any) => {
  const geoState: GeometryState = state.geometry;
	return {geometrystate: geoState, ownProps: ownProps};
}

const SubmenuCreator: React.FC<SubmenuProps> = (state: any) => {
  const [selectedMenu, setSelectedMenu] = useState<string>('3D print');
  const [description, setDescription] = useState<string>('');
  const [geometryImportType, setGeometryImportType] = useState<string>('provided');

  const {menu} = state.ownProps;
  const geometrystate: GeometryState = state.geometrystate;

  const dispatch = useDispatch();

  const handleMenuChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSelectedMenu(newValue);
    // dispatch(setSubmenus([newValue]) as any); //TOCHECK
    updateDescription(newValue);
  };

  const handleGeometryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    dispatch(addSubmenu(val, 0) as any);
    dispatch(geometrySetClass(val) as any);
    dispatch(setGeometryType("") as any);
    let d: airfoilData = {description: "", name: "", screenshot: ""};
    dispatch(geometrySetAirfoilName(d) as any);
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
      default:
        setDescription('Select a menu item to configure its options.');
        break;
    }
  };

  const renderProcessSubmenuOptions = () => {
    switch (selectedMenu) {
      case '3D print':
        return (
          <div className="p-1">
            <Form>
              <Form.Group  className='my-3' controlId="nozzleDiameter">
                <Form.Label>Nozzle Diameter (mm)</Form.Label>
                <Form.Control type="number" placeholder="0.4" defaultValue={0.4} />
                <Form.Text className="front-400">
                  Nozzle diameter determines the width of the extruded filament. A smaller nozzle provides finer detail but may increase printing time.
                </Form.Text>
              </Form.Group>
              <hr />
              <Form.Group  className='my-3' controlId="printingSpeed">
                <Form.Label>Printing Speed (mm/s)</Form.Label>
                <Form.Control type="number" placeholder="60" defaultValue={60} />
                <Form.Text className=" front-400">
                  Printing speed is provided by the printer, typically indicating the time it takes to complete a layer.
                </Form.Text>
              </Form.Group>
              <hr />

              <Form.Group  className='my-3' controlId="filamentDiameter">
                <Form.Label>Filament Diameter (mm)</Form.Label>
                <Form.Control type="number" placeholder="1.75" defaultValue={1.75} />
                <Form.Text className=" front-400">
                  Filament diameter is usually standardized, with 1.75mm being the most common.
                </Form.Text>
              </Form.Group>
              <hr />

              <Form.Group  className='my-3' controlId="fillingPercent">
                <Form.Label>Filling Percent (%)</Form.Label>
                <Form.Control type="number" placeholder="20" defaultValue={20} />
                <Form.Text className=" front-400">
                  Filling percent indicates how much of the internal volume of the object will be filled with material.
                </Form.Text>
              </Form.Group>
              <hr />
            </Form>
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
                <Form.Control as='select' defaultValue={''}>
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

  const renderGeometryOptions = () => {
      return (
        <div className="p-3">
          <Form.Group  className='my-3' controlId="geometryType">
            <Form.Label>Select Geometry Type</Form.Label>
            <Form.Control as="select" value={geometrystate.geometryType} onChange={handleGeometryChange}>
              <option value="">Please choose</option>
              <option value="Airfoil">Airfoil</option>
              <option value="Fixed Wing">Fixed Wing</option>
              <option value="Quadcopter">Quadcopter</option>
              <option value="Custom">Custom</option>
            </Form.Control>
            <Form.Text className="front-400">
              Choose the type of geometry to import or preview for your UAV. Options include predefined geometries like airfoil and fixed wing, or custom geometries.
            </Form.Text>
          </Form.Group>

          {
            geometrystate.geometryType == "Airfoil" ? 
            <Form.Group className='my-3' controlId="geometryImport">
              <Form.Label>Where do you want your geometry from?</Form.Label>
              <Form.Control as="select" defaultValue={geometrystate.selectedGeometry} onChange={handleGeometryImport}>
                <option value="">Please select</option>
                <option value="provided">NACA airfoils</option>
                <option value="ownGenerator">My own (Using generator)</option>
                <option value="ownCustom">My own (Import coordinates)</option>
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
    '3D print',
    'Joining (Fasteners)',
    'Joining (Adhesives)',
    // 'Flight Parameters',
    // 'Geometry',
  ];

  const renderMainMenus = () => {
	switch (menu)
	{
		case 'process':
			return (
				<>
					<Form.Group  className='my-3' controlId="menuSelection">
						<Form.Label>What's your manufacturing process?</Form.Label>
						<Form.Control as="select" value={selectedMenu} onChange={handleMenuChange}>
						{menuOptions.map((menuOption) => (
							<option key={menuOption} value={menuOption}>
							{menuOption}
							</option>
						))}
						</Form.Control>
					</Form.Group>
				
					{/* Render options for the selected menu */}
					<div className="dynamic-description mt-3">
						<p>{description}</p>
					</div>
					<div className="menu-options mt-3">
						{renderProcessSubmenuOptions()}
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
				
		case 'geometry':
			return (
				<>
					<h3>Geometry</h3>
					<div className="dynamic-description mt-3">
						<p>{description}</p>
					</div>
					<div className="menu-options mt-3">
						{renderGeometryOptions()}
					</div>
				</>
			)
	}
  }

  return (
    <div id="submenu-container">
      {renderMainMenus()}
    </div>
  );
};

export default connect(mapStateToProps) (SubmenuCreator);
