import React, { useState } from 'react';
import Logo from '../../assets/images/logo.jpg';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '../../assets/images/default_avatar.jpg';
import Search from './Search';
import { useGetMeQuery } from '../../redux/api/userApi';
import { useSelector } from 'react-redux';
import { useLazyLogoutQuery } from '../../redux/api/authApi';

const Header = () => {
  const navigate = useNavigate();
  const { isLoading } = useGetMeQuery();

  const [logout] = useLazyLogoutQuery();

  const { user } = useSelector((state) => state.auth);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const logoutHandler = () => {
    logout();
    navigate(0);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false); // Dropdown'u kapat
  };

  return (
    <header className='flex justify-between items-center px-1 md:px-5 py-2 border-b-2 gap-4'>
      <div onClick={() => navigate('/')} className='w-[80px] md:w-[100px] flex items-center justify-center cursor-pointer'>
        <img className='w-[100%] ' src={Logo} alt="" />
      </div>
      <div className='w-[200px] md:w-[350px] lg:w-[550px]'>
        <Search />
      </div>
      <div className='flex items-center justify-between gap-2 md:gap-4'>
        <div onClick={() => navigate("/cart")} className='cursor-pointer flex gap-1 items-center justify-center text-md md:text-xl border border-red-500 p-1 rounded-lg'>
          <span>Cart</span>
          <span className='px-2 bg-red-500 text-white outline-none rounded-lg'>0</span>
        </div>
        <div className='relative'>
          {user ? (
            <div>
              <button
                id="dropdownUserAvatarButton"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                type="button"
              >
                <span className="sr-only">Open user menu</span>
                <img className="w-10 h-9 rounded-full" src={user?.avatar ? user?.avatar?.url : Avatar } alt={user?.name}/>
              </button>
              {isDropdownOpen && (
                <div
                  id="dropdownAvatar"
                  className="absolute right-0 top-11 z-10 bg-white divide-y border-2 border-red-400 divide-red-500 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                >
                  <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    <div>{user?.name}</div>
                    <div className="font-medium truncate">{user?.email}</div>
                  </div>
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
                    <li>
                      <Link onClick={closeDropdown} to="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                    </li>
                    <li>
                      <Link onClick={closeDropdown} to="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Orders</Link>
                    </li>
                    <li>
                      <Link onClick={closeDropdown} to={"/me/profile"} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Profile</Link>
                    </li>
                  </ul>
                  <div className="py-2">
                    <Link onClick={() => { logoutHandler(); closeDropdown(); }} to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</Link>
                  </div>
                </div>
              )}
            </div>
          ) : (
            !isLoading && (
              <div onClick={() => navigate("/login")} className='rounded-lg  text-white flex items-center justify-center cursor-pointer'>
                <button className="rounded-sm group relative min-h-[35px] w-[80px] overflow-hidden border border-red-500 bg-white text-black shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-0 before:w-1/4 before:bg-red-500 before:duration-500 after:absolute after:bottom-0 after:right-0 after:h-0 after:w-1/4 after:bg-red-500 after:duration-500 hover:text-white hover:before:h-full hover:after:h-full">
                  <span className="top-0 flex h-full w-full items-center justify-center before:absolute before:bottom-0 before:left-1/4 before:z-0 before:h-0 before:w-1/4 before:bg-red-500 before:duration-500 after:absolute after:right-1/4 after:top-0 after:z-0 after:h-0 after:w-1/4 after:bg-red-500 after:duration-500 hover:text-white group-hover:before:h-full group-hover:after:h-full"></span>
                  <span className="absolute bottom-0 left-0 right-0 top-0 z-10 flex h-full w-full items-center justify-center group-hover:text-white">Sign In</span>
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
