import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const requiredFiles = [
  'src/app.js',
  'src/server.js',
  'src/config/db.js',
  'src/config/env.js',
  'src/models/User.js',
  'src/routes/auth.routes.js',
  'src/routes/user.routes.js',
  'src/controllers/auth.controller.js',
  'src/controllers/user.controller.js',
  'src/services/auth.service.js',
  'src/services/user.service.js',
  'src/middleware/auth.middleware.js',
  'src/middleware/error.middleware.js',
];

test('backend professional layered structure exists', () => {
  for (const file of requiredFiles) {
    assert.equal(fs.existsSync(new URL(`../${file}`, import.meta.url)), true, `${file} should exist`);
  }
});
