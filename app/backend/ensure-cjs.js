#!/usr/bin/env node
/**
 * Ensures dist/backend/package.json exists with {"type":"commonjs"}
 * This is needed because the root package.json has "type":"module"
 * but NestJS compiles to CommonJS.
 */
const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, '..', '..', 'dist', 'backend');
const pkgPath = path.join(distPath, 'package.json');
const pkgContent = JSON.stringify({ type: 'commonjs' }, null, 2);

// Create dist/backend if it doesn't exist
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath, { recursive: true });
}

// Write package.json
fs.writeFileSync(pkgPath, pkgContent);
console.log('✓ Created dist/backend/package.json with type:commonjs');
