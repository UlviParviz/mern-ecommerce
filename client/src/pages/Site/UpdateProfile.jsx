import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateProfileMutation } from "../../redux/api/userApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import UserLayout from "../../layouts/Site/UserLayout";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const [updateProfile, { isLoading, error, isSuccess }] =
    useUpdateProfileMutation();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      setName(user?.name);
      setEmail(user?.email);
    }

    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("Successfully Updated");
      navigate("/me/profile");
    }
  }, [user, error, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
    };

    updateProfile(userData);
  };

  return (
    <UserLayout>
    <div className="flex justify-center items-center">
      <div className="w-full md:w-8/12">
        <form className="shadow rounded bg-white p-6" onSubmit={submitHandler}>
          <h2 className="mb-4 text-lg font-semibold">Update Profile</h2>

          <div className="mb-4">
            <label
              htmlFor="name_field"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name_field"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email_field"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email_field"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div  className='rounded-lg text-white flex items-center justify-center cursor-pointer'>
                <button disabled={isLoading} className="rounded-md group relative min-h-[35px] w-[50%] overflow-hidden border border-red-500 bg-white text-black shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-0 before:w-1/4 before:bg-red-500 before:duration-500 after:absolute after:bottom-0 after:right-0 after:h-0 after:w-1/4 after:bg-red-500 after:duration-500 hover:text-white hover:before:h-full hover:after:h-full">
                  <span className="top-0 flex h-full w-full items-center justify-center before:absolute before:bottom-0 before:left-1/4 before:z-0 before:h-0 before:w-1/4 before:bg-red-500 before:duration-500 after:absolute after:right-1/4 after:top-0 after:z-0 after:h-0 after:w-1/4 after:bg-red-500 after:duration-500 hover:text-white group-hover:before:h-full group-hover:after:h-full"></span>
                  <span className="absolute bottom-0 left-0 right-0 top-0 z-10 flex h-full w-full items-center justify-center group-hover:text-white">{isLoading ? "Updating..." : "Update"}</span>
                </button>
              </div>
        </form>
      </div>
    </div>
    </UserLayout>
  );
};

export default UpdateProfile;
