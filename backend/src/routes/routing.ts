import { Router } from 'express';
import pool from '../db/pool';

const r = Router();

r.post('/route', async (req, res) => {
  res.json({ route: [] });
});

// POST /routing/indoor  { building_id, room_id }
// Returns step-by-step indoor directions and the room's floor-plan position
r.post('/indoor', async (req, res) => {
  const { building_id, room_id } = req.body;

  if (!room_id) {
    return res.status(400).json({ error: 'room_id is required' });
  }

  try {
    const result = await pool.query(
      `SELECT r.*, b.name AS building_name
       FROM rooms r
       JOIN buildings b ON r.building_id = b.id
       WHERE r.id = $1`,
      [room_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Room not found' });
    }

    const room = result.rows[0];
    const steps: string[] = [];

    steps.push(`Enter ${room.building_name} through the main entrance on the ground floor.`);

    if (room.floor_level === 1) {
      steps.push(`Proceed straight down the main hallway.`);
    } else {
      steps.push(`Take the elevator or stairwell to floor ${room.floor_level}.`);
      steps.push(`Exit onto floor ${room.floor_level} and turn into the main hallway.`);
    }

    // Rough position description based on plan_x
    const position = room.plan_x < 0.33
      ? 'near the beginning of the hallway on your left'
      : room.plan_x < 0.66
      ? 'midway down the hallway'
      : 'toward the far end of the hallway on your right';

    steps.push(`Room ${room.room_number} is ${position}.`);

    if (room.name) {
      steps.push(`You have arrived at ${room.name} (Room ${room.room_number}).`);
    } else {
      steps.push(`You have arrived at Room ${room.room_number}.`);
    }

    res.json({
      room,
      steps,
      floor_level: room.floor_level,
      position: { x: room.plan_x, y: room.plan_y }
    });
  } catch (err) {
    console.error('POST /routing/indoor error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

export default r;
