import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavLink } from "react-router-dom";
import axios from 'axios';
import { useEffect } from 'react';

function AddUsers() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cin, setCIN] = useState('')
  const [gender, setGender] = useState('')
  const [division, setDivision] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [err, setErr] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    const user = sessionStorage.getItem('userA')
    if (user === '' || user === null) {
      navigate('/')
    }
  }, [navigate])

  const handleClick = () => {

    // condition inputs...
    if (name !== '' && email !== '' && password !== '' && cin !== '' && gender !== '' && division !== '') {
      const user = {
        name: name,
        email: email,
        password: password,
        cin: cin,
        gender: gender,
        division: division,
        isAdmin: isAdmin
      }

      axios.post('http://localhost:3001/insertUsers', user)
        .then(res => {
          console.log(res)
          navigate('/AdminHome')
        }).catch(err => {
          if (err.response.data.keyPattern.email === 1) {
            setErr('email has to be unique.')
          } else {
            setErr('CIN has to be unique.')
          }
        })
    } else {
      setErr('Missing some inputs')
    }
  }


  return (
    <div className=' flex flex-col gap-3 justify-center items-center h-screen  '>
      <h2 className='text-3xl'>Add an Employee</h2>
      <p>Use the Below Form to Add an Employee</p>
      <div className='flex flex-col  gap-4 border border-black p-20 relative'>
        <NavLink to={"/AdminHome"} className=' flex justify-end items-center text-6xl rotate-45 top-4 right-6 cursor-pointer absolute '  >+</NavLink>
        {
          err && <p className='bg-red-300 p-2 w-[221px] text-red-900'>{err}</p>
        }
        <input type="text" placeholder='Name' onChange={e => setName(e.target.value)} className='p-3 border-b border-black ' />
        <input type="text" placeholder='Email' onChange={e => setEmail(e.target.value)} className='p-3 border-b border-black' />
        <input type="text" placeholder='Password' onChange={e => setPassword(e.target.value)} className='p-3 border-b border-black' />
        <input type="text" placeholder='CIN' onChange={e => setCIN(e.target.value)} className='p-3 border-b border-black' />
        <div className='flex gap-2'>
          <input type="radio" onChange={e => setGender(e.target.value)} value='male' name="Gender" id="" />Male
          <input type="radio" onChange={e => setGender(e.target.value)} value='female' name="Gender" id="" />Female
        </div>
        <select defaultValue='Division' onChange={e => setDivision(e.target.value)} className='p-2'>
          <option value="Division">Pick Their Division</option>
          <option value="DSI">DSI</option>
          <option value="DCS">DCS</option>
          <option value="DPL">DPL</option>
          <option value="DBC">DBC</option>
          <option value="DFC">DFC</option>
          <option value="DRH">DRH</option>
        </select>
        <div>
          <input type="checkbox" onChange={e => setIsAdmin(e.target.checked)} /> isAdmin
        </div>
        <button onClick={handleClick} className='bg-emerald-600 text-white p-2 rounded-sm'>Submit</button>
      </div>
    </div>
  )
}

export default AddUsers
