import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./components/Login.jsx"
import Register from "./components/Register.jsx"
import Home from "./pages/Home.jsx"
import EmployerDashboard from "./pages/EmployerDashboard.jsx"
import UniversityDashboard from "./pages/UniversityDashboard.jsx"
import GovernmentDashboard from "./pages/GovernmentDashboard.jsx"
import React from "react"
import './components/credentials.css'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/employer/dashboard" element={<EmployerDashboard />} />
        <Route path="/university/dashboard" element={<UniversityDashboard />} />
        <Route path="/government/dashboard" element={<GovernmentDashboard />} />
      </Routes>
    </Router>
  )
}