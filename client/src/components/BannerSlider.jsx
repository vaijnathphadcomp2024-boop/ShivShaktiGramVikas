import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade, Navigation } from 'swiper/modules';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

const PAGE_BANNERS = {
  home: [
    'https://images.unsplash.com/photo-1593113565214-8745970c66db?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80'
  ],
  ambulance: [
    'https://images.unsplash.com/photo-1587370560942-ad2a04eabb6d?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1538100865584-c68d3aeb1a6b?auto=format&fit=crop&q=80'
  ],
  social: [
    'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80'
  ],
  readindia: [
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80'
  ],
  preschool: [
    'https://images.unsplash.com/photo-1587691592099-24045742c181?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80'
  ],
  safety: [
    'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80'
  ]
};

export default function BannerSlider({ pageId }) {
  const [dynamicImages, setDynamicImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const q = query(collection(db, 'banners'), where("pageId", "==", pageId));
        const snap = await getDocs(q);
        if (!snap.empty) {
          const fetchedBanners = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          fetchedBanners.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setDynamicImages(fetchedBanners.map(b => b.imageUrl));
        }
      } catch (error) {
        console.error("Error fetching dynamic banners:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, [pageId]);

  const defaultImages = PAGE_BANNERS[pageId] || PAGE_BANNERS['home'];
  const images = dynamicImages.length > 0 ? dynamicImages : defaultImages;

  /* ── Skeleton loader ── */
  if (loading) {
    return (
      <div className="w-full h-[260px] md:h-[420px] lg:h-[520px] relative overflow-hidden bg-gray-100">
        <div className="absolute inset-0 skeleton" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-saffron border-t-transparent rounded-full animate-spin opacity-60" />
        </div>
      </div>
    );
  }

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full relative overflow-hidden" style={{ boxShadow: '0 4px 32px -8px rgba(26,60,94,0.15)' }}>
      <Swiper
        modules={[Autoplay, Pagination, EffectFade, Navigation]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1000}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active',
        }}
        navigation={true}
        loop={true}
        className="w-full h-[240px] sm:h-[350px] md:h-[450px] lg:h-[550px]"
      >
        {images.map((imgUrl, index) => (
          <SwiperSlide key={index} className="bg-gray-900">
            <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
              {/* Blurred backdrop image to fill any aspect ratio gaps gracefully */}
              <img
                src={imgUrl}
                alt=""
                className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-110 pointer-events-none"
                aria-hidden="true"
              />
              
              {/* The full banner image shown without cropping */}
              <img
                src={imgUrl}
                alt={`${pageId} banner ${index + 1}`}
                className="relative z-10 w-full h-full object-contain"
                loading={index === 0 ? "eager" : "lazy"}
              />
              
              {/* Gradient overlays for polish & depth */}
              <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 z-20 bg-gradient-to-r from-black/10 via-transparent to-transparent pointer-events-none" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
