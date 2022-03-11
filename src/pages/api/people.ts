import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import sqlite from 'sqlite';
import { verify } from 'jsonwebtoken';
import { secret } from '../../../api/secret';

// Should be extracted to a separate file
export const authenticated =
  (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    verify(req.cookies.authToken!, secret, async function (err, decoded) {
      if (!err && decoded) {
        return await fn(req, res);
      }
      res.status(401).json({ message: 'Unauthorized' });
    });
  };

export default authenticated(async function getPeople(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await sqlite.open('database.sqlite');
  const people = await db.all('SELECT id, email, name FROM person');
  res.json(people);
});
