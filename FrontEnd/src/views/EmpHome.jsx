import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { NavLink } from "react-router-dom";
import { faUserSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function EmpHome() {

  const divisions = ["DSI", "DCS", "DPL", "DBC", "DFC", "DRH"]
  const [dataUser, setDataUser] = useState([])
  const [users, setUsers] = useState([])
  const [dataProjet, setDataProjet] = useState([])
  const [projets, setProjets] = useState([])
  const [divisionName, setDivisionName] = useState('Division')

  const navigate = useNavigate()

  useEffect(() => {
    const user = sessionStorage.getItem('userE')
    if (user === '' || user === null) {
      navigate('/')
    } else {
      navigate('/EmpHome')
    }
    axios.get('http://localhost:3001/users')
      .then(res => {
        setUsers(res.data)
      })
  }, [navigate])

  const logout = () => {
    sessionStorage.clear()
  }

  const handleChange = (e) => {
    const division = e.target.value
    setDivisionName(division)
    if (division === 'Division') {
        setUsers(dataUser)
        setProjets(dataProjet)
    } else {
        const fetchUser = dataUser.filter(user => user.division === division)
        const fetchProjet = dataProjet.filter(projet => projet.division === division)
        setUsers(fetchUser)
        setProjets(fetchProjet)
    }
}

  return (
    <div className=' '>
      <div className=' flex items-center justify-center bg-emerald-600 h-16 text-2xl w-full text-white'>Projets Management System
        <NavLink onClick={logout} to={"/"} className="flex absolute top-4 right-6">{sessionStorage.getItem('userE')}<FontAwesomeIcon className='ml-4' icon={faUserSlash} /></NavLink>
      </div>


      <div className='flex  flex-col items-center justify-center gap-6 w-cover '>
                <div className='flex items-center justify-evenly w-5/6 p-4 border-b border-black'>

                    <NavLink to={"/GestionProjets"} className='  flex  p-3 rounded-lg bg-emerald-700 text-teal-100 '  >Projects Management</NavLink>
                    <div className='flex justify-end w-2/3 gap-24'>
                        <select onChange={handleChange} defaultValue='Division' className='p-2'>
                            <option value="Division">The Divisions</option>
                            <option value="DSI">DSI</option>
                            <option value="DCS">DCS</option>
                            <option value="DPL">DPL</option>
                            <option value="DBC">DBC</option>
                            <option value="DFC">DFC</option>
                            <option value="DRH">DRH</option>
                        </select>


                        {/* <select defaultValue='Projets'>
                            <option value="Projets">Projets</option>
                            {
                                projets.length > 0 &&
                                projets.filter((obj, key) => key === projets.findIndex(o => obj.id === o.id && obj.name === o.name)).map((projet, key) => <><option key={key}>
                                    {projet.name}
                                </option></>)
                            }
                        </select> */}
                    </div>
                </div>

                {
                    divisions.filter(division => divisionName === 'Division' ? division : division === divisionName && division)?.map((division, key) => <div key={key} className='flex items-center justify-between w-full'>
                        <div className='flex w-1/6 justify-center items-center'>
                            <div className='text-3xl'>{division}</div>
                        </div>
                        {/* table+projets_name */}
                        <table id={key} className='border w-4/6 border-black '>
                            <thead>
                                <tr className='bg-black text-white '>
                                    <td className='p-6 w-1/12'>ID</td>
                                    <td className='p-6 w-3/12'>Name</td>
                                    <td className='p-6 w-4/12'>Email</td>
                                    <td className='p-6 w-1/12'>CIN</td>
                                    <td className='p-6 w-1/12'>Gender</td>
                                    <td className='p-6 w-2/12'>isAdmin</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.filter(user => user.division === division)?.map((user, key) => <tr key={key} className='border-b border-black' >
                                        <td className='p-6' >{key + 1}</td>
                                        <td className='p-6'>{user.name}</td>
                                        <td className='p-6'>{user.email}</td>
                                        <td className='p-6'>{user.cin}</td>
                                        <td className='p-6'>{user.gender}</td>
                                        <td className='p-6'>{user.isAdmin ? 'True' : 'False'}</td>
                                        
                                    </tr>)
                                }
                            </tbody>
                        </table>
                        <div className='w-1/6 flex justify-center items-center text-2xl'>
                            <select defaultValue='Projets'>
                                <option value="Projets">Projets</option>
                                {
                                    projets.length > 0 &&
                                    projets.map((projet, key) => projet.division === division && <option key={key}>
                                        {projet.name}
                                    </option>)
                                }
                            </select>
                        </div>
                    </div>)
                }



      </div>
    </div> 
  )
}
export default EmpHome

