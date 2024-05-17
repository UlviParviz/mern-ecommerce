import React, { useEffect, useState } from 'react'
import { useResetPasswordMutation } from '../../redux/api/userApi'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import MetaData from '../../layouts/Site/MetaData'

const ResetPassword = () => {

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const navigate = useNavigate()
    const params = useParams()

    const [resetPassword, {isLoading, error, isSuccess}] = useResetPasswordMutation()

    const { isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
      if (isAuthenticated) {
        navigate("/");
      }
  
      if (error) {
        toast.error(error?.data?.message);
      }
  
      if (isSuccess) {
        toast.success("Password reset successfully");
        navigate('/login')
      }
    }, [error, isAuthenticated, isSuccess]);
  
    const submitHandler = (e) => {
      e.preventDefault();

      if(password !== confirmPassword){
        return toast.error('Password does not match. Try again')
      }

      const data = {password, confirmPassword}

      resetPassword({token: params?.token, body: data})
    };


  return (
    <div className="flex justify-center items-center min-h-screen px-3 lg:items-start lg:pt-[80px]">
      <MetaData title={"Reset Password"}/>
      <div className="w-full max-w-md">
        <form
          className="shadow-lg rounded-lg bg-white p-6"

          onSubmit={submitHandler}
        >
          <h2 className="text-2xl font-semibold mb-4 text-center">New Password</h2>

          <div className="mb-4">
            <label htmlFor="password_field" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password_field"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirm_password_field" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirm_password_field"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              name="confirm_password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className='rounded-lg text-white flex items-center mt-3 justify-center cursor-pointer w-full'>
            <button disabled={isLoading} className="rounded-md group relative min-h-[35px] w-full overflow-hidden border border-red-500 bg-white text-black shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-0 before:w-1/4 before:bg-red-500 before:duration-500 after:absolute after:bottom-0 after:right-0 after:h-0 after:w-1/4 after:bg-red-500 after:duration-500 hover:text-white hover:before:h-full hover:after:h-full">
              <span className="top-0 flex h-full w-full items-center justify-center before:absolute before:bottom-0 before:left-1/4 before:z-0 before:h-0 before:w-1/4 before:bg-red-500 before:duration-500 after:absolute after:right-1/4 after:top-0 after:z-0 after:h-0 after:w-1/4 after:bg-red-500 after:duration-500 hover:text-white group-hover:before:h-full group-hover:after:h-full"></span>
              <span className="absolute bottom-0 left-0 right-0 top-0 z-10 flex h-full w-full items-center justify-center group-hover:text-white">Set Password</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
