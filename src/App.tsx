import React, { useEffect, useState } from 'react';
import './styles/app.scss';
import logo from './res/symbol_nobg.png';
import MenuCreator from './components/menu_creator';
import SubmenuCreator from './components/submenu_creator';
import { connect, useDispatch, useSelector } from 'react-redux';
import { setMenu, setTheme } from './store/logic/actionLogic';
import { ApplicationState } from './store/reducers/action_reducer';
import Content from './components/Content';
import { toUpperList } from './helpers';
import { Form } from 'react-bootstrap';

function mapStateToProps(state: any) {
  const s : ApplicationState = {
    menu: state.application.menu,
    otherParams: state.application.otherParams,
    submenus: state.application.submenus,
    theme: state.application.theme,
    themeSchema: state.application.themeSchema
  }
  return s;
}

const App: React.FC<ApplicationState> = (state: ApplicationState) => {

  const [selectedMenu, setSelectedMenu] = useState<string>('process');
  const dispatch = useDispatch();

	const selectedSubMenus = toUpperList(state.submenus).join('/ ');

  const handleMenuSelect = (menu: string) => {
    setSelectedMenu(menu);
    dispatch(setMenu(menu) as any);
  };

  useEffect(() => {
    const root = document.documentElement;
    // console.log(state.themeSchema)
    Object.keys(state.themeSchema).forEach((key: string) => {
      // console.log(key);
      root.style.setProperty(`--${key}`, state.themeSchema[key]);
    });
  }, [state.themeSchema]);


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
        <h6 className='inlineh6'>
          Macrodat Dynamicas
        </h6>
        <h6 className='inlineh6'>
          Set theme:
          <Form className='inline  align-items-center'>
            <Form.Group>
              <Form.Select as="select" value={state.theme}
                        onChange={(e) => dispatch(setTheme(e.target.value) as any)}
                        style={{fontSize: '10px', padding: 2, paddingLeft: 6, paddingRight: 40, marginLeft: 12,}}>
                <option value="blue sky">
                  Blue sky
                </option>
                <option value={"black space"}>
                  Black space
                </option>
                <option value={"green park"}>
                  Green park
                </option>
              </Form.Select>
            </Form.Group>
          </Form>
        </h6>
      </div>
    </div>
    
  );
};

export default connect(mapStateToProps)(App);
