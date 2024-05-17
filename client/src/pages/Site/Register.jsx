import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation, useRegisterMutation } from "../../redux/api/authApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import MetaData from "../../layouts/Site/MetaData";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [register, { isLoading, error, data }] = useRegisterMutation();

  const { isAuthenticated } = useSelector((state) => state.auth)


  useEffect(() => {

      if(isAuthenticated){
          navigate("/")
      }

      if(error){
          toast.error(error?.data?.message)
      }

      if(data){
        navigate("/login")
      }
  }, [error, isAuthenticated, data])

  const submitHandler = (e) => {
    e.preventDefault();

    const signUpData = {
      name,
      email,
      password,
    };

    register(signUpData);
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center py-[35%] md:py-[25%] lg:py-[10%]">
      <MetaData title={"Sign Up"}/>
      <div className="w-[93%] md:w-[72%] lg:w-[43%] flex flex-col justify-center gap-8 border-2 border-red-500 py-12 px-3 md:px-6 rounded-lg">
        <h2 className="text-3xl font-bold text-center">Sign Up</h2>
        <form className="flex flex-col gap-3 " onSubmit={submitHandler}>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Name</label>
            <input
              name="name"
              value={name}
              onChange={onChange}
              className="rounded-lg"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Email</label>
            <input
              name="email"
              value={email}
              onChange={onChange}
              className="rounded-lg"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Password</label>
            <input
              name="password"
              value={password}
              onChange={onChange}
              className="rounded-lg"
              type="password"
            />
          </div>
          <button
            disabled={isLoading}
            className="mt-2 rounded-lg relative flex h-[50px] w-full items-center justify-center overflow-hidden bg-gray-800 text-white shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-lg before:bg-red-500 before:duration-500 before:ease-out hover:shadow-red-600 hover:before:h-56 hover:before:w-full"
          >
            <span className="relative z-10">
              {isLoading ? "..." : "Sign Up"}
            </span>
          </button>
        </form>
        <div className="flex justify-between items-center">
          <span>Do you have an account?</span>
          <span
            onClick={() => navigate("/login")}
            className="hover:text-red-500 cursor-pointer"
          >
            Sign In
          </span>{" "}
        </div>
      </div>
    </div>
  );
};

export default Register;
