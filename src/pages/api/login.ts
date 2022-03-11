import { NextApiRequest, NextApiResponse } from 'next';
import sqlite from 'sqlite';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { secret } from '../../../api/secret';
import cookie from 'cookie';

async function compareAsync(password: string, passwordToCompare: string) {
  return new Promise((resolved, rejected) => {
    compare(password, passwordToCompare, function (err, result) {
      if (err || !compare) {
        rejected();
      } else {
        resolved(result);
      }
    });
  });
}

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const db = await sqlite.open('./database.sqlite');
  if (req.method === 'POST') {
    const person = await db.get('SELECT * FROM person WHERE email = ?', [
      req.body.email,
    ]);
    // Todo: make sure password exist
    await compareAsync(req.body.password, person.password).then((result) => {
      if (result) {
        const claims = { sub: person.id, myPersonEmail: person.email };
        // usually secret is stored in env variable, for now we hardcode it
        const jwt = sign(claims, secret, {
          expiresIn: '1h',
        });
        res.setHeader(
          'Set-Cookie',
          cookie.serialize('authToken', jwt, {
            httpOnly: true, // only transmit over http
            secure: process.env.NODE_ENV !== 'development', // only transmit over https
            sameSite: 'strict',
            maxAge: 3600,
            path: '/', // we want everything in localhost:3000 to be able to access this cookie
          })
        );
        // res.json({ authToken: jwt });
        res.json({ message: 'Welcome back to the app!' });
      } else {
        res.json({ meesage: 'Something went wrong' });
      }
    });
  } else {
    res.status(405).json({ message: 'Method not allowed. Only support POST.' });
  }
}
