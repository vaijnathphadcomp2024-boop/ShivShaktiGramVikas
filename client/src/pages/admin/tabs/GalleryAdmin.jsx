import { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { collection, query, where, getDocs, addDoc, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { uploadToImageKit, deleteFromImageKit } from '../../../utils/imagekit';

export default function GalleryAdmin({ pageId, title = "Manage Photo Gallery" }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [imageFile, setImageFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetchImages();
  }, [pageId]);

  const fetchImages = async () => {
    try {
      const q = query(collection(db, 'galleries'), where("pageId", "==", pageId));
      const snap = await getDocs(q);
      setImages(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!imageFile) return alert("Please select an image.");
    
    setUploading(true);
    setProgress(0);
    try {
      // Upload to ImageKit
      const result = await uploadToImageKit(
        imageFile, 
        `/shivshakti/galleries/${pageId}`,
        (pct) => setProgress(pct)
      );

      // Save reference in Firestore
      await addDoc(collection(db, 'galleries'), {
        pageId,
        imageUrl: result.url,
        imagekitFileId: result.fileId,
        caption,
        createdAt: new Date().toISOString()
      });

      setImageFile(null);
      setCaption('');
      setProgress(0);
      // Reset file input
      const fileInput = document.querySelector(`#gallery-file-${pageId}`);
      if (fileInput) fileInput.value = '';
      fetchImages();
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Upload failed: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this photo?")) return;
    try {
      const docRef = doc(db, 'galleries', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.imagekitFileId) {
          await deleteFromImageKit(data.imagekitFileId);
        }
      }
      await deleteDoc(docRef);
      fetchImages();
    } catch (error) {
      console.error("Error deleting photo:", error);
    }
  };

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-extrabold mb-6 text-navy border-b pb-2">{title}</h2>
      
      <form onSubmit={handleUpload} className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8">
        <h3 className="font-bold mb-4">Upload New Photo</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input 
            id={`gallery-file-${pageId}`}
            type="file" accept="image/*"
            onChange={e => setImageFile(e.target.files[0])}
            className="border p-1.5 rounded w-full bg-white" required
          />
          <input 
            type="text" placeholder="Caption (optional)" 
            value={caption} onChange={e => setCaption(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Progress Bar */}
        {uploading && (
          <div className="mt-3">
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
          {uploading ? `Uploading... ${progress}%` : 'Upload Photo'}
        </button>
      </form>

      <div>
        {loading ? <p>Loading gallery...</p> : images.length === 0 ? (
          <p className="text-gray-500 text-sm">No photos found. Upload one above.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map(img => (
              <div key={img.id} className="relative rounded-xl overflow-hidden shadow-sm group aspect-square">
                <img src={img.imageUrl} alt={img.caption} className="w-full h-full object-cover" />
                <button 
                  onClick={() => handleDelete(img.id)}
                  className="absolute top-2 right-2 w-7 h-7 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                >X</button>
                {img.caption && (
                  <div className="absolute bottom-0 inset-x-0 bg-black/60 p-2">
                    <p className="text-white text-xs truncate">{img.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
