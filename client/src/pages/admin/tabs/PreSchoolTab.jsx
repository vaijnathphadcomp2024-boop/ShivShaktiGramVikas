import GalleryAdmin from './GalleryAdmin';
import BannerAdmin from './BannerAdmin';
import ObjectListAdmin from './ObjectListAdmin';

export default function PreSchoolTab() { 
  return (
    <div className="space-y-12">
      <BannerAdmin pageId="preschool" title="Pre School - Photo Slider" />
      
      <ObjectListAdmin 
        title="Pre School - Daily Schedule" 
        collectionName="preschool_schedule"
        fields={[
          { name: 'time', placeholder: 'Time (e.g. 9:00)', required: true },
          { name: 'act', placeholder: 'Activity (e.g. Morning Assembly)', required: true }
        ]}
        renderItem={(item) => (
          <div>
            <p className="font-bold text-navy">{item.time}</p>
            <p className="text-sm text-gray-600">{item.act}</p>
          </div>
        )}
      />

      <GalleryAdmin pageId="preschool" title="Pre School - Photo Gallery" />
    </div>
  ); 
}
