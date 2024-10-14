import React, { useState } from 'react';
import './styles/app.scss';
import logo from './res/symbol_nobg.png';
import MenuCreator from './components/menu_creator';
import SubmenuCreator from './components/submenu_creator';
import { connect, useDispatch } from 'react-redux';
import { setMenu } from './store/action';
import { ApplicationState } from './store/reducers/action_reducer';
import Content from './components/Content';
import { toUpperList } from './helpers';

function mapStateToProps(state: any) {
  const s : ApplicationState = {
    menu: state.application.menu,
    otherParams: state.application.otherParams,
    submenus: state.application.submenus,
    theme: state.theme
  }
  return s;
}

const App: React.FC<ApplicationState> = (state) => {

  const [selectedMenu, setSelectedMenu] = useState<string>('process');
  const dispatch = useDispatch();

	const selectedSubMenus = toUpperList(state.submenus).join('/ ');

  const handleMenuSelect = (menu: string) => {
    setSelectedMenu(menu);
    dispatch(setMenu(menu));
  };


  return (
    <div className="App container-fluid">
      {/* Top Navbar */}
      <div className="header">
        <img src={logo} alt="" height='30px' id="logo" />
        Dynamicas
        <p id="navdesc">
          Truly fly your own
        </p>
      </div>
    
      <div className="main">
        <div className="menus">
          <MenuCreator onSelectMenu={handleMenuSelect} />
        </div>
        <div className="submenus">
          <SubmenuCreator menu={selectedMenu} />
        </div>
        <div className="content">
          {/* You can later extend this for more dynamic content */}
          <Content />          
        </div>
      </div>

      <div className="footer">
        Macrodat Dynamicas
      </div>
    </div>
    
  );
};

export default connect(mapStateToProps)(App);
