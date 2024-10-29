import React, { useEffect, useState } from 'react';
import './styles/app.scss';
import logo from './res/symbol_nobg.png';
import MenuCreator from './components/menu_creator';
import SubmenuCreator from './components/submenu_creator';
import { connect, useDispatch } from 'react-redux';
import { addSubmenu, setMenu, setSubmenus, setTheme } from './store/logic/actionLogic';
import Content from './components/Content';
import { States, allInterfaces } from './helpers';
import { MdAccountCircle } from "react-icons/md";
import { Form } from 'react-bootstrap';
import Login from './login';
import ProjectMenus from './components/projectMenus';
import { IoCloseCircleSharp } from "react-icons/io5";
import { SET_PROJECT } from './store/user';
import { SET_MENU } from './store/action';
import Signup from './signup';
import LoginForm from './loginForm';

const App: React.FC<States> = (state: States) => {

  const [selectedMenu, setSelectedMenu] = useState<string>('process');
  const dispatch = useDispatch();

  

  const handleMenuSelect = (menu: string) => {
    setSelectedMenu(menu);
    dispatch(setMenu(menu) as any);
  };

  useEffect(() => {
    const root = document.documentElement;
    Object.keys(state.action.themeSchema).forEach((key: string) => {
      root.style.setProperty(`--${key}`, state.action.themeSchema[key]);
    });
  }, [state.action.themeSchema]);

  if (!state.user.connected) {
    if (state.action.menu == "register")
    {
      return <Signup />
    }
    else if (state.action.menu == "login")
    {
      return <LoginForm />
    }
    return <Login />
  }

  return (
    <div className="App container-fluid">
      {/* Top Navbar */}
      <div className="header">
        <img src={logo} alt="" height='30px' id="logo" />
        Dynamicas
        <p id="navdesc">
          Truly fly your own
        </p>
        {
          state.user.project != "" ?
              <div id="logger">
                <h6 className="inline headerLink" onClick={
                        () => {
                                  dispatch({type: SET_PROJECT, payload: ""})
                                  dispatch({type: SET_MENU, payload: "Account"})

                              }
                    }>
                  <IoCloseCircleSharp />
                  Close Project
                </h6>
                <h6 className='inline' style={{marginRight: '5px'}}>Welcome {state.user.user.lastname}</h6>
                <p className='link italic inline'
                  onClick={() => handleMenuSelect("account")}
                  >
                  <MdAccountCircle /> My account
                </p>
              </div>
          :
          <></>
        }

      </div>
      {
        state.user.project == undefined || state.user.project == "" ?
            <div className="main">
              <div className="menus">
                <ProjectMenus onSelectMenu={handleMenuSelect} />
              </div>
              <div className="content">
                {/* You can later extend this for more dynamic content */}
                <Content />          
              </div>
            </div>
            :
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

      }

      <div className="footer">
        <h6 className='inlineh6'>
          Macrodat Dynamicas
        </h6>
        <h6 className='inlineh6'>
          Set theme:
          <Form className='inline  align-items-center'>
            <Form.Group>
              <Form.Select as="select" value={state.action.theme}
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
                <option value={"heavenly park"}>
                  Heavenly park
                </option>
                <option value={"white snow"}>
                  White snow
                </option>
              </Form.Select>
            </Form.Group>
          </Form>
        </h6>
      </div>
    </div>
    
  );
};

export default connect(allInterfaces)(App);
