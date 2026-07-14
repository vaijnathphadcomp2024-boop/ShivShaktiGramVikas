import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import BannerSlider from '../components/BannerSlider';
import Gallery from '../components/Gallery';
// ─── Data ─────────────────────────────────────────────────────────────────────

const AGE_GROUPS = [
  {
    range: '2 – 3 yrs',
    label: 'Toddler Group',
    emoji: '🌱',
    color: 'from-orange-50 to-amber-100 border-orange-200',
    dot: 'bg-saffron',
    points: [
      'Sensory play & exploration',
      'Basic language development',
      'Social interaction with peers',
      'Motor skill activities',
    ],
  },
  {
    range: '3 – 4 yrs',
    label: 'Nursery',
    emoji: '🌿',
    color: 'from-green-50 to-emerald-100 border-green-200',
    dot: 'bg-forest',
    points: [
      'Introduction to alphabets & numbers',
      'Creative arts & craft',
      'Circle time & storytelling',
      'Outdoor play & movement',
    ],
  },
  {
    range: '4 – 5 yrs',
    label: 'Junior KG',
    emoji: '🌳',
    color: 'from-blue-50 to-sky-100 border-blue-200',
    dot: 'bg-navy',
    points: [
      'Pre-reading & pre-writing skills',
      'Number concepts & patterns',
      'Science exploration activities',
      'Group projects & presentations',
    ],
  },
  {
    range: '5 – 6 yrs',
    label: 'Senior KG',
    emoji: '🎓',
    color: 'from-pink-50 to-rose-100 border-pink-200',
    dot: 'bg-magenta',
    points: [
      'Reading readiness & writing',
      'Basic mathematics & logic',
      'Environmental awareness',
      'School readiness programme',
    ],
  },
];

const CURRICULUM = [
  { emoji: '📖', label: 'Language & Literacy',    desc: 'Marathi, Hindi & English through stories, rhymes and conversations.' },
  { emoji: '🔢', label: 'Numeracy & Logic',        desc: 'Counting, shapes, patterns and early problem-solving games.' },
  { emoji: '🎨', label: 'Arts & Creativity',       desc: 'Painting, craft, music and free expression every day.' },
  { emoji: '🌿', label: 'Nature & Science',         desc: 'Hands-on experiments, gardening and outdoor exploration.' },
  { emoji: '🤸', label: 'Physical Education',       desc: 'Yoga, dance, games and gross motor development activities.' },
  { emoji: '🤝', label: 'Social & Emotional',       desc: 'Team activities that build empathy, sharing and confidence.' },
  { emoji: '💻', label: 'Digital Literacy (Sr. KG)', desc: 'Basic device interaction and educational software for 5–6 year olds.' },
  { emoji: '🌍', label: 'Cultural Values',          desc: 'Festivals, folk stories and community values woven into lessons.' },
];

// ─── Facilities Removed ────────────────────────────────────────────────────────

const ADMISSION_STEPS = [
  { step: '01', title: 'Enquire',         desc: 'Fill in the enquiry form below or call us directly. Our coordinator will get in touch within 24 hours.' },
  { step: '02', title: 'Visit the School', desc: 'Schedule a school tour to see the facilities and meet the teachers in person.' },
  { step: '03', title: 'Submit Documents', desc: 'Provide the child\'s birth certificate, parent ID proof, and 2 passport-size photos.' },
  { step: '04', title: 'Interaction',     desc: 'A brief child-friendly interaction session to understand the child\'s learning readiness.' },
  { step: '05', title: 'Fee Payment',     desc: 'Pay the admission fee and first term fees. Flexible instalment options available.' },
  { step: '06', title: 'Welcome!',        desc: "Receive the school kit, timetable and parent handbook. Your child's journey begins!" },
];

// NOTE: No static gallery items. ──────────────────────────────────────────────────────────────────

// ─── Helpers ──────────────────────────────────────────────────────────────────

function SectionHeading({ tag, title, subtitle, light = false }) {
  return (
    <div className="text-center mb-12">
      {tag && (
        <span className={`inline-block text-xs font-bold uppercase tracking-widest mb-2 ${light ? 'text-orange-200' : 'text-saffron'}`}>
          {tag}
        </span>
      )}
      <h2 className={`text-3xl sm:text-4xl font-extrabold mb-3 ${light ? 'text-white' : 'text-navy'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`max-w-xl mx-auto text-sm sm:text-base ${light ? 'text-orange-100' : 'text-gray-500'}`}>
          {subtitle}
        </p>
      )}
      <div className="mt-4 mx-auto w-20 h-1 rounded-full bg-saffron" />
    </div>
  );
}

// ─── PreSchool Page ───────────────────────────────────────────────────────────
export default function PreSchool() {
  const [schedule, setSchedule] = useState([
    { time: '9:00', act: 'Morning Assembly' },
    { time: '9:30', act: 'Circle Time' },
    { time: '10:00', act: 'Activity / Lesson' },
    { time: '11:00', act: 'Snack Break' },
    { time: '11:20', act: 'Outdoor Play' },
    { time: '12:00', act: 'Creative Arts' },
    { time: '12:45', act: 'Story / Music' },
    { time: '1:15', act: 'Lunch & Rest' },
    { time: '2:00', act: 'Dismissal' },
  ]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const snap = await getDocs(collection(db, 'preschool_schedule'));
        if (!snap.empty) {
          const fetched = snap.docs.map(d => d.data());
          fetched.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
          setSchedule(fetched);
        }
      } catch (e) {
        console.error("Error fetching schedule", e);
      }
    };
    fetchSchedule();
  }, []);

  return (
    <main>

      {/* ── 1. Hero ───────────────────────────────────────────────────────── */}
      <section
        id="preschool-hero"
        className="relative overflow-hidden hero-section bg-gradient-to-br from-saffron via-orange-500 to-amber-600 min-h-[80vh] flex items-center"
      >
        <div className="hero-watermark">
          <img src="/assets/logo.jpg" alt="" aria-hidden="true" />
        </div>
        {/* Decorative blobs */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-orange-800/20 blur-3xl pointer-events-none" />
        {/* Playful floating circles */}
        <div className="absolute top-10 left-10 w-14 h-14 rounded-full bg-white/10 animate-bounce" style={{ animationDuration: '3s' }} />
        <div className="absolute bottom-16 right-16 w-8 h-8 rounded-full bg-white/20 animate-bounce" style={{ animationDuration: '2.3s' }} />
        <div className="absolute top-1/3 right-1/4 w-5 h-5 rounded-full bg-white/15 animate-bounce" style={{ animationDuration: '1.9s' }} />

        <div className="relative z-10 animate-fadeInUp max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-white text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur border border-white/30 rounded-full px-4 py-1.5 text-sm mb-6">
            <span className="text-xl">🏫</span>
            Shivshakti GramVikas Pratishtan
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-5 drop-shadow-md">
            Pre School Programme
            <span className="block text-2xl sm:text-3xl font-semibold text-orange-100 mt-2">
              Nurturing Every Little Mind 🌱
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-orange-50 leading-relaxed mb-10">
            A joyful, safe and stimulating learning environment for children aged
            2 to 6 years — where curiosity is celebrated and every child thrives.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#ps-enquiry"
              className="px-8 py-3.5 rounded-full bg-white text-saffron font-bold shadow-lg hover:bg-orange-50 transition-all duration-200 hover:-translate-y-0.5"
            >
              Apply for Admission
            </a>
            <a
              href="#age-groups"
              className="px-8 py-3.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold transition-all duration-200 hover:-translate-y-0.5"
            >
              Explore Age Groups ↓
            </a>
          </div>

          {/* Quick stats */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { n: '2–6',   l: 'Age Group (yrs)' },
              { n: '200+',  l: 'Children Enrolled' },
              { n: '15+',   l: 'Years Experience' },
              { n: '100%',  l: 'Trained Teachers' },
            ].map(({ n, l }) => (
              <div key={l} className="bg-white/15 backdrop-blur rounded-2xl p-4 border border-white/20">
                <p className="text-2xl font-extrabold text-white">{n}</p>
                <p className="text-xs text-orange-100 mt-0.5">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BannerSlider pageId="preschool" />

      {/* ── 2. About / Philosophy ─────────────────────────────────────────── */}
      <section id="about-preschool" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            tag="Our Philosophy"
            title="About Our Pre School"
            subtitle="We believe the first six years shape a lifetime. Our approach is rooted in child-led, play-based learning."
          />

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Text */}
            <div className="space-y-5">
              {[
                {
                  icon: '🎯',
                  title: 'Child-Centred Learning',
                  body: 'We follow the child\'s pace and interest. Every activity is designed to spark curiosity rather than force knowledge.',
                },
                {
                  icon: '🤲',
                  title: 'Holistic Development',
                  body: 'Cognitive, emotional, social and physical growth are all given equal importance through our integrated curriculum.',
                },
                {
                  icon: '🌍',
                  title: 'Cultural Rootedness',
                  body: 'Children learn in Marathi-rich environments with respect for local culture, festivals, and community values.',
                },
                {
                  icon: '👨‍👩‍👧',
                  title: 'Parent Partnership',
                  body: 'We engage parents as active partners through regular updates, parent-teacher meetings and open classrooms.',
                },
              ].map(({ icon, title, body }) => (
                <div key={title} className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-md"
                       style={{ background: 'linear-gradient(135deg, #fffbeb, #fef3c7)', border: '1px solid #fde68a' }}>
                    {icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-navy mb-0.5">{title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Feature highlight card */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-saffron to-amber-600 p-8 text-white shadow-2xl">
              <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full bg-white/10 pointer-events-none" />
              <p className="text-5xl mb-4">🌟</p>
              <h3 className="text-2xl font-extrabold mb-3">Why Choose Us?</h3>
              <ul className="space-y-3">
                {[
                  'Government-approved curriculum',
                  'Qualified & caring teachers',
                  'Safe, child-friendly campus',
                  'Affordable fees with scholarships',
                  'Daily nutritious meal programme',
                  'CCTV-monitored premises',
                  'Regular health & dental check-ups',
                ].map((pt) => (
                  <li key={pt} className="flex items-center gap-2 text-sm text-orange-50">
                    <svg className="w-4 h-4 text-white shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Age Groups ─────────────────────────────────────────────────── */}
      <section id="age-groups" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            tag="Age Groups"
            title="Classes We Offer"
            subtitle="Structured learning experiences tailored to each developmental stage from 2 to 6 years."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {AGE_GROUPS.map(({ range, label, emoji, color, dot, points }) => (
              <div
                key={label}
                className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br ${color} p-6 flex flex-col gap-4
                            hover:shadow-2xl hover:-translate-y-2 transition-all duration-350 group cursor-default`}
              >
                {/* Subtle top decoration */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-saffron to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="text-4xl group-hover:scale-110 transition-transform duration-300">{emoji}</div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-0.5">{range}</p>
                  <h3 className="font-extrabold text-navy text-lg leading-tight">{label}</h3>
                </div>
                <ul className="space-y-2.5 flex-1">
                  {points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-xs text-gray-600 leading-relaxed">
                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${dot} shrink-0`} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Curriculum / Daily Activities ─────────────────────────────── */}
      <section id="curriculum" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            tag="What We Teach"
            title="Curriculum & Daily Activities"
            subtitle="A balanced daily schedule that blends structured learning with free, joyful play."
          />

          {/* Daily schedule strip */}
          <div className="mb-10 bg-gradient-to-r from-saffron to-amber-500 rounded-2xl p-5 sm:p-6 shadow-lg overflow-x-auto">
            <p className="text-white font-bold text-sm uppercase tracking-wide mb-4">Typical Day</p>
            <div className="flex gap-3 min-w-max">
              {schedule.map(({ time, act }, idx) => (
                <div key={idx} className="flex flex-col items-center bg-white/20 rounded-xl px-4 py-3 text-white min-w-[90px]">
                  <span className="text-xs font-bold text-orange-100">{time}</span>
                  <span className="text-xs text-center mt-1 leading-tight">{act}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Curriculum grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CURRICULUM.map(({ emoji, label, desc }) => (
              <div
                key={label}
                className="flex flex-col gap-3 bg-white border border-slate-100 rounded-2xl p-5
                           hover:shadow-xl hover:border-saffron/40 hover:-translate-y-1
                           transition-all duration-300 group cursor-default"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300 inline-block w-fit">{emoji}</span>
                <div>
                  <h4 className="font-extrabold text-navy text-sm mb-1">{label}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── 6. Admission Process & Fees ───────────────────────────────────── */}
      <section id="admission" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            tag="How to Join"
            title="Admission Process & Fees"
            subtitle="Simple, transparent and welcoming — enrolling your child takes just a few easy steps."
          />

          {/* Steps */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {ADMISSION_STEPS.map(({ step, title, desc }) => (
              <div
                key={step}
                className="relative bg-white border border-gray-100 rounded-2xl shadow-sm p-6
                           hover:shadow-xl hover:border-saffron/30 hover:-translate-y-1
                           transition-all duration-300 group overflow-hidden"
              >
                {/* Big number watermark with better color & sizing */}
                <span className="absolute -top-6 -right-6 text-9xl font-black text-orange-50/50 select-none
                                 group-hover:text-orange-100/60 group-hover:scale-105 transition-all duration-350">
                  {step}
                </span>
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-extrabold text-sm mb-4 shadow-md"
                       style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}>
                    {step}
                  </div>
                  <h3 className="font-bold text-navy text-base mb-2">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Download Fee Structure */}
          <div className="bg-white border border-slate-100 rounded-2xl p-8 text-center max-w-xl mx-auto mt-10
                          shadow-2xl shadow-navy/5 relative overflow-hidden group">
            {/* Background design accents */}
            <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-orange-50 group-hover:scale-110 transition-transform duration-300" />
            
            <div className="relative z-10">
              <h3 className="text-navy font-extrabold text-xl mb-3">Fee Structure</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-sm mx-auto">
                Download our complete fee structure for the current academic year, including details about instalment options and scholarships for BPL families.
              </p>
              <a href="#" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full
                                    bg-gradient-to-r from-saffron to-orange-500 hover:from-orange-500 hover:to-saffron
                                    text-white font-bold transition-all duration-200 shadow-lg shadow-orange-500/25
                                    hover:-translate-y-0.5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                </svg>
                Download Fee Structure
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Photo Gallery ──────────────────────────────────────────────── */}
      <Gallery pageId="preschool" title="Photo Gallery" subtitle="Glimpses of learning, laughter and growth from our classrooms and activities." />

    </main>
  );
}
