import { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import GalleryAdmin from './GalleryAdmin';
import BannerAdmin from './BannerAdmin';

export default function SafetyCollegeTab() {
  const [courses, setCourses] = useState([]);
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [courseCode, setCourseCode] = useState('');
  const [courseName, setCourseName] = useState('');
  const [courseDuration, setCourseDuration] = useState('');
  const [courseEligibility, setCourseEligibility] = useState('');
  const [courseSeats, setCourseSeats] = useState('');
  const [courseMode, setCourseMode] = useState('');
  const [courseHighlights, setCourseHighlights] = useState('');
  
  const [partnerName, setPartnerName] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const courseSnap = await getDocs(collection(db, 'safetyCourses'));
      setCourses(courseSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      
      const partnerSnap = await getDocs(collection(db, 'safetyPartners'));
      setPartners(partnerSnap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    if (!courseName || !courseCode) return alert("Code and Name are required");
    try {
      await addDoc(collection(db, 'safetyCourses'), {
        code: courseCode, name: courseName, duration: courseDuration,
        eligibility: courseEligibility, seats: courseSeats, mode: courseMode,
        highlights: courseHighlights.split(',').map(s=>s.trim())
      });
      setCourseCode(''); setCourseName(''); setCourseDuration(''); setCourseEligibility('');
      setCourseSeats(''); setCourseMode(''); setCourseHighlights('');
      fetchData();
    } catch (e) { console.error(e); }
  };

  const handleAddPartner = async (e) => {
    e.preventDefault();
    if (!partnerName) return;
    try {
      await addDoc(collection(db, 'safetyPartners'), { name: partnerName });
      setPartnerName('');
      fetchData();
    } catch (e) { console.error(e); }
  };

  const deleteDocHandler = async (col, id) => {
    if (!window.confirm("Are you sure?")) return;
    await deleteDoc(doc(db, col, id));
    fetchData();
  };

  return (
    <div className="space-y-12">
      <BannerAdmin pageId="safety" title="Safety College - Photo Slider" />
      <GalleryAdmin pageId="safetycollege" title="Safety College - Photo Gallery" />

      {/* COURSES */}
      <section>
        <h2 className="text-2xl font-extrabold mb-6 text-navy border-b pb-2">Courses Offered</h2>
        <form onSubmit={handleAddCourse} className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Course Code (e.g. DIS-01)" value={courseCode} onChange={e=>setCourseCode(e.target.value)} className="border p-2 rounded" required />
          <input type="text" placeholder="Course Name" value={courseName} onChange={e=>setCourseName(e.target.value)} className="border p-2 rounded" required />
          <input type="text" placeholder="Duration (e.g. 1 Year)" value={courseDuration} onChange={e=>setCourseDuration(e.target.value)} className="border p-2 rounded" />
          <input type="text" placeholder="Eligibility" value={courseEligibility} onChange={e=>setCourseEligibility(e.target.value)} className="border p-2 rounded" />
          <input type="text" placeholder="Seats (e.g. 60)" value={courseSeats} onChange={e=>setCourseSeats(e.target.value)} className="border p-2 rounded" />
          <input type="text" placeholder="Mode (e.g. Full-time)" value={courseMode} onChange={e=>setCourseMode(e.target.value)} className="border p-2 rounded" />
          <input type="text" placeholder="Highlights (comma separated)" value={courseHighlights} onChange={e=>setCourseHighlights(e.target.value)} className="border p-2 rounded md:col-span-2" />
          <div className="md:col-span-2">
            <button type="submit" className="px-6 py-2 bg-magenta text-white font-bold rounded hover:bg-rose-700">Add Course</button>
          </div>
        </form>

        <div className="grid sm:grid-cols-2 gap-4">
          {courses.map(c => (
            <div key={c.id} className="border rounded-xl p-4 relative shadow-sm">
              <button onClick={() => deleteDocHandler('safetyCourses', c.id)} className="absolute top-2 right-2 w-6 h-6 bg-red-100 text-red-600 rounded-full text-xs font-bold">X</button>
              <h4 className="font-bold text-navy">{c.code} - {c.name}</h4>
              <p className="text-sm text-gray-600">{c.duration} | {c.mode}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HIRING PARTNERS */}
      <section>
        <h2 className="text-2xl font-extrabold mb-6 text-navy border-b pb-2">Hiring Partners</h2>
        <form onSubmit={handleAddPartner} className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8 flex gap-4">
          <input type="text" placeholder="Company Name" value={partnerName} onChange={e=>setPartnerName(e.target.value)} className="border p-2 rounded flex-1" required />
          <button type="submit" className="px-6 py-2 bg-saffron text-white font-bold rounded hover:bg-orange-500">Add Partner</button>
        </form>

        <div className="flex flex-wrap gap-2">
          {partners.map(p => (
            <div key={p.id} className="bg-white border rounded-full px-4 py-1 flex items-center gap-2">
              <span className="text-sm">{p.name}</span>
              <button onClick={() => deleteDocHandler('safetyPartners', p.id)} className="text-red-500 font-bold ml-2">x</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
