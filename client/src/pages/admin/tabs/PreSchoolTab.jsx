import GalleryAdmin from './GalleryAdmin';
import BannerAdmin from './BannerAdmin';

export default function PreSchoolTab() { 
  return (
    <div className="space-y-12">
      <BannerAdmin pageId="preschool" title="Pre School - Photo Slider" />
      <GalleryAdmin pageId="preschool" title="Pre School - Photo Gallery" />
    </div>
  ); 
}
