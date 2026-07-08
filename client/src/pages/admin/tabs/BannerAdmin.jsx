import { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { collection, query, where, getDocs, addDoc, deleteDoc, doc, getDoc, orderBy } from 'firebase/firestore';
import { uploadToImageKit, deleteFromImageKit } from '../../../utils/imagekit';

export default function BannerAdmin({ pageId, title = "Manage Slider Banners" }) {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetchBanners();
  }, [pageId]);

  const fetchBanners = async () => {
    try {
      const q = query(collection(db, 'banners'), where("pageId", "==", pageId));
      const snap = await getDocs(q);
      const fetchedBanners = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Sort by createdAt descending
      fetchedBanners.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setBanners(fetchedBanners);
    } catch (error) {
      console.error("Error fetching banners:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!imageFile) return alert("Please select a banner image.");
    
    setUploading(true);
    setProgress(0);
    try {
      // Upload to ImageKit
      const result = await uploadToImageKit(
        imageFile, 
        `/shivshakti/banners/${pageId}`,
        (pct) => setProgress(pct)
      );

      // Save reference in Firestore
      await addDoc(collection(db, 'banners'), {
        pageId,
        imageUrl: result.url,
        imagekitFileId: result.fileId,
        createdAt: new Date().toISOString()
      });

      setImageFile(null);
      setProgress(0);
      // Reset file input
      const fileInput = document.querySelector(`#banner-file-${pageId}`);
      if (fileInput) fileInput.value = '';
      fetchBanners();
    } catch (error) {
      console.error("Error uploading banner:", error);
      alert("Upload failed: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this banner?")) return;
    try {
      const docRef = doc(db, 'banners', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.imagekitFileId) {
          await deleteFromImageKit(data.imagekitFileId);
        }
      }
      await deleteDoc(docRef);
      fetchBanners();
    } catch (error) {
      console.error("Error deleting banner:", error);
    }
  };

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-extrabold mb-6 text-navy border-b pb-2">{title}</h2>
      
      <form onSubmit={handleUpload} className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8">
        <h3 className="font-bold mb-4">Upload New Banner</h3>
        <p className="text-sm text-gray-500 mb-4">Upload high-quality landscape images (e.g. 1920x1080) for best results.</p>
        <div className="grid grid-cols-1 gap-4">
          <input 
            id={`banner-file-${pageId}`}
            type="file" accept="image/*"
            onChange={e => setImageFile(e.target.files[0])}
            className="border p-1.5 rounded w-full bg-white max-w-md" required
          />
        </div>

        {/* Progress Bar */}
        {uploading && (
          <div className="mt-3 max-w-md">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-saffron h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">{progress}% uploaded</p>
          </div>
        )}

        <button 
          type="submit" disabled={uploading}
          className="mt-4 px-6 py-2 bg-saffron text-white font-bold rounded hover:bg-orange-500 disabled:opacity-50"
        >
          {uploading ? `Uploading... ${progress}%` : 'Upload Banner'}
        </button>
      </form>

      <div>
        {loading ? <p>Loading banners...</p> : banners.length === 0 ? (
          <p className="text-gray-500 text-sm">No dynamic banners found. The default placeholder banners will be displayed until you upload one.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {banners.map(banner => (
              <div key={banner.id} className="h-32 bg-gray-100 rounded-lg overflow-hidden relative mb-3 group">
                <img src={banner.imageUrl} alt="Banner" className="w-full h-full object-contain bg-black/5" />
                <button 
                  onClick={() => handleDelete(banner.id)}
                  className="absolute top-2 right-2 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                >X</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
