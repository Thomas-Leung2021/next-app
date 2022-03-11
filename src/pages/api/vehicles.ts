import { NextApiRequest, NextApiResponse } from 'next';
import sqlite from 'sqlite';
import { authenticated } from './people';

export default authenticated(async function getAllVehicles(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.status(500).json({ message: 'sorry we only support GET' });
  }
  const db = await sqlite.open('database.sqlite');
  const vehicles = await db.all('SELECT * FROM vehicle');
  res.json(vehicles);
});
