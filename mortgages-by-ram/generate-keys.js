#!/usr/bin/env node

/**
 * Generate secure random keys for Strapi deployment
 * Run with: node generate-keys.js
 */

const crypto = require('crypto');

console.log('\n==============================================');
console.log('🔑 Strapi Security Keys Generator');
console.log('==============================================\n');

console.log('Copy these keys to your server/.env file:\n');

// Generate 5 random keys
const keys = [];
for (let i = 0; i < 5; i++) {
  keys.push(crypto.randomBytes(32).toString('base64'));
}

console.log(`APP_KEYS=${keys[0]},${keys[1]},${keys[2]},${keys[3]}`);
console.log(`API_TOKEN_SALT=${keys[4]}`);
console.log(`ADMIN_JWT_SECRET=${keys[0]}`);
console.log(`TRANSFER_TOKEN_SALT=${keys[1]}`);
console.log(`JWT_SECRET=${keys[2]}`);

console.log('\n==============================================');
console.log('⚠️  IMPORTANT: Keep these keys secure!');
console.log('==============================================\n');

