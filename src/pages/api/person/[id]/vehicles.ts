import { NextApiRequest, NextApiResponse } from 'next'
import sqlite from 'sqlite'

export default async function getAllVehiclesByPersonId(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await sqlite.open('database.sqlite'); // Note: should extract this logic
  const allVehicles = await db.all('SELECT * FROM vehicle WHERE ownerId = ?', [req.query.id]);
  res.json(allVehicles)
}
