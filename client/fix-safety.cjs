const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src/pages/SafetyCollege.jsx');
let content = fs.readFileSync(file, 'utf8');

// 1. Add imports
content = content.replace(
  "import BannerSlider from '../components/BannerSlider';",
  "import BannerSlider from '../components/BannerSlider';\nimport { useState, useEffect } from 'react';\nimport { db } from '../firebase';\nimport { collection, getDocs } from 'firebase/firestore';\nimport Gallery from '../components/Gallery';"
);

// 2. Add state and useEffect inside the component
const componentStart = "export default function SafetyCollege() {";
const stateHook = `export default function SafetyCollege() {
  const [courses, setCourses] = useState([]);
  const [partners, setPartners] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cSnap = await getDocs(collection(db, 'safetyCourses'));
        setCourses(cSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        
        const pSnap = await getDocs(collection(db, 'safetyPartners'));
        setPartners(pSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);`;

content = content.replace(componentStart, stateHook);

// 3. Replace COURSES rendering
const coursesRegex = /{COURSES\.map\(\(\{\s*code,\s*name,\s*duration,\s*eligibility,\s*seats,\s*mode,\s*highlights\s*}\) => \([\s\S]*?\}\)\)}/;

if (coursesRegex.test(content)) {
  const replacement = `{courses.length === 0 ? <p className="text-gray-500 col-span-2 text-center">Courses will be updated soon.</p> : courses.map(({ id, code, name, duration, eligibility, seats, mode, highlights }) => (
              <div 
                key={id}
                className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-lg hover:border-cyan/30 transition-all duration-300 group flex flex-col"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-cyan/10 text-cyan flex items-center justify-center shrink-0">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                  </div>
                  <div>
                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold mb-2 group-hover:bg-cyan group-hover:text-white transition-colors">{code}</span>
                    <h3 className="font-bold text-navy text-xl sm:text-2xl leading-tight">{name}</h3>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div><p className="text-[10px] font-bold text-gray-400 uppercase">Duration</p><p className="text-sm font-semibold text-navy">{duration}</p></div>
                  <div><p className="text-[10px] font-bold text-gray-400 uppercase">Mode</p><p className="text-sm font-semibold text-cyan">{mode}</p></div>
                  <div><p className="text-[10px] font-bold text-gray-400 uppercase">Eligibility</p><p className="text-sm font-semibold text-navy truncate" title={eligibility}>{eligibility}</p></div>
                  <div><p className="text-[10px] font-bold text-gray-400 uppercase">Intake</p><p className="text-sm font-semibold text-navy">{seats} Seats</p></div>
                </div>

                <div className="flex-1 bg-gray-50 rounded-2xl p-5 border border-gray-100">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Key Subjects</p>
                  <ul className="space-y-2">
                    {highlights && highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-cyan mt-0.5">▪</span> {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}`;
  content = content.replace(coursesRegex, replacement);
}

// 4. Replace EMPLOYERS
const employersRegex = /{EMPLOYERS\.map\(\(name\) => \([\s\S]*?\}\)\)}/;
if (employersRegex.test(content)) {
  const empReplace = `{partners.map((p) => (
                <span key={p.id} className="px-4 py-2 bg-white/10 border border-white/15 rounded-xl text-white text-xs font-medium">
                  {p.name}
                </span>
              ))}`;
  content = content.replace(employersRegex, empReplace);
}

// 5. Append Gallery before </main>
const mainRegex = /<\/main>/;
if (mainRegex.test(content)) {
  content = content.replace(mainRegex, `
      <Gallery pageId="safetycollege" title="Photo Gallery" subtitle="A glimpse into our state-of-the-art facilities and student life." />
    </main>`);
}

fs.writeFileSync(file, content);
console.log('SafetyCollege patched');
