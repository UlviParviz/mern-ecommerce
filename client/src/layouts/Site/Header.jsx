import React from 'react';
import Logo from '../../assets/images/logo.jpg';
import { useNavigate } from 'react-router-dom';
import Avatar from '../../assets/images/default_avatar.jpg'
import Search from './Search';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className='flex justify-between items-center px-1 md:px-5 py-2 border-b-2 gap-4'>
      <div onClick={() => navigate('/')} className='w-[100px] flex items-center justify-center cursor-pointer'>
        <img className='w-[100%] ' src={Logo} alt="" />
      </div>
      <div className='w-[200px] md:w-[350px] lg:w-[550px]'>
        <Search/>
      </div>
      <div className='flex items-center justify-between gap-2 md:gap-4'>
        <div onClick={() => { navigate("/cart")}} className='cursor-pointer flex gap-1 items-center justify-center text-xl border-2 p-1 rounded-lg'>
          <span>Cart</span>
          <span className='px-2 border-2 bg-red-500 text-white outline-none rounded-lg'>0</span>
        </div>
        <div className='flex justify-center items-center gap-3'>
          <div>
            <button id="dropdownUserAvatarButton" data-dropdown-toggle="dropdownAvatar" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" type="button">
              <span className="sr-only">Open user menu</span>
              <img className="w-9 h-9 rounded-full" src={Avatar} alt="user photo"/>
            </button>

            <div id="dropdownAvatar" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
              <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <div>Bonnie Green</div>
                <div className="font-medium truncate">name@flowbite.com</div>
              </div>
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                </li>
              </ul>
              <div className="py-2">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
              </div>
            </div>
          </div>
          <div className='border p-2 rounded-lg bg-red-500 text-white flex items-center justify-center cursor-pointer'>
            Login
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
