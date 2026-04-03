import { Router } from 'express';
import pool from '../db/pool';
const r = Router();

r.get('/', async (req, res) => {
  try {
    const q = `SELECT id, name, ST_AsGeoJSON(footprint) AS footprint FROM buildings`;
    const { rows } = await pool.query(q);

    const features = rows.map((row: any) => {
      const geom = row.footprint ? JSON.parse(row.footprint) : null;
      return {
        type: 'Feature',
        geometry: geom,
        properties: { id: row.id, name: row.name }
      };
    });

    res.json({ type: 'FeatureCollection', features });
  } catch (err) {
    console.error('GET /buildings error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

export default r;
