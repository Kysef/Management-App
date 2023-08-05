import React, { useState } from 'react'
import { useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function GestionProjets() {

    const [dataProjet, setDataProjet] = useState([])
    const [projets, setProjets] = useState([])
    const [divisionName, setDivisionName] = useState('Division')

    useEffect(() => {
        axios.get('http://localhost:3001/projets')
            .then(res => {
                setDataProjet(res.data)
            })
    })

    const handleChange = (e) => {
        const division = e.target.value
        setDivisionName(division)
        if (division === 'Division') {
            setProjets(dataProjet)
        } else {
            const fetchProjet = dataProjet.filter(projet => projet.division === division)
            setProjets(fetchProjet)
        }
    }

    const handleDeleteProjet = (id) => {
        if (window.confirm('Do you want to delete this projet ')) {
            axios.delete('http://localhost:3001/deleteProjet/' + id)
                .then(res => {
                    console.log(res)
                })
            window.location.reload()
        }
    }

    return (
        <div className=' flex flex-col gap-3 justify-center items-center h-screen  '>
            <h2 className='text-3xl'>Projects Management</h2>
            <NavLink to={"/AdminHome"} className=' flex justify-end items-center text-6xl rotate-45 top-4 right-6 cursor-pointer absolute '  >+</NavLink>
            <select onChange={handleChange} defaultValue='Division' className='p-2'>
                <option value="Division">Les Divisions</option>
                <option value="DSI">DSI</option>
                <option value="DCS">DCS</option>
                <option value="DPL">DPL</option>
                <option value="DBC">DBC</option>
                <option value="DFC">DFC</option>
                <option value="DRH">DRH</option>
            </select>
            <table className='border w-4/6 border-black'>
                <thead>
                    <tr className='bg-black text-white'>
                        <td className='p-6'>ID</td>
                        <td className='p-6'>Name</td>
                        <td className='p-6'>Division</td>
                        <td className='p-6'>Delete</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        divisionName === 'Division' ? dataProjet.map((projet, key) => <tr key={key} className='border-b border-black' >
                            <td className='p-6' >{key + 1}</td>
                            <td className='p-6'>{projet.name}</td>
                            <td className='p-6'>{projet.division}</td>
                            <td className='p-6 flex items-center gap-6'>
                                <FontAwesomeIcon onClick={() => handleDeleteProjet(projet._id)} className='cursor-pointer' icon={faTrash} />
                            </td>
                        </tr>)
                            : projets.map((projet, key) => <tr key={key} className='border-b border-black' >
                                <td className='p-6' >{key + 1}</td>
                                <td className='p-6'>{projet.name}</td>
                                <td className='p-6'>{projet.division}</td>
                                <td className='p-6 flex items-center gap-6'>
                                    <FontAwesomeIcon onClick={() => handleDeleteProjet(projet._id)} className='cursor-pointer' icon={faTrash} />
                                </td>
                            </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}

export default GestionProjets