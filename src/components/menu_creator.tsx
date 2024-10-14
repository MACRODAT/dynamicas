import React, { useState } from 'react';

interface MenuProps {
  onSelectMenu: (menu: string) => void;
}

const MenuCreator: React.FC<MenuProps> = ({ onSelectMenu }) => {
  const [activeMenu, setActiveMenu] = useState<string>('');

  const menus = ['process', 'geometry', 'parameters', 'results'];

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
    onSelectMenu(menu);
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
