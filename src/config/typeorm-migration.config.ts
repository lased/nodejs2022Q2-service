import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';

const envFile = process.env.NODE_ENV ? '.env' : '.env.local';

config({ path: join(__dirname, '../..', envFile) });

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  migrations: [join(__dirname, '../migration/*.{ts,js}')],
  synchronize: false,
  migrationsTableName: 'migrations',
});
// npm run typeorm -- query "DROP SCHEMA public CASCADE; CREATE SCHEMA public; GRANT USAGE ON SCHEMA public to PUBLIC; GRANT CREATE ON SCHEMA public to PUBLIC; COMMENT ON SCHEMA public IS 'standard public schema';"
