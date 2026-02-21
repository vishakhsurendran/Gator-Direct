import pg from 'pg';
const conn = process.env.DATABASE_URL;

if (!conn) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const pool = new pg.Pool({ connectionString: conn });
export default pool;
