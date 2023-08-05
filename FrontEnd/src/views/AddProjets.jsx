import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavLink } from "react-router-dom";
import axios from 'axios';

function AddProjets() {

  const [name, setName] = useState('')
  const [division, setDivision] = useState('')
  const [err, setErr] = useState('')

  const navigate = useNavigate()

  const handleClick = () => {
    // condition inputs...
    if (name !== '' && division !== '') {
      const projet = {
        name: name,
        division: division
      }

      axios.post('http://localhost:3001/insertProjets', projet)
        .then(res => {
          console.log(res)
          navigate('/AdminHome')
        }).catch(err => {
          console.log(err)
        })
    } else {
      setErr('les champs sont obligatoires.')
    }
  }

  return (
    <div className=' flex justify-center items-center h-screen  '>
      <div className='flex flex-col  gap-4 border border-black p-20 relative'>
        <NavLink to={"/AdminHome"} className=' flex justify-end items-center text-6xl rotate-45 top-4 right-6 cursor-pointer absolute '  >+</NavLink>
        {
          err && <p className='bg-red-300 p-2 w-[221px] text-red-900'>{err}</p>
        }
        <input type="text" onChange={e => setName(e.target.value)} placeholder='Le Nom du projet' className='p-3 border-b border-black ' />
        <select defaultValue='Division' onChange={e => setDivision(e.target.value)} className='p-2'>
          <option value="Division">Pick The Division</option>
          <option value="DSI">DSI</option>
          <option value="DCS">DCS</option>
          <option value="DPL">DPL</option>
          <option value="DBC">DBC</option>
          <option value="DFC">DFC</option>
          <option value="DRH">DRH</option>
        </select>
        <button onClick={handleClick} className='bg-emerald-600 text-white p-2 rounded-sm'>Ajouter cette projet</button>
      </div>
    </div>
  )
}

export default AddProjets
