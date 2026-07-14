import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

// Pages
import Home            from './pages/Home';
import About           from './pages/About';
import PreSchool       from './pages/PreSchool';
import ReadIndia       from './pages/ReadIndia';
import SafetyCollege   from './pages/SafetyCollege';
import SocialActivities from './pages/SocialActivities';
import Ambulance       from './pages/Ambulance';
import ContactNews     from './pages/ContactNews';

// Admin
import AdminLogin     from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';

export default function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const ProtectedRoute = ({ children }) => {
    if (authLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!user) return <Navigate to="/admin/login" />;
    return children;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-1">
        <Routes>
          <Route path="/"                  element={<Home />} />
          <Route path="/about"             element={<About />} />
          <Route path="/pre-school"        element={<PreSchool />} />
          <Route path="/read-india"        element={<ReadIndia />} />
          <Route path="/safety-college"    element={<SafetyCollege />} />
          <Route path="/social-activities" element={<SocialActivities />} />
          <Route path="/ambulance"         element={<Ambulance />} />
          <Route path="/contact-news"      element={<ContactNews />} />

          {/* Admin */}
          <Route path="/admin"           element={<Navigate to="/admin/dashboard" />} />
          <Route path="/admin/login"     element={<AdminLogin />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}
