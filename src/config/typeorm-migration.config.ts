import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';

const envFile = process.env.NODE_ENV ? '.env' : '.env.local';

config({ path: join(__dirname, '../..', envFile) });

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@localhost:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}?schema=public`,
  migrations: [join(__dirname, '../migration/*.{ts,js}')],
  synchronize: false,
  migrationsTableName: 'migrations',
});
// npm run typeorm -- query "DROP SCHEMA public CASCADE; CREATE SCHEMA public; GRANT USAGE ON SCHEMA public to PUBLIC; GRANT CREATE ON SCHEMA public to PUBLIC; COMMENT ON SCHEMA public IS 'standard public schema';"
