import { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, setDoc } from 'firebase/firestore';

export default function ImpactAdmin() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [emoji, setEmoji] = useState('🌳');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [value, setValue] = useState('');
  const [suffix, setSuffix] = useState('+');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const snap = await getDocs(collection(db, 'impactStats'));
      const fetchedStats = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      // Sort by createdAt ascending to keep order consistent
      fetchedStats.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      setStats(fetchedStats);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title || !value) return alert("Title and Value are required");
    setSaving(true);
    try {
      await addDoc(collection(db, 'impactStats'), {
        emoji, title, subtitle, value, suffix,
        createdAt: new Date().toISOString()
      });
      setTitle(''); setSubtitle(''); setValue(''); setEmoji('🌳'); setSuffix('+');
      fetchStats();
    } catch (e) {
      console.error(e);
      alert("Error saving: " + e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this stat?")) return;
    try {
      await deleteDoc(doc(db, 'impactStats', id));
      fetchStats();
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  return (
    <section>
      <h2 className="text-2xl font-extrabold mb-6 text-navy border-b pb-2">Our Impact at a Glance</h2>
      
      <form onSubmit={handleAdd} className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8">
        <h3 className="font-bold mb-4">Add New Stat</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <input type="text" placeholder="Emoji (e.g. 🌳)" value={emoji} onChange={e=>setEmoji(e.target.value)} className="border p-2 rounded" />
          <input type="text" placeholder="Title (e.g. वृक्ष लागवड)" value={title} onChange={e=>setTitle(e.target.value)} className="border p-2 rounded" required />
          <input type="text" placeholder="Subtitle (e.g. Trees Planted)" value={subtitle} onChange={e=>setSubtitle(e.target.value)} className="border p-2 rounded" />
          <input type="text" placeholder="Numeric Value (e.g. 5000)" value={value} onChange={e=>setValue(e.target.value)} className="border p-2 rounded" required />
          <input type="text" placeholder="Suffix (e.g. +)" value={suffix} onChange={e=>setSuffix(e.target.value)} className="border p-2 rounded" />
        </div>
        <button type="submit" disabled={saving} className="mt-4 px-6 py-2 bg-saffron text-white font-bold rounded hover:bg-orange-500 disabled:opacity-50">
          {saving ? 'Saving...' : 'Add Stat'}
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? <p>Loading stats...</p> : stats.length === 0 ? (
          <p className="text-gray-500 text-sm">No dynamic impact stats found. The default stats will be displayed on the homepage.</p>
        ) : (
          stats.map(stat => (
            <div key={stat.id} className="border rounded-xl p-4 relative shadow-sm text-center">
              <button onClick={() => handleDelete(stat.id)} className="absolute top-2 right-2 w-6 h-6 bg-red-100 text-red-600 rounded-full text-xs font-bold">X</button>
              <div className="text-3xl mb-2">{stat.emoji}</div>
              <p className="text-saffron font-bold text-2xl">{stat.value}{stat.suffix}</p>
              <p className="text-navy font-semibold mt-1">{stat.title}</p>
              <p className="text-gray-500 text-xs">{stat.subtitle}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
