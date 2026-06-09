import pg from 'pg';
import { env } from '../config/env.js';

const { Pool } = pg;

// CONEXAO BACKEND -> BANCO DE DADOS
// Todos os controllers/repositories usam este pool para consultar o PostgreSQL.
export const pool = new Pool({
  connectionString: env.databaseUrl
});

export async function query(sql, params = []) {
  const result = await pool.query(sql, params);
  return result;
}
