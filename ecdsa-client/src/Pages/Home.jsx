import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'

import axios from 'axios'

const Home = () => {
  
  const navigate = useNavigate()
  const [display, setDisplay] = useState(false)

  const removeMessage = () => {
    setDisplay(false)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return navigate('/login')

    axios.get('http://127.0.0.1:3000/api/protected', {headers: {'Authorization': `Bearer ${token}`}})
    .then( response => {
      const status = response.data.code
      if (status === 200) setDisplay(true)
      setTimeout(removeMessage,3000)
    })
    .catch( error => navigate('/login'))
      
  },[navigate]);

  const logoutHandler = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="w-2/3 h-[70vh] p-10 m-auto mt-28 rounded-3xl shadow-xl bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-400 to-blue-500 text-center">
        
        <div className='w-3/5 h-12 mt-3 mx-auto text-left'>
          {display && 
          <div className="bg-green-100 border border-green-400 text-green-700 px-5 py-[10px] h-full rounded relative ">
            <span>Berhasil Login</span>
            <span onClick={removeMessage} className="absolute top-0 bottom-0 right-0 px-4 py-[11px]">
              <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
            </span>
          </div>}
        </div>

        <h1 className='text-5xl mt-32 font-bold text-white'>Hello, User</h1>

        <button onClick={logoutHandler} className='mt-5 py-3 px-8 rounded-3xl ring-1 ring-white text-white hover:ring-pink-500 hover:text-pink-500'>Log Out</button>
        
    </div>
  )
}

export default Home