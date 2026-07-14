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

  if (!loading && images.length === 0) return null;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-saffron mb-3">
            Our Moments
          </span>
          <h2 className="text-3xl font-extrabold text-navy mb-3">{title}</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed">{subtitle}</p>
        </div>

        {loading ? (
          /* ── Skeleton grid ── */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-2xl overflow-hidden"
                style={{
                  background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                  backgroundSize: '200% 100%',
                  animation: `shimmer 1.8s ease-in-out ${i * 0.15}s infinite`,
                }}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img, idx) => (
              <div
                key={img.id}
                className="relative aspect-square rounded-2xl overflow-hidden group cursor-zoom-in"
                style={{
                  boxShadow: '0 4px 16px -4px rgba(0,0,0,0.1)',
                  transition: 'transform 0.4s cubic-bezier(0.23,1,0.32,1), box-shadow 0.4s ease',
                  animationDelay: `${idx * 0.05}s`,
                }}
              >
                <img
                  src={img.imageUrl}
                  alt={img.caption || "Gallery image"}
                  className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent
                                opacity-0 group-hover:opacity-100 transition-opacity duration-350
                                flex flex-col justify-end p-3">
                  {img.caption && (
                    <p className="text-white text-xs font-medium leading-tight line-clamp-2">
                      {img.caption}
                    </p>
                  )}
                  {/* View icon */}
                  <div className="mt-2 w-7 h-7 rounded-full bg-saffron/90 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
                    </svg>
                  </div>
                </div>

                {/* Top-right index badge */}
                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/40 backdrop-blur-sm
                                flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-[10px] font-bold">{idx + 1}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
