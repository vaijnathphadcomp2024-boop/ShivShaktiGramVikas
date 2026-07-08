const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src/pages/SocialActivities.jsx');
let content = fs.readFileSync(file, 'utf8');

// 1. Add imports
if (!content.includes('import Gallery')) {
  content = content.replace(
    "import BannerSlider from '../components/BannerSlider';",
    "import BannerSlider from '../components/BannerSlider';\nimport Gallery from '../components/Gallery';"
  );
}

// 2. Replace Gallery section (from the section id to the Lightbox portal)
const regex = /<section id="sa-gallery"[\s\S]*?{lightboxItem && <Lightbox item={lightboxItem} onClose={[^{}]*} \/>}/;

if (regex.test(content)) {
  content = content.replace(regex, `<Gallery pageId="socialactivities" title="Photo Gallery" subtitle="A visual journey of our community outreach and social drives." />`);
  
  // also clean up the comment above it
  content = content.replace(/{\/\* .*7\. Photo Gallery.* \*\/}\s*/, "");
  
  fs.writeFileSync(file, content);
  console.log('SocialActivities patched');
} else {
  console.log('Regex did not match.');
}
