import React, { useState } from 'react';
import { addSubmenu } from '../store/action';
import { useDispatch } from 'react-redux';

interface MenuProps {
  onSelectMenu: (menu: string) => void;
}

const MenuCreator: React.FC<MenuProps> = ({ onSelectMenu }) => {
  const [activeMenu, setActiveMenu] = useState<string>('');

  const menus = ['process', 'geometry', 'parameters', 'results'];

  const dispatch = useDispatch();

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
    onSelectMenu(menu);

    if (menu.toUpperCase() == "GEOMETRY")
    {
      dispatch(addSubmenu("Airfoil", 0));
    }
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

export default MenuCreator;
