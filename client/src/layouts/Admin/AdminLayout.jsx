import React from 'react'
import SideMenu from '../Site/SideMenu'
import { FaPlus, FaTachometerAlt, FaProductHunt, FaReceipt, FaUser , FaStar   } from "react-icons/fa";


const AdminLayout = ({children}) => {
    const menuItems = [
        {
          name: "Dashboard",
          url: "/admin/dashboard",
          icon: <FaTachometerAlt />,
        },
        {
          name: "New Product",
          url: "/admin/product/new",
          icon: <FaPlus />,
        },
        {
          name: "Products",
          url: "/admin/products",
          icon: <FaProductHunt />,
        },
        {
          name: "Orders",
          url: "/admin/orders",
          icon: <FaReceipt />,
        },
        {
            name: "Users",
            url: "/admin/users",
            icon: <FaUser />,
          },
          {
            name: "Reviews",
            url: "/admin/reviews",
            icon: <FaStar />,
          },
      ];
  return (
    <div className=" min-h-screen">
      <div className="mt-6 mb-8 py-4">
        <h2 className="text-center font-bold text-3xl">Admin Dashboard</h2>
      </div>

      <div className="container mx-auto">
        <div className="flex flex-wrap justify-around">
          <div className="w-full lg:w-1/4">
            <SideMenu menuItems={menuItems} />
          </div>
          <div className="w-full lg:w-3/4 rounded-lg mt-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLayout