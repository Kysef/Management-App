import React, { useState, useEffect } from 'react'
import { NavLink } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

function UpdateUser() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cin, setCIN] = useState('')
  const [gender, setGender] = useState('')
  const [division, setDivision] = useState('')
  const [isAdmin, setIsAdmin] = useState()
  const [err, setErr] = useState('')

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const user = sessionStorage.getItem('userA')
    if (user === '' || user === null) {
      navigate('/')
    }

    axios.get('http://localhost:3001/users/' + id)
      .then(res => {
        setName(res.data.name)
        setEmail(res.data.email)
        setPassword(res.data.password)
        setCIN(res.data.cin)
        setGender(res.data.gender)
        setDivision(res.data.division)
        setIsAdmin(res.data.isAdmin)
      })
  }, [id, navigate])


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

      axios.put('http://localhost:3001/updateUser/' + id, user)
        .then(res => {
          // console.log(res)
          navigate('/AdminHome')
        }).catch(err => {
          if (err.response.data.keyPattern.email === 1) {
            setErr('email has be unique.')
          } else {
            setErr('CIN has be unique.')
          }
        })
    } else {
      setErr('les champs sont obligatoires.')
    }
  }



  return (
    <div className=' flex flex-col gap-3 justify-center items-center h-screen  '>
      <h2 className='text-3xl'>Update User</h2>
      <p>Use the Below Form to Edit A User</p>
      <div className='flex flex-col  gap-4 border border-black p-20 relative'>
        <NavLink to={"/AdminHome"} className=' flex justify-end items-center text-6xl rotate-45 top-4 right-6 cursor-pointer absolute '  >+</NavLink>
        {
          err && <p className='bg-red-300 p-2 w-[221px] text-red-900'>{err}</p>
        }
        <input type="text" placeholder='Name' value={name} onChange={e => setName(e.target.value)} className='p-3 border-b border-black ' />
        <input type="text" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} className='p-3 border-b border-black' />
        <input type="text" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} className='p-3 border-b border-black' />
        <input type="text" placeholder='CIN' value={cin} onChange={e => setCIN(e.target.value)} className='p-3 border-b border-black' />
        <div className='flex gap-2'>
          <input type="radio" checked={gender === 'male' && true} onChange={e => setGender(e.target.value)} value='male' name="Gender" id="" />Male
          <input type="radio" checked={gender === 'female' && true} onChange={e => setGender(e.target.value)} value='female' name="Gender" id="" />Female
        </div>
        <select value={division} onChange={e => setDivision(e.target.value)} className='p-2'>
          <option value="Division">Pick Your Division</option>
          <option value="DSI">DSI</option>
          <option value="DCS">DCS</option>
          <option value="DPL">DPL</option>
          <option value="DBC">DBC</option>
          <option value="DFC">DFC</option>
          <option value="DRH">DRH</option>
        </select>
        <div>
          <input type="checkbox" checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)} /> isAdmin
        </div>
        <button onClick={handleClick} className='bg-emerald-600 text-white p-2 rounded-sm'>Update</button>
      </div>
    </div>
  )
}

export default UpdateUser
