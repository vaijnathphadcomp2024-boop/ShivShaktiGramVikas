import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade, Navigation } from 'swiper/modules';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

// A mapping of page IDs to their respective banner images.
// You can change these to point to local assets or any external URL.
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

  if (loading || !images || images.length === 0) return (
    <div className="w-full h-[300px] md:h-[450px] lg:h-[550px] bg-gray-100 animate-pulse"></div>
  );

  return (
    <div className="w-full relative bg-gray-50 overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade, Navigation]}
        effect="fade"
        speed={1000}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet !bg-white/50 !w-3 !h-3 !opacity-100 hover:!bg-white transition-colors',
          bulletActiveClass: '!bg-saffron !w-8 !rounded-full',
        }}
        navigation={true}
        loop={true}
        className="w-full h-[300px] md:h-[450px] lg:h-[550px] [&_.swiper-button-next]:text-white [&_.swiper-button-prev]:text-white [&_.swiper-button-next]:drop-shadow-lg [&_.swiper-button-prev]:drop-shadow-lg"
      >
        {images.map((imgUrl, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <img
                src={imgUrl}
                alt={`${pageId} banner ${index + 1}`}
                className="w-full h-full object-contain bg-black/5"
                loading={index === 0 ? "eager" : "lazy"}
              />
              {/* Subtle dark gradient overlay for better text readability if text is added later */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
