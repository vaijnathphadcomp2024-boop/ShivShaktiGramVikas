const https = require('https');
const url = 'https://ik.imagekit.io/vy9vpqro7/shivshakti/galleries/safetycollege/2_DUvC0y9kI.jpeg';

https.get(url, (res) => {
  console.log('Status Code:', res.statusCode);
  if (res.statusCode >= 300 && res.statusCode < 400) {
    console.log('Redirect:', res.headers.location);
  }
}).on('error', (e) => {
  console.error(e);
});
