import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUser, FaUserCircle, FaLock } from "react-icons/fa";

const SideMenu = ({menuItems}) => {
 
  const location = useLocation();

  const [activeMenuItem, setActiveMenuItem] = useState(location.pathname);

  const handleMenuItemClick = (menuItemUrl) => {
    setActiveMenuItem(menuItemUrl);
  };

  return (
    <div className="mt-5 px-4 ">
      {menuItems?.map((menuItem, index) => (
        <Link
          key={index}
          to={menuItem.url}
          className={`font-bold block py-2 px-4 rounded-md ${
            activeMenuItem.includes(menuItem.url) ? "bg-red-500 text-white" : "text-gray-700"
          }`}
          onClick={() => handleMenuItemClick(menuItem.url)}
          aria-current={
            activeMenuItem.includes(menuItem.url) ? "true" : "false"
          }
        >
          <span className="inline-block w-5">{menuItem.icon}</span>
          <span className="ml-2">{menuItem.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default SideMenu;
