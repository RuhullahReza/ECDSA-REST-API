import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const RegisterForm = () => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [display, setDisplay] = useState(false)

  const navigate = useNavigate()

  const removeMessage = () => {
    setDisplay(false)
  }
  
  const registerHandler = async () =>{
    const config = {
      method:'post',
      url:'http://127.0.0.1:3000/api/register',
      data:{
        username,
        email,
        password
      }
    }

    try {
      const response = await axios(config)

      const status = response.data.code
      if(status === 201) return navigate('/login')

    } catch (error) {
      setDisplay(true)
      setMessage(error.response.data.status)
      setTimeout(removeMessage,3000)
    }  
  }


  return (
    <div className='w-1/2 h-full rounded-r-3xl p-3 bg-white text-center'>
      <div className='w-4/5 h-12 mt-5 mx-auto text-left'>
          {display && 
          <div className="bg-red-100 border border-red-400 text-red-700 px-5 py-[10px] h-full rounded relative ">
            <span>{message}</span>
            <span onClick={removeMessage} className="absolute top-0 bottom-0 right-0 px-4 py-[11px]">
              <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
            </span>
          </div>
          }
      </div>

        <h1 className='text-5xl mt-5 font-bold text-neutral-700'>Create</h1>
        <h1 className='text-5xl mt-2 font-bold text-neutral-700'>Account</h1>
        
        <input type="text" onChange={e => setUsername(e.target.value)} className='block mt-5 h-12 w-4/5 m-auto bg-gray-200 px-5 text-slate-900' placeholder='Username'/>
        <input type="email" onChange={e => setEmail(e.target.value)} className='block mt-4 h-12 w-4/5 m-auto bg-gray-200 px-5 text-slate-900' placeholder='Email'/>
        <input type="password" onChange={e => setPassword(e.target.value)} className='block mt-4 h-12 w-4/5 m-auto bg-gray-200 px-5 text-slate-900' placeholder='Password'/>
        
        <button onClick={registerHandler} className='mt-5 py-3 px-8 rounded-3xl bg-sky-300 text-white hover:bg-sky-500'>SIGN UP</button>
    </div>
  )
}

export default RegisterForm