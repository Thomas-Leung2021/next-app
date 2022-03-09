import { NextApiRequest, NextApiResponse } from 'next'
import sqlite from 'sqlite';

export default async function getAllVehicles(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.status(500).json({ message: 'sorry we only support GET' })
  }
  const db = await sqlite.open('database.sqlite');
  const vehicle = await db.all('SELECT * FROM vehicle');
  res.json(vehicle)
}