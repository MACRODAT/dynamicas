import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { GeometryState } from '../../store/reducers/geometry_reducer';
import { ApplicationState } from '../../store/reducers/action_reducer';
import { ProcessState } from '../../store/reducers/3dprint_reducer';

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
    <div>
		<h3>3D Printing</h3>
    </div>
  )
};

export default connect(mapStateToProps)(TDPrint);
