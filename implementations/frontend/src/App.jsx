import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Cars from './pages/Cars'
import Bookings from './pages/Bookings'
import Dashboard from './pages/Staff/Dashboard'
import Reports from './pages/Staff/Reports'
import { getUserRole } from './lib/auth'
import { Navigate } from 'react-router-dom'

function App() {
  const role = getUserRole();
  const StaffRoute = ({ children }) => {
    return role === 'staff' ? children : <Navigate to="/" />;
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route
          path="/staff"
          element={<StaffRoute><Dashboard /></StaffRoute>}
        />
        <Route
          path="/staff/reports"
          element={<StaffRoute><Reports /></StaffRoute>}
        />
      </Routes>
    </>
  )
}

export default App
