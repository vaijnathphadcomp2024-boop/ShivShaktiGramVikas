import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function Gallery({ pageId, title = "Photo Gallery", subtitle = "Glimpses of our activities and infrastructure." }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const q = query(collection(db, 'galleries'), where("pageId", "==", pageId));
        const snap = await getDocs(q);
        setImages(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.error("Error fetching gallery for", pageId, err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, [pageId]);

  if (!loading && images.length === 0) return null; // Hide if no images

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-navy mb-3">{title}</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {loading ? (
          <p className="text-center text-gray-400">Loading gallery...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map(img => (
              <div key={img.id} className="relative aspect-square rounded-2xl overflow-hidden group shadow-sm hover:shadow-lg transition-all duration-300">
                <img 
                  src={img.imageUrl} 
                  alt={img.caption || "Gallery image"} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                {img.caption && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <p className="text-white font-medium p-4 text-sm w-full truncate">{img.caption}</p>
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
