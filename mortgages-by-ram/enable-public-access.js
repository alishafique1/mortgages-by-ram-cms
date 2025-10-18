#!/usr/bin/env node

/**
 * Temporarily enable public page creation to run setup scripts
 */

const sqlite3 = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'server', '.tmp', 'data.db');

try {
  console.log('Opening database...');
  const db = sqlite3(dbPath);

  // Find the public role
  const publicRole = db.prepare('SELECT * FROM up_roles WHERE type = ?').get('public');

  if (!publicRole) {
    console.error('Public role not found');
    process.exit(1);
  }

  console.log('Found public role:', publicRole.name);

  // Find page permissions
  const pagePermissions = db.prepare(`
    SELECT * FROM up_permissions
    WHERE role = ? AND action LIKE '%page%'
  `).all(publicRole.id);

  console.log('Current page permissions:', pagePermissions.length);

  // Enable create permission for pages
  const updateStmt = db.prepare(`
    UPDATE up_permissions
    SET enabled = 1
    WHERE role = ? AND action LIKE '%api::page.page.create%'
  `);

  const result = updateStmt.run(publicRole.id);

  console.log('✅ Public page creation enabled!');
  console.log('Changes:', result.changes);

  db.close();

  console.log('\n⚠️  Remember to disable this after creating pages!');
  console.log('Run: node disable-public-access.js\n');

} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
