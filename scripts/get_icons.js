const https = require('https');
const fs = require('fs');
const path = require('path');

const icons = {
  gmail: { slug: 'gmail', color: '#EA4335' },
  whatsapp: { slug: 'whatsapp', color: '#25D366' },
  slack: { slug: 'slack', color: '#4A154B' },
  chrome: { slug: 'googlechrome', color: '#4285F4' },
  postgresql: { slug: 'postgresql', color: '#4169E1' },
  openai: { slug: 'openai', color: '#10A37F' },
  anthropic: { slug: 'anthropic', color: '#D97757' },
  gemini: { slug: 'googlegemini', color: '#8E75FF' },
  notion: { slug: 'notion', color: '#000000' },
  confluence: { slug: 'confluence', color: '#172B4D' },
  zapier: { slug: 'zapier', color: '#FF4A00' },
  airtable: { slug: 'airtable', color: '#18BFFF' },
  postmark: { slug: 'postmark', color: '#FFDE00' },
  livechat: { slug: 'livechat', color: '#FF4800' },
};

function fetchSvg(slug) {
  return new Promise((resolve, reject) => {
    https.get('https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/' + slug + '.svg', res => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        const match = data.match(/<path d="([^"]+)"/);
        if (match) {
          resolve(match[1]);
        } else {
          reject(new Error('no path found in ' + slug));
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  const result = {};
  for (const [key, info] of Object.entries(icons)) {
    try {
      const p = await fetchSvg(info.slug);
      result[key] = { path: p, color: info.color };
      console.log('Fetched:', key);
    } catch (e) {
      console.error('Failed:', key, e.message);
    }
  }
  const outDir = path.join(__dirname, '..', 'client', 'src', 'components', 'icons');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  fs.writeFileSync(path.join(outDir, 'brandSvgData.json'), JSON.stringify(result, null, 2));
  console.log('Successfully wrote brandSvgData.json');
}

run();
