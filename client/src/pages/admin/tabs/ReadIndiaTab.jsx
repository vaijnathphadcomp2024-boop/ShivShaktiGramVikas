import { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import GalleryAdmin from './GalleryAdmin';
import BannerAdmin from './BannerAdmin';

export default function ReadIndiaTab() {
  // --- Centers State ---
  const [centers, setCenters] = useState([]);
  const [loadingCenters, setLoadingCenters] = useState(true);
  const [centerName, setCenterName] = useState('');
  const [centerLocation, setCenterLocation] = useState('');
  const [centerDays, setCenterDays] = useState('');
  const [centerTimings, setCenterTimings] = useState('');
  const [centerPrograms, setCenterPrograms] = useState('');
  const [savingCenter, setSavingCenter] = useState(false);

  // --- Stories State ---
  const [stories, setStories] = useState([]);
  const [loadingStories, setLoadingStories] = useState(true);
  const [storyName, setStoryName] = useState('');
  const [storyRole, setStoryRole] = useState('');
  const [storyText, setStoryText] = useState('');
  const [savingStory, setSavingStory] = useState(false);

  useEffect(() => {
    fetchCenters();
    fetchStories();
  }, []);

  const fetchCenters = async () => {
    try {
      const snap = await getDocs(collection(db, 'readIndiaCenters'));
      setCenters(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (e) { console.error(e); } finally { setLoadingCenters(false); }
  };

  const fetchStories = async () => {
    try {
      const snap = await getDocs(collection(db, 'readIndiaStories'));
      setStories(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (e) { console.error(e); } finally { setLoadingStories(false); }
  };

  const handleAddCenter = async (e) => {
    e.preventDefault();
    if (!centerName || !centerLocation || !centerTimings) return alert("Fill required fields");
    setSavingCenter(true);
    try {
      await addDoc(collection(db, 'readIndiaCenters'), {
        name: centerName, location: centerLocation, days: centerDays,
        timings: centerTimings, programs: centerPrograms.split(',').map(s=>s.trim()),
        createdAt: new Date().toISOString()
      });
      setCenterName(''); setCenterLocation(''); setCenterDays(''); setCenterTimings(''); setCenterPrograms('');
      fetchCenters();
    } catch (e) { console.error(e); } finally { setSavingCenter(false); }
  };

  const handleAddStory = async (e) => {
    e.preventDefault();
    if (!storyName || !storyText) return alert("Fill required fields");
    setSavingStory(true);
    try {
      await addDoc(collection(db, 'readIndiaStories'), {
        name: storyName, role: storyRole, text: storyText,
        createdAt: new Date().toISOString()
      });
      setStoryName(''); setStoryRole(''); setStoryText('');
      fetchStories();
    } catch (e) { console.error(e); } finally { setSavingStory(false); }
  };

  const deleteCenter = async (id) => {
    if (!window.confirm("Delete center?")) return;
    await deleteDoc(doc(db, 'readIndiaCenters', id));
    fetchCenters();
  };

  const deleteStory = async (id) => {
    if (!window.confirm("Delete story?")) return;
    await deleteDoc(doc(db, 'readIndiaStories', id));
    fetchStories();
  };

  return (
    <div className="space-y-12">
      <BannerAdmin pageId="readindia" title="Read India - Photo Slider" />
      <GalleryAdmin pageId="readindia" title="Read India - Photo Gallery" />

      {/* CENTERS */}
      <section>
        <h2 className="text-2xl font-extrabold mb-6 text-navy border-b pb-2">Centers & Timings</h2>
        <form onSubmit={handleAddCenter} className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Center Name (e.g. Kingaon Primary Center)" value={centerName} onChange={e=>setCenterName(e.target.value)} className="border p-2 rounded" required />
            <input type="text" placeholder="Location" value={centerLocation} onChange={e=>setCenterLocation(e.target.value)} className="border p-2 rounded" required />
            <input type="text" placeholder="Days (e.g. Mon-Sat)" value={centerDays} onChange={e=>setCenterDays(e.target.value)} className="border p-2 rounded" />
            <input type="text" placeholder="Timings (e.g. 5:00 PM - 7:00 PM)" value={centerTimings} onChange={e=>setCenterTimings(e.target.value)} className="border p-2 rounded" required />
            <input type="text" placeholder="Programs (comma separated)" value={centerPrograms} onChange={e=>setCenterPrograms(e.target.value)} className="border p-2 rounded md:col-span-2" />
          </div>
          <button type="submit" disabled={savingCenter} className="mt-4 px-6 py-2 bg-magenta text-white font-bold rounded hover:bg-rose-700 disabled:opacity-50">
            {savingCenter ? 'Saving...' : 'Add Center'}
          </button>
        </form>

        <div className="grid sm:grid-cols-2 gap-4">
          {centers.map(c => (
            <div key={c.id} className="border rounded-xl p-4 relative shadow-sm">
              <button onClick={() => deleteCenter(c.id)} className="absolute top-2 right-2 w-6 h-6 bg-red-100 text-red-600 rounded-full text-xs font-bold">X</button>
              <h4 className="font-bold text-navy">{c.name}</h4>
              <p className="text-sm text-gray-600">📍 {c.location}</p>
              <p className="text-sm text-gray-600">📅 {c.days} | ⏰ {c.timings}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STORIES */}
      <section>
        <h2 className="text-2xl font-extrabold mb-6 text-navy border-b pb-2">Impact Stories</h2>
        <form onSubmit={handleAddStory} className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Name" value={storyName} onChange={e=>setStoryName(e.target.value)} className="border p-2 rounded" required />
            <input type="text" placeholder="Role (e.g. Student)" value={storyRole} onChange={e=>setStoryRole(e.target.value)} className="border p-2 rounded" />
            <textarea placeholder="Story text..." value={storyText} onChange={e=>setStoryText(e.target.value)} className="border p-2 rounded md:col-span-2 h-24" required />
          </div>
          <button type="submit" disabled={savingStory} className="mt-4 px-6 py-2 bg-saffron text-white font-bold rounded hover:bg-orange-500 disabled:opacity-50">
            {savingStory ? 'Saving...' : 'Add Story'}
          </button>
        </form>

        <div className="grid sm:grid-cols-2 gap-4">
          {stories.map(s => (
            <div key={s.id} className="border rounded-xl p-4 relative shadow-sm">
              <button onClick={() => deleteStory(s.id)} className="absolute top-2 right-2 w-6 h-6 bg-red-100 text-red-600 rounded-full text-xs font-bold">X</button>
              <p className="text-sm italic text-gray-600 mb-2">"{s.text}"</p>
              <h4 className="font-bold text-navy text-sm">- {s.name} <span className="font-normal text-gray-400">({s.role})</span></h4>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
