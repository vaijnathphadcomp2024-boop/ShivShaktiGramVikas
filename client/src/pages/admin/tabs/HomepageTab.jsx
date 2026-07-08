import BannerAdmin from './BannerAdmin';
import GalleryAdmin from './GalleryAdmin';
import ImpactAdmin from './ImpactAdmin';

export default function HomepageTab() {
  return (
    <div className="space-y-12">
      <BannerAdmin pageId="home" title="Homepage - Photo Slider" />
      <ImpactAdmin />
      <GalleryAdmin pageId="home" title="Homepage - Photo Gallery" />
    </div>
  );
}
