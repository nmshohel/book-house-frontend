import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { Server } from 'http';
// import { logger, errorLogger } from './shared/logger';
// import { logger, errorLogger } from './shared/logger'

process.on('uncaughtException', error => {
  console.log(error);
  process.exit(1);
});
let server: Server;

async function boostrap() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('Database Connection Successfully');
    server = app.listen(config.port, () => {
      console.log(`Application app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log('Database connection failed', err);
  }
  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

boostrap();

process.on('SIGTERM', () => {
  console.log('Sigterm Received');
  if (server) {
    server.close();
  }
});
