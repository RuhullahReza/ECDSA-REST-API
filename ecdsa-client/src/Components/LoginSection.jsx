import React from 'react'
import { useNavigate } from 'react-router-dom'

const LoginSection = () => {
  
  const navigate = useNavigate()

  return (
    <div className='w-1/2 h-full p-12 rounded-l-3xl text-center bg-gradient-to-r from-sky-400 to-blue-500'>
        <h1 className='text-7xl mt-16 font-bold text-white'>Welcome Back!</h1>
        
        <p className='mt-5 text-2xl font-light text-white'>To keep connected with us please login with your personal info</p>

        <button onClick={()=>navigate('/login')} className='mt-5 py-3 px-8 rounded-3xl ring-1 ring-white text-white hover:ring-lime-200 hover:text-lime-200'>SIGN IN</button>
    </div>
  )
}

export default LoginSection