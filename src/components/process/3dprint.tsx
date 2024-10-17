import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { GeometryState } from '../../store/reducers/geometry_reducer';
import { ApplicationState } from '../../store/reducers/action_reducer';

type Stator = {geo: GeometryState, action: ApplicationState, ownProps: any};

let mapStateToProps = (state: any, ownProps: any): 
                      Stator => {
  let geometryState : GeometryState = state.geometry;
  let actionState : ApplicationState = state.action;
  return {
    geo: geometryState,
    action: actionState,
    ownProps: ownProps
  }
}

const TDPrint: React.FC<Stator> = (state: Stator) => {
  const [activeMenu, setActiveMenu] = useState<string>('');

  const dispatch = useDispatch();


  let moveNext: boolean = true;

  return (
    <div>
		<h3>3D Printing</h3>
    </div>
  )
};

export default connect(mapStateToProps)(TDPrint);
