import { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { uploadToImageKit, deleteFromImageKit } from '../../../utils/imagekit';
import BannerAdmin from './BannerAdmin';

export default function HomepageTab() {
  // --- Committee State ---
  const [members, setMembers] = useState([]);
  const [loadingMembers, setLoadingMembers] = useState(true);
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [uploadingMember, setUploadingMember] = useState(false);

  // --- Achievements State ---
  const [achievements, setAchievements] = useState([]);
  const [loadingAch, setLoadingAch] = useState(true);
  const [achTitle, setAchTitle] = useState('');
  const [achDesc, setAchDesc] = useState('');
  const [uploadingAch, setUploadingAch] = useState(false);

  useEffect(() => {
    fetchMembers();
    fetchAchievements();
  }, []);

  // --- Committee Logic ---
  const fetchMembers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'committeeMembers'));
      setMembers(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching members:", error);
    } finally {
      setLoadingMembers(false);
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!name || !designation || !imageFile) return alert("Please fill all fields and select an image.");
    
    setUploadingMember(true);
    try {
      const result = await uploadToImageKit(imageFile, '/shivshakti/committee');

      await addDoc(collection(db, 'committeeMembers'), {
        name,
        designation,
        imageUrl: result.url,
        imagekitFileId: result.fileId,
        createdAt: new Date().toISOString()
      });

      setName(''); setDesignation(''); setImageFile(null);
      fetchMembers();
    } catch (error) {
      console.error("Error adding member:", error);
    } finally {
      setUploadingMember(false);
    }
  };

  const handleDeleteMember = async (id) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;
    try {
      const docRef = doc(db, 'committeeMembers', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.imagekitFileId) {
          await deleteFromImageKit(data.imagekitFileId);
        }
      }
      await deleteDoc(docRef);
      fetchMembers();
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  // --- Achievements Logic ---
  const fetchAchievements = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'achievements'));
      setAchievements(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching achievements:", error);
    } finally {
      setLoadingAch(false);
    }
  };

  const handleAddAchievement = async (e) => {
    e.preventDefault();
    if (!achTitle || !achDesc) return alert("Please fill title and description.");
    
    setUploadingAch(true);
    try {
      await addDoc(collection(db, 'achievements'), {
        title: achTitle,
        description: achDesc,
        createdAt: new Date().toISOString()
      });
      setAchTitle(''); setAchDesc('');
      fetchAchievements();
    } catch (error) {
      console.error("Error adding achievement:", error);
    } finally {
      setUploadingAch(false);
    }
  };

  const handleDeleteAchievement = async (id) => {
    if (!window.confirm("Delete this achievement?")) return;
    try {
      await deleteDoc(doc(db, 'achievements', id));
      fetchAchievements();
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  return (
    <div className="space-y-12">
      
      <BannerAdmin pageId="home" title="Homepage - Photo Slider" />

      {/* ================= COMMITTEE SECTION ================= */}
      <section>
        <h2 className="text-2xl font-extrabold mb-6 text-navy border-b pb-2">Manage Committee Members</h2>
        
        <form onSubmit={handleAddMember} className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8">
          <h3 className="font-bold mb-4">Add New Member</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input 
              type="text" placeholder="Name" 
              value={name} onChange={e => setName(e.target.value)}
              className="border p-2 rounded w-full" required
            />
            <input 
              type="text" placeholder="Designation" 
              value={designation} onChange={e => setDesignation(e.target.value)}
              className="border p-2 rounded w-full" required
            />
            <input 
              type="file" accept="image/*"
              onChange={e => setImageFile(e.target.files[0])}
              className="border p-1.5 rounded w-full bg-white" required
            />
          </div>
          <button 
            type="submit" disabled={uploadingMember}
            className="mt-4 px-6 py-2 bg-magenta text-white font-bold rounded hover:bg-rose-700 disabled:opacity-50"
          >
            {uploadingMember ? 'Uploading...' : 'Add Member'}
          </button>
        </form>

        <div>
          {loadingMembers ? <p>Loading members...</p> : members.length === 0 ? (
            <p className="text-gray-500 text-sm">No members found. Add one above.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {members.map(member => (
                <div key={member.id} className="border rounded-xl p-4 flex flex-col items-center text-center relative shadow-sm">
                  <button 
                    onClick={() => handleDeleteMember(member.id)}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold hover:bg-red-200"
                  >X</button>
                  <img src={member.imageUrl} alt={member.name} className="w-20 h-20 rounded-full object-cover mb-3 shadow" />
                  <p className="font-bold text-sm text-navy">{member.name}</p>
                  <p className="text-xs text-gray-500">{member.designation}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= ACHIEVEMENTS SECTION ================= */}
      <section>
        <h2 className="text-2xl font-extrabold mb-6 text-navy border-b pb-2">Manage Achievements & Recognition</h2>
        
        <form onSubmit={handleAddAchievement} className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8">
          <h3 className="font-bold mb-4">Add New Achievement</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text" placeholder="Achievement Title (e.g., Best NGO 2023)" 
              value={achTitle} onChange={e => setAchTitle(e.target.value)}
              className="border p-2 rounded w-full" required
            />
            <input 
              type="text" placeholder="Short Description" 
              value={achDesc} onChange={e => setAchDesc(e.target.value)}
              className="border p-2 rounded w-full" required
            />
          </div>
          <button 
            type="submit" disabled={uploadingAch}
            className="mt-4 px-6 py-2 bg-saffron text-white font-bold rounded hover:bg-orange-500 disabled:opacity-50"
          >
            {uploadingAch ? 'Saving...' : 'Add Achievement'}
          </button>
        </form>

        <div>
          {loadingAch ? <p>Loading achievements...</p> : achievements.length === 0 ? (
            <p className="text-gray-500 text-sm">No achievements found. Add one above.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {achievements.map(ach => (
                <div key={ach.id} className="border rounded-xl p-5 relative shadow-sm bg-white">
                  <button 
                    onClick={() => handleDeleteAchievement(ach.id)}
                    className="absolute top-3 right-3 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold hover:bg-red-200"
                  >X</button>
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-saffron mb-3">
                    🏆
                  </div>
                  <h4 className="font-bold text-navy mb-1">{ach.title}</h4>
                  <p className="text-sm text-gray-600">{ach.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
