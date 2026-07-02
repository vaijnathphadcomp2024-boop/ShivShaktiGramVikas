import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home            from './pages/Home';
import About           from './pages/About';
import PreSchool       from './pages/PreSchool';
import ReadIndia       from './pages/ReadIndia';
import SafetyCollege   from './pages/SafetyCollege';
import SocialActivities from './pages/SocialActivities';
import Ambulance       from './pages/Ambulance';
import ContactNews     from './pages/Contact';

// Admin
import AdminLogin     from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';

export default function App() {
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
          <Route path="/admin/login"     element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}
