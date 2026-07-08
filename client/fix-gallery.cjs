const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src/pages/ReadIndia.jsx');
let content = fs.readFileSync(file, 'utf8');

// The broken section starts right after </section> of the previous block
// and ends right before {/* ── 6. Centers & Timings ────────────────────────────────────────────── */}

const regex = /<\/section>\s*<path strokeLinecap="round"[\s\S]*?{lightboxItem && <Lightbox item={lightboxItem} onClose={[^{}]*} \/>}/;

if (regex.test(content)) {
  content = content.replace(regex, `</section>
  
      <Gallery pageId="readindia" title="Our Centers in Action" subtitle="Glimpses of learning, engagement and community building across Read India." />
  `);
  fs.writeFileSync(file, content);
  console.log('Fixed successfully!');
} else {
  console.log('Regex did not match.');
}
