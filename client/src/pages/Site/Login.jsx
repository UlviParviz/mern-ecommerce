import { TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLoginMutation } from '../../redux/api/authApi'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Login = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [login, {isLoading, error, data}] = useLoginMutation()

    const { isAuthenticated } = useSelector((state) => state.auth)


    useEffect(() => {

        if(isAuthenticated){
            navigate("/")
        }

        if(error){
            toast.error(error?.data?.message)
        }
    }, [error, isAuthenticated])

    const submitHandler = (e) =>{
        e.preventDefault()

        const loginData = {
            email,
            password
        }

        login(loginData)

    }

  return (
    <div className='flex items-center justify-center py-[35%] md:py-[25%] lg:py-[10%]'>
        <div className='w-[93%] md:w-[72%] lg:w-[43%] flex flex-col justify-center gap-8 border-2 border-red-500 py-12 px-3 md:px-6 rounded-lg'>
            <h2 className='text-3xl font-bold text-center'>Login your account</h2>
            <form className='flex flex-col gap-3 ' onSubmit={submitHandler}>
                <div className='flex flex-col gap-2'> 
                    <label htmlFor="">Email</label>
                    <input name='email' value={email} onChange={(e)=> setEmail(e.target.value)} className='rounded-lg' type="text" />
                </div>
                <div className='flex flex-col gap-2'> 
                    <label htmlFor="">Password</label>
                    <input name='password' value={password} onChange={(e) => setPassword(e.target.value)} className='rounded-lg' type="password" />
                </div>
            <div className='flex justify-end'><span onClick={() => navigate('/password/forgot')} className='hover:text-red-500 cursor-pointer'>Forgot Password?</span></div>
            <button disabled={isLoading}  className="rounded-lg relative flex h-[50px] w-full items-center justify-center overflow-hidden bg-gray-800 text-white shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-lg before:bg-red-500 before:duration-500 before:ease-out hover:shadow-red-600 hover:before:h-56 hover:before:w-full">
      <span className="relative z-10">{isLoading ? "..." : "Sign In"}</span>
    </button>
            </form>
            <div className='flex justify-between items-center'><span >Don't have an account?</span>
            <span onClick={() => navigate('/register')} className='hover:text-red-500 cursor-pointer'>Sign Up</span> </div>
        </div>
    </div>
  )
}

export default Login