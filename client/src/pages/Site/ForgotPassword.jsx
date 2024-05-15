import React, { useEffect, useState } from "react";
import { useForgotPasswordMutation } from "../../redux/api/userApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const [forgotPassword, { isLoading, error, isSuccess }] =
    useForgotPasswordMutation();

  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("Email sent. Please check your email");
    }
  }, [error, isAuthenticated, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();

    forgotPassword({
      email,
    });
  };

  return (
    <div className="flex justify-center lg:pt-[80px] min-h-screen lg:items-start items-center">
      <div className="w-full max-w-md px-3 rounded-md">
        <form
          className="shadow-md rounded bg-white p-6"
          onSubmit={submitHandler}
        >
          <h2 className="mb-4 text-3xl font-semibold">Forgot Password</h2>
          <div className="mt-3">
            <label
              htmlFor="email_field"
              className="block text-sm font-medium text-gray-700"
            >
              Enter Email
            </label>
            <input
              type="email"
              id="email_field"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div  className='rounded-lg text-white flex items-center mt-3 justify-center cursor-pointer w-full'>
                <button disabled={isLoading} className="rounded-md group relative min-h-[35px] w-full overflow-hidden border border-red-500 bg-white text-black shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-0 before:w-1/4 before:bg-red-500 before:duration-500 after:absolute after:bottom-0 after:right-0 after:h-0 after:w-1/4 after:bg-red-500 after:duration-500 hover:text-white hover:before:h-full hover:after:h-full">
                  <span className="top-0 flex h-full w-full items-center justify-center before:absolute before:bottom-0 before:left-1/4 before:z-0 before:h-0 before:w-1/4 before:bg-red-500 before:duration-500 after:absolute after:right-1/4 after:top-0 after:z-0 after:h-0 after:w-1/4 after:bg-red-500 after:duration-500 hover:text-white group-hover:before:h-full group-hover:after:h-full"></span>
                  <span className="absolute bottom-0 left-0 right-0 top-0 z-10 flex h-full w-full items-center justify-center group-hover:text-white">{isLoading ? "Sending..." : "Send mail"}</span>
                </button>
              </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
