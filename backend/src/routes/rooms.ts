import { Router } from 'express';
import pool from '../db/pool';

const r = Router();

// GET /rooms?building_id=1&q=lab
r.get('/', async (req, res) => {
  const { building_id, q } = req.query;
  try {
    let sql = `
      SELECT
        r.id, r.room_number, r.name,
        r.floor_level, r.plan_x, r.plan_y,
        r.building_id,
        b.name AS building_name
      FROM rooms r
      JOIN buildings b ON r.building_id = b.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (building_id) {
      params.push(building_id);
      sql += ` AND r.building_id = $${params.length}`;
    }

    if (q) {
      params.push(`%${q}%`);
      sql += ` AND (r.room_number ILIKE $${params.length} OR r.name ILIKE $${params.length})`;
    }

    sql += ` ORDER BY r.floor_level, r.room_number`;
    const { rows } = await pool.query(sql, params);
    res.json(rows);
  } catch (err) {
    console.error('GET /rooms error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /rooms/:id
r.get('/:id', async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT r.*, b.name AS building_name
       FROM rooms r JOIN buildings b ON r.building_id = b.id
       WHERE r.id = $1`,
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Room not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error('GET /rooms/:id error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

export default r;
