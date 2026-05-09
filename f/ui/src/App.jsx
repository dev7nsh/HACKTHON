import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CertificationList from './pages/CertificationList'
import StudentCertification from './pages/StudentCertification'
import Admin from './pages/Admin'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Certification" element={<CertificationList />} />
      <Route path="/certification" element={<CertificationList />} />
      <Route path="/Certification/:studentId" element={<StudentCertification />} />
      <Route path="/certification/:studentId" element={<StudentCertification />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  )
}

export default App

