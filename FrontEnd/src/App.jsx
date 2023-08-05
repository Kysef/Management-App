import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import React from 'react';

import Main from "./views/Main"
import EmpHome from "./views/EmpHome"
import AdminHome from "./views/AdminHome"
import AddUsers from "./views/AddUsers"
import UpdateUser from "./views/UpdateUser"
import AddProjets from "./views/AddProjets"
import GestionProjets from "./views/GestionProjets"


import "./index.css";


export default function App() {

  return (

    <Router >
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/EmpHome" element={<EmpHome />} />
        <Route path="/AdminHome" element={<AdminHome />} />
        <Route path="/AddUsers" element={<AddUsers />} />
        <Route path="/UpdateUser/:id" element={<UpdateUser />} />
        <Route path="/AddProjets" element={<AddProjets />} />
        <Route path="/GestionProjets" element={<GestionProjets />} />
      </Routes>
    </Router>



  );
}
