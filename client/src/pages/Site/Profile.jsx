import React from 'react'
import UserLayout from '../../layouts/Site/UserLayout'
import Avatar from '../../assets/images/default_avatar.jpg'
import { useSelector } from 'react-redux'
import MetaData from '../../layouts/Site/MetaData'

const Profile = () => {

    const {user} = useSelector((state) => state.auth)

  return (
    <UserLayout><div className="flex flex-wrap justify-around items-center mt-5 ">
      <MetaData title={"Profile"}/>
    <div className="w-full md:w-3/12">
      <figure className="">
        <img className="rounded-full w-full" src={user?.avatar ? user?.avatar?.url : Avatar } alt={user?.name} />
      </figure>
    </div>
  
    <div className="w-full md:w-5/12 mt-4 md:mt-0">
      <h4 className="text-xl font-bold">Full Name</h4>
      <p className="text-gray-800 mt-1 capitalize">{user?.name}</p>
  
      <h4 className="text-xl font-bold mt-4">Email Address</h4>
      <p className="text-gray-800 mt-1">{user?.email}</p>
  
      <h4 className="text-xl font-bold mt-4">Joined On</h4>
      <p className="text-gray-800 mt-1">{user?.createdAt}</p>
    </div>
  </div>
  </UserLayout>
  )
}

export default Profile