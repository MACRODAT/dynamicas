import React, { useState } from 'react';
import { addSubmenu } from '../store/logic/actionLogic';
import { connect, useDispatch } from 'react-redux';
import { GeometryState } from '../store/reducers/geometry_reducer';
import { ApplicationState } from '../store/reducers/action_reducer';

interface MenuProps {
  onSelectMenu: (menu: string) => void;
}

let mapStateToProps = (state: any, ownProps: any): 
                      {geo: GeometryState, action: ApplicationState, ownProps: any} => {
  let geometryState : GeometryState = state.geometry;
  let actionState : ApplicationState = state.action;
  return {
    geo: geometryState,
    action: actionState,
    ownProps: ownProps
  }
}

const MenuCreator: React.FC<MenuProps> = (state) => {
  const [activeMenu, setActiveMenu] = useState<string>('');

  const menus = ['process', 'geometry', 'parameters', 'results'];

  const dispatch = useDispatch();
  let onSelectMenu = state.ownProps.onSelectMenu;

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
    onSelectMenu(menu);

    // if (menu.toUpperCase() == "GEOMETRY")
    // {
    //   dispatch(addSubmenu("Airfoil", 0) as any);
    // }
  };

  return (
    <div>
      {menus.map((menu) => (
        <div
          key={menu}
          className={`menu-item ${activeMenu === menu ? 'active' : ''}`}
          onClick={() => handleMenuClick(menu)}
        >
          {menu.charAt(0).toUpperCase() + menu.slice(1)}
        </div>
      ))}
    </div>
  );
};

export default connect(mapStateToProps) (MenuCreator);
