import { Router } from 'express';
import pool from '../db/pool';
const r = Router();

r.post('/building', async (req, res) => {
  try {
    const { name, footprint } = req.body;
    if (!name || !footprint) return res.status(400).json({ error: 'name and footprint required' });
    const sql = `INSERT INTO buildings (name, footprint) VALUES ($1, ST_SetSRID(ST_GeomFromGeoJSON($2), 4326)) RETURNING id`;
    const { rows } = await pool.query(sql, [name, JSON.stringify(footprint)]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('POST /import/building error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

export default r;
