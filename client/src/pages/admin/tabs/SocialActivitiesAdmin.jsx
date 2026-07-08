import ObjectListAdmin from './ObjectListAdmin';

export default function SocialActivitiesAdmin() {
  return (
    <div className="space-y-12">
      <ObjectListAdmin
        title="Plantation Drives"
        collectionName="soc_plantations"
        fields={[
          { name: 'date', placeholder: 'Date (e.g. 05 June 2026)', required: true },
          { name: 'location', placeholder: 'Location (e.g. Village Name, Taluka)' },
          { name: 'trees', placeholder: 'Number of Trees (e.g. 500+)' },
          { name: 'species', placeholder: 'Species (comma separated)' },
          { name: 'emoji', placeholder: 'Emoji (e.g. 🌳)' },
          { name: 'bg', placeholder: 'Tailwind background gradient (e.g. from-green-400 to-emerald-600)' },
          { name: 'note', placeholder: 'Details/Note', type: 'textarea' },
        ]}
        renderItem={(item) => <div><strong>{item.date}</strong> - {item.location} ({item.trees} trees)</div>}
      />

      <ObjectListAdmin
        title="Varkari Activities"
        collectionName="soc_varkari"
        fields={[
          { name: 'title', placeholder: 'Title', required: true },
          { name: 'subtitle', placeholder: 'Subtitle' },
          { name: 'desc', placeholder: 'Description', type: 'textarea' },
          { name: 'emoji', placeholder: 'Emoji (e.g. 📖)' },
        ]}
        renderItem={(item) => <div><strong>{item.title}</strong> - {item.subtitle}</div>}
      />

      <ObjectListAdmin
        title="Saptah Schedule"
        collectionName="soc_saptah"
        fields={[
          { name: 'time', placeholder: 'Time (e.g. 6:00 - 9:00 AM)', required: true },
          { name: 'activity', placeholder: 'Activity (e.g. Bhajan & Dindi)', required: true },
          { name: 'desc', placeholder: 'Description', type: 'textarea' },
          { name: 'emoji', placeholder: 'Emoji (e.g. 📿)' },
        ]}
        renderItem={(item) => <div><strong>{item.time}</strong> - {item.activity}</div>}
      />

      <ObjectListAdmin
        title="Other Programs"
        collectionName="soc_programs"
        fields={[
          { name: 'title', placeholder: 'Title (e.g. Free Health Camp)', required: true },
          { name: 'desc', placeholder: 'Description', type: 'textarea' },
          { name: 'emoji', placeholder: 'Emoji (e.g. 🏥)' },
          { name: 'color', placeholder: 'Tailwind gradient & border (e.g. from-blue-50 to-sky-100 border-blue-200)' },
          { name: 'dot', placeholder: 'Tailwind dot color (e.g. bg-navy)' },
        ]}
        renderItem={(item) => <div><strong>{item.title}</strong></div>}
      />

      <ObjectListAdmin
        title="Impact Statistics"
        collectionName="soc_stats"
        fields={[
          { name: 'num', placeholder: 'Number (e.g. 5000+)', required: true },
          { name: 'label', placeholder: 'Label (e.g. Trees Planted)', required: true },
          { name: 'emoji', placeholder: 'Emoji (e.g. 🌳)' },
        ]}
        renderItem={(item) => <div><strong>{item.num}</strong> {item.label}</div>}
      />
    </div>
  );
}
