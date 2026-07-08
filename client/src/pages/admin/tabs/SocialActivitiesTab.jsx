import GalleryAdmin from './GalleryAdmin';
import BannerAdmin from './BannerAdmin';
import SocialActivitiesAdmin from './SocialActivitiesAdmin';

export default function SocialActivitiesTab() {
  return (
    <div className="space-y-12">
      <BannerAdmin pageId="social" title="Social Activities - Photo Slider" />
      <SocialActivitiesAdmin />
      <GalleryAdmin pageId="social" title="Social Activities - Photo Gallery" />
    </div>
  );
}
