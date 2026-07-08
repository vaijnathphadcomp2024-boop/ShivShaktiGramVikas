import GalleryAdmin from './GalleryAdmin';
import BannerAdmin from './BannerAdmin';
import SafetyCollegeAdmin from './SafetyCollegeAdmin';

export default function SafetyCollegeTab() {
  return (
    <div className="space-y-12">
      <BannerAdmin pageId="safetycollege" title="Safety College - Photo Slider" />
      <SafetyCollegeAdmin />
      <GalleryAdmin pageId="safetycollege" title="Safety College - Photo Gallery" />
    </div>
  );
}
