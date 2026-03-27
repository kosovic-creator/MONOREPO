// scripts/copy-prisma-schema.js
const fs = require('fs');
const path = require('path');

const src = path.resolve(__dirname, '../packages/shared/prisma/schema.prisma');
const dest = path.resolve(__dirname, '../apps/admin/prisma/schema.prisma');

fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.copyFileSync(src, dest);
console.log('Prisma schema copied to admin app.');
