import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { GeometryState } from '../../store/reducers/geometry_reducer';
import { ApplicationState } from '../../store/reducers/action_reducer';
import { ProcessState } from '../../store/reducers/3dprint_reducer';
import nozzle from "../../res/nozles.webp";
import diameter from "../../res/diameter.webp";
import './3dprint.scss'

type Stator = {process: ProcessState, action: ApplicationState, ownProps: any};

let mapStateToProps = (state: any, ownProps: any): 
                      Stator => {
  let actionState : ApplicationState = state.action;
  let process : ProcessState = state.process;
  return {
	process: process,
    action: actionState,
    ownProps: ownProps
  }
}

const TDPrint: React.FC<Stator> = (state: Stator) => {
  const [activeMenu, setActiveMenu] = useState<string>('');

  const dispatch = useDispatch();

  return (
    <div style={{}}>
      <h1>3D Printing as manufacturing process</h1>
	  <hr />
      {/* Nozzle Information */}
      <div className='box'>
        <h2>Nozzle</h2>
        <p>
          The nozzle is one of the most crucial parts of a 3D printer, as it dictates how the material is deposited
          layer by layer. For precise airfoil or drone component creation, a high-quality nozzle is required.
        </p>
		<div className='centerImage'>
			<img src={nozzle} alt="Nozzle" width="800" />
		</div>
		<div className="centerImage">
			Source: <a href="https://blog.diyelectronics.co.za/diyelectronics-3d-printer-nozzle-guide/">Diy Electronics</a>
		</div>

      </div>

      {/* Nozzle Diameter */}
      <div style={{ marginBottom: '20px' }}>
        <h2>Nozzle Diameter</h2>
        <p>
          Nozzle diameter affects the precision of your prints. Smaller diameters (e.g., 0.2mm) provide finer detail but take longer to print. 
          Larger diameters (e.g., 0.4mm or 0.6mm) allow for faster printing but reduce the level of detail. 
          For drone components requiring both strength and aerodynamics, a 0.4mm nozzle is a great starting point.
        </p>
        <div className='centerImage'>
			<img src={diameter} alt="Nozzle" width="800" />
		</div>
      </div>

      {/* Materials */}
      <div style={{ marginBottom: '20px' }}>
        <h2>Material Types</h2>
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
        <img src="image_path/materials.png" alt="Materials" width="300" />
      </div>

      {/* Printing Speed */}
      <div style={{ marginBottom: '20px' }}>
        <h2>Printing Speed</h2>
        <p>
          The speed at which your 3D printer moves affects the quality and accuracy of the final product. 
          For detailed airfoil designs, a slower speed (around 40-60 mm/s) ensures precision.
        </p>
        <img src="image_path/printing_speed.png" alt="Printing Speed" width="300" />
      </div>

      {/* Layer Height */}
      <div style={{ marginBottom: '20px' }}>
        <h2>Layer Height</h2>
        <p>
          Layer height impacts the smoothness of the final print. For aerodynamic surfaces like airfoils, a smaller
          layer height (0.1mm or 0.2mm) ensures a smoother surface and better aerodynamic performance.
        </p>
        <img src="image_path/layer_height.png" alt="Layer Height" width="300" />
      </div>

      {/* Infill Density */}
      <div style={{ marginBottom: '20px' }}>
        <h2>Infill Density</h2>
        <p>
          Infill refers to the internal structure of the 3D print. Higher infill density provides more strength but increases weight.
          For drones, a balance is important. A 20-50% infill density is common, depending on the strength required.
        </p>
        <img src="image_path/infill.png" alt="Infill Density" width="300" />
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(TDPrint);
