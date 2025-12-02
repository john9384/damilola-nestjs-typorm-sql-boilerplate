import 'reflect-metadata';
import 'dotenv/config';
import { DataSource } from 'typeorm';

// Read from process.env directly to avoid Nest dependencies during CLI
const sslMode = (process.env.POSTGRES_SSLMODE || 'disable').toLowerCase();
const sslRejectRaw = process.env.POSTGRES_SSL_REJECT_UNAUTHORIZED;
const sslReject =
  typeof sslRejectRaw === 'string' ? sslRejectRaw.toLowerCase() : undefined;
const rejectUnauthorized = sslReject === 'true';
const ca = process.env.POSTGRES_SSL_CA;
const cert = process.env.POSTGRES_SSL_CERT;
const key = process.env.POSTGRES_SSL_KEY;

let ssl: any = false;
if (sslMode === 'require' || sslMode === 'prefer') {
  ssl = { rejectUnauthorized: false };
} else if (sslMode === 'verify-ca' || sslMode === 'verify-full') {
  ssl = { rejectUnauthorized: rejectUnauthorized ?? true } as any;
  if (ca) (ssl as any).ca = ca;
  if (cert) (ssl as any).cert = cert;
  if (key) (ssl as any).key = key;
}

const entities = [__dirname + '/src/entities/*.entity{.ts,.js}'];
const migrations = [
  __dirname + '/src/infrastructure/database/migrations/*-*.{ts,js}',
];

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT ? Number(process.env.POSTGRES_PORT) : 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities,
  subscribers: [],
  migrations,
  migrationsTableName: 'migrations',
  logging: ['error', 'warn', 'schema'],
  ssl: ssl as any,
});
