import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BannerSlider from '../components/BannerSlider';
import Gallery from '../components/Gallery';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const INITIATIVES = [
  {
    to: '/pre-school',
    title: 'शिक्षण',
    desc: 'गरजू विद्यार्थ्यांना दर्जेदार शिक्षण व शैक्षणिक साहित्य उपलब्ध करून देणे',
    icon: (
      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
      </svg>
    ),
    color: 'bg-blue-50',
    borderColor: 'border-blue-100'
  },
  {
    to: '/ambulance',
    title: 'आरोग्य',
    desc: 'आरोग्य शिबिरे, तपासणी व औषधोपचार उपलब्ध करून देणे',
    icon: (
      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 0v2m0-2h2m-2 0H10"/>
      </svg>
    ),
    color: 'bg-green-50',
    borderColor: 'border-green-100'
  },
  {
    to: '/social-activities',
    title: 'महिला सक्षमीकरण',
    desc: 'महिलांसाठी स्वयंरोजगार, प्रशिक्षण व जनजागृती उपक्रम राबविणे',
    icon: (
      <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
      </svg>
    ),
    color: 'bg-orange-50',
    borderColor: 'border-orange-100'
  },
  {
    to: '/safety-college',
    title: 'बाल विकास',
    desc: 'मुलांच्या सर्वांगीण विकासासाठी विविध उपक्रम राबविणे',
    icon: (
      <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
    color: 'bg-red-50',
    borderColor: 'border-red-100'
  },
  {
    to: '/social-activities',
    title: 'पर्यावरण संवर्धन',
    desc: 'वृक्षारोपण, स्वच्छता अभियान आणि पर्यावरण जागरूकता',
    icon: (
      <svg className="w-8 h-8 text-lime-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
      </svg>
    ),
    color: 'bg-lime-50',
    borderColor: 'border-lime-100'
  },
  {
    to: '/social-activities',
    title: 'आपत्ती मदत',
    desc: 'आपत्तीग्रस्तांना तत्काळ मदत व पुनर्वसन कार्य',
    icon: (
      <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>
    ),
    color: 'bg-purple-50',
    borderColor: 'border-purple-100'
  },
];

const DEFAULT_IMPACT = [
  { emoji: '👥', title: 'लाभार्थी', value: 5000, suffix: '+' },
  { emoji: '🤝', title: 'उपक्रम', value: 25, suffix: '+' },
  { emoji: '🙏', title: 'स्वयंसेवक', value: 100, suffix: '+' },
  { emoji: '📍', title: 'गावे', value: 15, suffix: '+' },
];

export default function Home() {
  const [impactStats, setImpactStats] = useState([]);

  useEffect(() => {
    const fetchImpact = async () => {
      try {
        const snap = await getDocs(collection(db, 'impactStats'));
        if (!snap.empty) {
          const fetchedStats = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          fetchedStats.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          setImpactStats(fetchedStats);
        }
      } catch (e) {
        console.error("Error fetching impact stats", e);
      }
    };
    fetchImpact();
  }, []);

  const statsToShow = impactStats.length > 0 ? impactStats : DEFAULT_IMPACT;

  return (
    <main className="font-sans text-gray-800">
      {/* ── 1. Hero Section ────────────────────────────────────────────────── */}
      <section className="relative w-full h-[600px] md:h-[750px] flex items-center justify-start bg-[#1a3c5e]">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/logo.jpg" 
            alt="Hero Background" 
            className="w-full h-full object-cover object-center opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d6b3a]/95 via-[#0d6b3a]/70 to-[#0d6b3a]/20"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-[-80px]">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg">
              एक हात <span className="text-[#f97316]">मदतीचा</span>,<br />
              एक पाऊल <span className="text-[#f97316]">परिवर्तनाकडे...</span>
            </h1>
            <p className="text-lg md:text-xl text-green-50 mb-10 leading-relaxed max-w-xl">
              माउली सेवा प्रतिष्ठान समाजातील वंचित घटकांच्या शिक्षण, आरोग्य, महिला सक्षमीकरण आणि सामाजिक विकासासाठी समर्पित आहे.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/donate" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#f97316] text-white font-bold rounded-full hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                आम्हाला मदत करा
              </Link>
              <Link to="/about" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                आमच्याबद्दल जाणून घ्या
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Stats Bar */}
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 z-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto bg-[#0b5c32]/95 backdrop-blur-md rounded-2xl shadow-2xl border border-green-700/50 p-6 md:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-green-700/50 text-center">
              {statsToShow.slice(0,4).map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center px-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl text-[#f97316]">{stat.emoji || '👥'}</span>
                    <span className="text-2xl md:text-3xl font-bold text-white">{stat.value}{stat.suffix}</span>
                  </div>
                  <span className="text-sm md:text-base font-medium text-green-100">{stat.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* spacer for floating bar */}
      <div className="h-24 md:h-20 bg-white"></div>

      {/* ── 2. Banner Slider ──────────────────────────────────────────────── */}
      <section className="bg-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-sm border border-gray-100 bg-white">
          <BannerSlider pageId="home" />
        </div>
      </section>

      {/* ── 3. Our Initiatives ────────────────────────────────────────────── */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-2 text-[#0d6b3a]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"/></svg>
            <h2 className="text-3xl font-extrabold text-[#0d6b3a]">आमचे उपक्रम</h2>
          </div>
          <p className="text-gray-500 mb-10">समाजाच्या सर्वांगीण विकासासाठी आम्ही कार्यरत आहोत.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {INITIATIVES.map((item, idx) => (
              <div key={idx} className={`rounded-2xl border ${item.borderColor} ${item.color.replace('50', '50/50')} bg-white p-8 text-left hover:shadow-lg transition-shadow`}>
                <div className={`w-14 h-14 rounded-xl ${item.color} flex items-center justify-center mb-6`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 h-10">{item.desc}</p>
                <Link to={item.to} className="text-[#f97316] font-bold text-sm flex items-center gap-1 hover:text-orange-600 transition-colors">
                  अधिक वाचा <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. About Us ───────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <img src="/assets/logo.jpg" alt="Children studying" className="w-full h-full object-cover object-center" />
            </div>
            {/* Decorative dots/pattern behind image can go here */}
          </div>

          {/* Right Content */}
          <div>
            <div className="flex items-center gap-2 mb-2 text-[#0d6b3a]">
               <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0d6b3a]">आमच्याबद्दल</h2>
            </div>
            <div className="w-16 h-1 bg-[#f97316] rounded-full mb-6"></div>
            
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              माउली सेवा प्रतिष्ठान ही एक सामाजिक संस्था आहे जी समाजातील वंचित घटकांच्या जीवनात सकारात्मक बदल घडवून आणण्यासाठी समर्पित आहे. आम्ही शिक्षण, आरोग्य, महिला सक्षमीकरण आणि इतर सामाजिक उपक्रमांद्वारे समाजसेवा करत आहोत.
            </p>

            <ul className="space-y-4 mb-8">
              {[
                'पारदर्शकता आणि जबाबदारी',
                'समर्पित स्वयंसेवक टीम',
                'समाजाच्या सर्वांगीण विकासाचे उद्दिष्ट',
                'शाश्वत आणि दीर्घकालीन परिणाम'
              ].map((point, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#0d6b3a] text-white flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <span className="text-gray-700 font-medium">{point}</span>
                </li>
              ))}
            </ul>

            <Link to="/about" className="inline-block border-2 border-[#0d6b3a] text-[#0d6b3a] font-bold px-6 py-2.5 rounded-full hover:bg-[#0d6b3a] hover:text-white transition-colors mb-8">
              आमच्याबद्दल अधिक
            </Link>

            {/* Our Resolve Card */}
            <div className="bg-[#f0f7f4] rounded-2xl p-6 border border-green-100 text-center relative overflow-hidden">
              <div className="absolute right-[-10%] bottom-[-20%] text-green-100/50">
                <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 mx-auto mb-3 text-[#0d6b3a]">
                  <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                </div>
                <h4 className="text-[#0d6b3a] font-extrabold text-xl mb-3">आमचा संकल्प</h4>
                <p className="text-[#0d6b3a] font-medium italic leading-relaxed">
                  "समाजाच्या प्रत्येक घटकाला समान संधी आणि सन्मान मिळावा, यासाठी आम्ही कटिबद्ध आहोत."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. How You Can Help ───────────────────────────────────────────── */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-2 text-[#0d6b3a]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d6b3a]">आपण कसे मदत करू शकता?</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'दान करा',
                desc: 'आर्थिक मदतीद्वारे आमच्या उपक्रमांना हातभार लावा.',
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>,
                btnText: 'आता दान करा',
                to: '/donate'
              },
              {
                title: 'स्वयंसेवक बना',
                desc: 'आपला वेळ द्या आणि समाजसेवेत सहभागी व्हा.',
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>,
                btnText: 'माहिती पहा',
                to: '/get-involved'
              },
              {
                title: 'साहित्य दान करा',
                desc: 'शैक्षणिक साहित्य, कपडे किंवा इतर वस्तू दान करा.',
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>,
                btnText: 'संपर्क करा',
                to: '/contact-news'
              },
              {
                title: 'जागृती करा',
                desc: 'आमच्या उपक्रमांची माहिती इतरांना सांगा आणि मदत वाढवा.',
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>,
                btnText: 'शेअर करा',
                to: '/about'
              }
            ].map((card, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 border border-gray-100 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 mb-4 text-[#f97316]">
                  <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">{card.icon}</svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{card.title}</h3>
                <p className="text-gray-500 text-sm mb-6 flex-grow">{card.desc}</p>
                <Link to={card.to} className="text-[#0d6b3a] font-bold text-sm hover:text-green-700 transition-colors flex items-center gap-1">
                  {card.btnText} <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Gallery ────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-2 text-[#0d6b3a]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d6b3a]">आमच्या उपक्रमांची झलक</h2>
            </div>
          </div>

          <Gallery pageId="home" />

          <div className="text-center mt-8">
            <Link to="/gallery" className="inline-block border-2 border-gray-300 text-gray-700 font-bold px-8 py-2.5 rounded-full hover:border-[#0d6b3a] hover:text-[#0d6b3a] transition-colors">
              सर्व फोटो पहा
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
