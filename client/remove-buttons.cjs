const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, regex, replacement) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(regex, replacement);
    fs.writeFileSync(filePath, content, 'utf8');
}

// 1. SocialActivities.jsx
const socialPath = path.join(__dirname, 'src', 'pages', 'SocialActivities.jsx');
replaceInFile(
    socialPath,
    /<a href="#volunteer-form"[\s\S]*?Volunteer With Us[^<]*<\/a>/g,
    ''
);
replaceInFile(
    socialPath,
    /{\/\* Register CTA \*\/}[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/g,
    '</div>\n          </div>\n        </div>'
);

// 2. Ambulance.jsx
const ambPath = path.join(__dirname, 'src', 'pages', 'Ambulance.jsx');
replaceInFile(
    ambPath,
    /<a\s+href="#booking-form"[\s\S]*?Request Online\s*<\/a>/g,
    ''
);

console.log("Replacements complete.");
