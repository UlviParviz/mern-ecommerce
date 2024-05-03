import React from 'react'
import Logo from '../../assets/images/logo.jpg'
import {AiOutlineSearch} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

const Header = () => {

  const naviate = useNavigate()

  return (
    <header className='flex justify-between items-center px-5 border-b-2'>
      <div className='w-[8%] flex items-center justify-center'>
        <img className='w-[80%]' src={Logo} alt="" />
        <span className='font-bold text-xl'>ShopIT</span>
      </div>
      <div className='w-[40%]'>
        <form className='flex justify-between items-center border-2 rounded-lg '>
          <input type="text" className='border-none rounded-lg outline-amber-50 focus:outline-0 w-[100%]' />
        </form>
      </div>
      <div className='flex items-center justify-between gap-4'>
        <div onClick={() => { naviate("/cart")}} className='cursor-pointer flex gap-2 items-center justify-center text-xl border-2 p-2 rounded-lg'>
          <span>Cart</span>
          <span className='px-2 border-2 bg-red-500 text-white outline-none rounded-lg'>0</span>
        </div>
        <div className='flex justify-center items-center gap-3'>
          <div>
            
<button id="dropdownUserAvatarButton" data-dropdown-toggle="dropdownAvatar" class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" type="button">
<span class="sr-only">Open user menu</span>
<img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo"/>
</button>

<div id="dropdownAvatar" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
    <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
      <div>Bonnie Green</div>
      <div class="font-medium truncate">name@flowbite.com</div>
    </div>
    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
      </li>
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
      </li>
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
      </li>
    </ul>
    <div class="py-2">
      <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
    </div>
</div>

          </div>
          <div>
            <div className='text-xl  font-bold flex justify-center items-center border-2 px-3 py-1 bg-red-500 text-white rounded-lg'>Login</div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header