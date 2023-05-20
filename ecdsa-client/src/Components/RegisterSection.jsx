import React from 'react'
import { useNavigate } from 'react-router-dom'

const RegisterSection = () => {
  
  const navigate = useNavigate()

  return (
    
    <div className='w-1/2 h-full p-8 rounded-r-3xl text-center bg-gradient-to-l from-sky-400 to-blue-500'>
        <h1 className='text-5xl mt-36 font-bold text-white'>Hello, Friend!</h1>

        <p className='mt-5 text-2xl font-light text-white'>Enter your personal details and start journey with us</p>
        
        <button onClick={()=>{navigate('/register')}} className='mt-5 py-3 px-8 rounded-3xl ring-1 ring-white text-white hover:ring-lime-200 hover:text-lime-200'>SIGN UP</button>
    </div>
  )
}

export default RegisterSection