// import Home from '../components/Home/Home'
// // import Contact from '../components/Contact/Contact'
// // import Login from '../pages/Login'
// // import Signup from '../pages/Signup'
// // import Services from '../pages/Services'
// // import Doctors from '../pages/Doctors/Doctors'
// // import DoctorDetails from '../pages/Doctors/DoctorDetails';

<<<<<<< Updated upstream
import { Routes, Route } from 'react-router-dom'
import ReportIssue from '../components/ReportIssue/ReportIssue'
import AdminDashboard from '../components/Admin/AdminDashboard'
import UserDashboard from '../components/User/UserDashboard'
import ContactUs from '../components/ContactUs/ContactUs'
=======
// import { Routes, Route } from 'react-router-dom'

>>>>>>> Stashed changes

// const Routers = () => {
//     return <Routes>
//         <Route path='/' element={<Home />} />
//         <Route path='/home' element={<Home />} />
//         {/* <Route path='/doctors' element={<Doctors />} /> */}
//         {/* <Route path='/doctors/:id' element={<DoctorDetails />} /> */}
//         {/* <Route path='/login' element={<Login />} />
//         <Route path='/contact' element={<Contact />} />
//         <Route path='/register' element={<Signup />} />
//         <Route path='/services' element={<Services />} /> */}
//     </Routes>
// }

// export default Routers




import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../components/Home/Home';
// import Services from '../pages/Services';
// import Contact from '../components/Contact/Contact';
import CitizenDashboard from '../components/Dashboard/CitizenDashboard';
import MunicipalDashboard from '../components/Dashboard/MunicipalDashboard';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ProtectedRoute = ({ role, children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get(`${API_BASE_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data);
          setLoading(false);
        })
        .catch(() => {
          localStorage.removeItem('token');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  if (!user) return <Navigate to="/home" />;
  if (user.role !== role) return <Navigate to="/home" />;

  return children;
};

const Routers = () => {
<<<<<<< Updated upstream
    return <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/reportissue' element={<ReportIssue />} />
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/dashboard' element={<UserDashboard />} />
        <Route path='/contactus' element={<ContactUs />} />

        {/* <Route path='/doctors/:id' element={<DoctorDetails />} /> */}
        {/* <Route path='/login' element={<Login />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/register' element={<Signup />} />
        <Route path='/services' element={<Services />} /> */}
=======
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      {/* <Route path="/services" element={<Services />} /> */}
      {/* <Route path="/contact" element={<Contact />} /> */}
      <Route
        path="/dashboard/citizen"
        element={
          <ProtectedRoute role="citizen">
            <CitizenDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/municipal"
        element={
          <ProtectedRoute role="municipal">
            <MunicipalDashboard />
          </ProtectedRoute>
        }
      />
>>>>>>> Stashed changes
    </Routes>
  );
};

export default Routers;