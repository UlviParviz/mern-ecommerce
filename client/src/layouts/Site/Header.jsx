import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '../../assets/images/default_avatar.jpg';
import Search from './Search';
import { useGetMeQuery } from '../../redux/api/userApi';
import { useSelector } from 'react-redux';
import { useLazyLogoutQuery } from '../../redux/api/authApi';
import Logo from '../../assets/images/auditore-high-resolution-logo.png';
import { FaSearch } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const { isLoading } = useGetMeQuery();

  const [logout] = useLazyLogoutQuery();

  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);

  const logoutHandler = () => {
    logout();
    navigate(0);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const toggleSearchDropdown = () => {
    setIsSearchDropdownOpen(!isSearchDropdownOpen);
  };

  const closeSearchDropdown = () => {
    setIsSearchDropdownOpen(false);
  };

  return (
    <header className='flex justify-between items-center px-1 md:px-5 py-2 border-b-2 gap-4'>
      <div onClick={() => navigate('/')} className='w-[130px] md:w-[150px] flex items-center justify-center cursor-pointer'>
        <img className='w-[100%] h-full ' src={Logo} alt="" />
      </div>

      {/* Search Component */}
      <div className='w-[60px] md:w-[350px] lg:w-[660px]'>
        <div className='md:hidden flex justify-center items-center'>
          <button
            onClick={toggleSearchDropdown}
            className="px-2 py-1 border rounded-md bg-black text-white"
          >
            <FaSearch/>
          </button>
          {isSearchDropdownOpen && (
            <div className="absolute top-8 left-0 w-full p-4 bg-white border rounded-md shadow-md z-30">
              <Search onSearchComplete={closeSearchDropdown} />
            </div>
          )}
        </div>
        <div className='hidden md:block'>
          <Search onSearchComplete={closeSearchDropdown} />
        </div>
      </div>

      {/* User and Cart Section */}
      <div className='flex items-center justify-between gap-4 md:gap-4'>
        <div onClick={() => navigate("/cart")} className='cursor-pointer flex gap-1 items-center justify-center text-md md:text-xl rounded-lg'>
          <span>Cart</span>
          <span className='px-2 bg-red-500 text-white outline-none rounded-lg'>{cartItems?.length}</span>
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
                    <div className="capitalize">{user?.name}</div>
                    <div className="font-medium truncate">{user?.email}</div>
                  </div>
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
                    <li>
                      <Link onClick={closeDropdown} to="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                    </li>
                    <li>
                      <Link to={"/me/orders"} onClick={closeDropdown}  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Orders</Link>
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
                <button className="rounded-sm group relative min-h-[35px] w-[80px] overflow-hidden border border-black bg-white text-black shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-0 before:w-1/4 before:bg-black before:duration-500 after:absolute after:bottom-0 after:right-0 after:h-0 after:w-1/4 after:bg-black after:duration-500 hover:text-white hover:before:h-full hover:after:h-full">
                  <span className="top-0 flex h-full w-full items-center justify-center before:absolute before:bottom-0 before:left-1/4 before:z-0 before:h-0 before:w-1/4 before:bg-black before:duration-500 after:absolute after:right-1/4 after:top-0 after:z-0 after:h-0 after:w-1/4 after:bg-black after:duration-500 hover:text-white group-hover:before:h-full group-hover:after:h-full"></span>
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
