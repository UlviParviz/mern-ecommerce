import React from "react";
import SideMenu from "./SideMenu";

const UserLayout = ({children}) => {
  return (
    <div className=" min-h-screen">
      <div className="mt-6 mb-8 py-4">
        <h2 className="text-center font-bold text-3xl">User Settings</h2>
      </div>

      <div className="container mx-auto">
        <div className="flex flex-wrap justify-around">
          <div className="w-full lg:w-1/4">
            <SideMenu />
          </div>
          <div className="w-full lg:w-3/4 rounded-lg p-4 mt-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
