import { NextApiRequest, NextApiResponse } from 'next';
import sqlite from 'sqlite';
import { hash } from 'bcrypt';

async function hashAsync(password: string) {
  return new Promise((resolved, rejected) => {
    hash(password, 10, function (err, hash) {
      if (err || !hash) {
        rejected();
      } else {
        resolved(hash);
      }
    });
  });
}

// Example: http://localhost:3000/api/login (POST)
// {
//   "name": "test",
//   "email": "test@gmail.com",
//   "password": "1234"
// }
export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await sqlite.open('./database.sqlite');
  if (req.method === 'POST') {
    try {
      const hash = await hashAsync(req.body.password);
      // Should also do: check password length, validate email, is password/email empty, is email already in database etc.
      const statement = await db.prepare(
        'INSERT INTO person (name, email, password) VALUES (?, ?, ?)'
      );
      const result = await statement.run(req.body.name, req.body.email, hash);

      const person = await db.all('SELECT * FROM person');
      res.json(person);
    } catch {
      res.status(500).json({ message: 'Sorry something went wrong' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed. Only support POST.' });
  }
}
