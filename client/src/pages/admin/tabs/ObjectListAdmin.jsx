import { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

export default function ObjectListAdmin({ title, collectionName, fields, renderItem }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState(fields.reduce((acc, f) => ({ ...acc, [f.name]: f.default || '' }), {}));

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const snap = await getDocs(collection(db, collectionName));
      const fetched = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      fetched.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      setItems(fetched);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await addDoc(collection(db, collectionName), { ...formData, createdAt: new Date().toISOString() });
      setFormData(fields.reduce((acc, f) => ({ ...acc, [f.name]: f.default || '' }), {}));
      fetchItems();
    } catch (e) { alert("Error: " + e.message); } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await deleteDoc(doc(db, collectionName, id));
      fetchItems();
    } catch (error) { console.error(error); }
  };

  return (
    <div className="mb-12">
      <h3 className="text-xl font-bold mb-4 border-b pb-2">{title}</h3>
      <form onSubmit={handleAdd} className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {fields.map(f => (
            f.type === 'textarea' ? (
              <textarea key={f.name} placeholder={f.placeholder} value={formData[f.name]} onChange={e => setFormData({ ...formData, [f.name]: e.target.value })} required={f.required} className="border p-2 rounded col-span-full" />
            ) : (
              <input key={f.name} type={f.type || 'text'} placeholder={f.placeholder} value={formData[f.name]} onChange={e => setFormData({ ...formData, [f.name]: e.target.value })} required={f.required} className="border p-2 rounded" />
            )
          ))}
        </div>
        <button type="submit" disabled={saving} className="mt-4 px-4 py-2 bg-saffron text-white font-bold rounded hover:bg-orange-500 disabled:opacity-50">
          {saving ? 'Adding...' : 'Add Item'}
        </button>
      </form>
      <div className="space-y-3">
        {loading ? <p>Loading...</p> : items.length === 0 ? <p className="text-gray-400">No data found. This section will be hidden on the live site.</p> : (
          items.map(item => (
            <div key={item.id} className="flex justify-between items-center bg-white border p-4 rounded shadow-sm">
              <div>{renderItem(item)}</div>
              <button onClick={() => handleDelete(item.id)} className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 shrink-0">Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
