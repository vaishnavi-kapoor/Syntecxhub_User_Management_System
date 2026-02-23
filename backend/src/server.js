import { createApp } from './app.js';
import { connectDatabase } from './config/db.js';
import { env } from './config/env.js';

const startServer = async () => {
  await connectDatabase();

  const app = createApp();
  app.listen(env.port, () => {
    console.log(`[server] Backend running on http://localhost:${env.port}`);
  });
};

startServer().catch((error) => {
  console.error('[server] Failed to start', error);
  process.exit(1);
});
