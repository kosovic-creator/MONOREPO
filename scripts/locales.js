// Simple script to copy shared/locale to each app before build/dev
const fs = require('fs');
const path = require('path');

const apps = ['web', 'admin'];
const src = path.join(__dirname, '../packages/shared/locale');

apps.forEach(app => {
  const dest = path.join(__dirname, `../apps/${app}/public/locale`);
  if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true, force: true });
  }
  fs.cpSync(src, dest, { recursive: true });
  console.log(`Copied locale to apps/${app}/public/locale`);
});
