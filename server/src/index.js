import 'dotenv/config';
import { createApp } from './app.js';
import { env } from './config/env.js';
import { pool } from './database/connection.js';
import { ensureAdmin } from './database/seedAdmin.js';
import { seedDemoData } from './database/seedDemoData.js';

async function start() {
  await pool.query('SELECT 1');
  await ensureAdmin();
  await seedDemoData();

  createApp().listen(env.port, () => {
    console.log(`UNIESBAM API rodando na porta ${env.port}`);
  });
}

start().catch((err) => {
  console.error('Falha ao iniciar API:', err);
  process.exit(1);
});
