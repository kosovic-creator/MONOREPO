// scripts/copy-prisma-schema-web.js
const fs = require('fs');
const path = require('path');

const src = path.resolve(__dirname, '../packages/shared/prisma/schema.prisma');
const dest = path.resolve(__dirname, '../apps/web/prisma/schema.prisma');

fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.copyFileSync(src, dest);
console.log('Prisma schema copied to web app.');
