import { useState } from 'react';
import HomepageTab from './tabs/HomepageTab';
import PreSchoolTab from './tabs/PreSchoolTab';
import ReadIndiaTab from './tabs/ReadIndiaTab';
import SafetyCollegeTab from './tabs/SafetyCollegeTab';
import SocialActivitiesTab from './tabs/SocialActivitiesTab';
import ContactTab from './tabs/ContactTab';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const TABS = [
  { id: 'home', label: 'Homepage' },
  { id: 'preschool', label: 'Pre School' },
  { id: 'readindia', label: 'Read India' },
  { id: 'safetycollege', label: 'Safety College' },
  { id: 'social', label: 'Social Activities' },
  { id: 'contact', label: 'Contact Details' },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('home');
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-navy text-white flex-shrink-0 border-r border-gray-800">
        <div className="p-6">
          <h2 className="text-xl font-extrabold text-white mb-1">Admin Panel</h2>
          <p className="text-xs text-gray-400">Content Management System</p>
        </div>
        <nav className="flex flex-col px-4 pb-6 space-y-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-left px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === tab.id
                  ? 'bg-magenta text-white shadow-md'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        
        <div className="p-4 mt-auto border-t border-gray-800">
          <button 
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-red-400 hover:text-red-300 hover:bg-white/10 rounded-lg text-sm font-semibold transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 min-h-[70vh]">
          {activeTab === 'home' && <HomepageTab />}
          {activeTab === 'preschool' && <PreSchoolTab />}
          {activeTab === 'readindia' && <ReadIndiaTab />}
          {activeTab === 'safetycollege' && <SafetyCollegeTab />}
          {activeTab === 'social' && <SocialActivitiesTab />}
          {activeTab === 'contact' && <ContactTab />}
        </div>
      </main>
    </div>
  );
}
