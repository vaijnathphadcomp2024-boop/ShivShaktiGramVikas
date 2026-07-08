import GalleryAdmin from './GalleryAdmin';
import BannerAdmin from './BannerAdmin';

export default function SocialActivitiesTab() {
  return (
    <div className="space-y-12">
      <BannerAdmin pageId="social" title="Social Activities - Photo Slider" />
      <GalleryAdmin pageId="socialactivities" title="Social Activities - Photo Gallery" />
    </div>
  );
}
