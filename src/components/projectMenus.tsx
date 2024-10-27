import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { CiEdit } from "react-icons/ci";
import { MdOutlineDownloadDone } from "react-icons/md";
import { States, allInterfaces } from '../helpers';

type menu = {
  process: string,
  done: boolean
}

const ProjectMenus: React.FC<States> = (state: States) => {
  const [activeMenu, setActiveMenu] = useState<string>('');

  let menus : menu[] = []

  menus = [
    {process: 'Account', done: true},
    {process: 'Projects', done: true},
  ]

  const dispatch = useDispatch();
  let onSelectMenu = state.ownProps.onSelectMenu;

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
    onSelectMenu(menu);
  };

  let moveNext: boolean = true;



  return (
    <div>
      {menus.map((el) => ( moveNext ? 
        <div
          key={el.process}
          className={`menu-item ${activeMenu === el.process ? 'active' : ''} ${el.done ? " done" : ""}`}
          onClick={() => handleMenuClick(el.process)}
        >
          
            <>
            
                {
                  el.done ? 
                  <MdOutlineDownloadDone className='mx-2' />
                  :
                  <CiEdit className='mx-2' />
                }
                {el.process.charAt(0).toUpperCase() + el.process.slice(1)}
            </>
          {moveNext = el.done}
          {moveNext = true}
        </div> : ""
      ))}
    </div>
  )
};

export default connect(allInterfaces) (ProjectMenus);
