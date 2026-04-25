const { Pool } = require('pg');
const dns = require('dns');
require('dotenv').config();
 
dns.setDefaultResultOrder('ipv4first');
 
const pool = new Pool({
  connectionString: `postgresql://postgres.pxryadzmosanzbapbgns:${process.env.DB_PASSWORD}@aws-1-us-east-2.pooler.supabase.com:5432/postgres`,
  ssl: { rejectUnauthorized: false }
});
 
pool.on('connect', () => {
  console.log('✅ Conexión a base de datos establecida');
});
 
pool.on('error', (err) => {
  console.error('❌ Error en pool de BD:', err.message);
});
 
module.exports = pool;
 