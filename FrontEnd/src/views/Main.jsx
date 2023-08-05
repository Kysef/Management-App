import React, { useEffect } from 'react'
import { NavLink } from "react-router-dom";
import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

function AddUsers() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    sessionStorage.clear()
  })

  const handleClick = () => {

    axios.get('http://localhost:3001/users')
      .then(res => {
        const user = res.data.find(ele => ele.email === email)
        if (email === 'admin' && password === 'admin') {
          sessionStorage.setItem('userA', email)
          navigate('/AdminHome')
        }
        else if (!user) {
          setErr("Nom d'utilisateur que vous avez saisi(e) n’est pas associé(e) à un compte.")
        } else {
          if (user.password === password) {
            // frist admin acnt.
            if (user.isAdmin) {
              sessionStorage.setItem('userA', email)
              navigate('/AdminHome')
            } else {
              sessionStorage.setItem('userE', email)
              navigate('/EmpHome')
            }
          } else {
            setErr("Le mot de passe entré est incorrect.")
          }
        }
      })
  }

  return (
    <div className=' flex justify-center items-center h-screen bg-teal-200 '>
      <div className='flex flex-col  gap-6 border border-black p-20 bg-white'>
        {
          err && <p className='bg-red-300 p-2 w-[300px] text-red-900'>{err}</p>
        }
        <h4 className='text-xl'>Project and Employee Management App</h4>
        <input type="text" onChange={(e) => setEmail(e.target.value)} placeholder='Email Address' className='p-3 border-b border-black ' />
        <input type="text" onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='p-3 border-b border-black' />
        <NavLink onClick={handleClick} className=' flex items-center justify-center bg-emerald-600 text-white p-2  w-cover rounded-sm'>Log on</NavLink>
      </div>
    </div>
  )
}

export default AddUsers
