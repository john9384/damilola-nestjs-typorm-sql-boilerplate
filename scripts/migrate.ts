import 'reflect-metadata';
import 'dotenv/config';
import dataSource from '../typeorm.config';

async function run() {
  try {
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }
    await dataSource.runMigrations();
    await dataSource.destroy();
    // eslint-disable-next-line no-console
    console.log('Migrations executed successfully');
    process.exit(0);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Migration run failed:', err);
    process.exit(1);
  }
}

void run();
