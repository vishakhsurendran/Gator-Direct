import { Router } from 'express';
import pool from '../db/pool';
const r = Router();

// placeholder: expects node ids or lat/lng; returns an array of coords
r.post('/route', async (req, res) => {
  // implement with pgRouting later
  res.json({ route: [] });
});

export default r;
