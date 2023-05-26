// pages/api/authenticated.ts

import { NextApiHandler } from 'next';
import jwt_decode, { JwtPayload } from 'jwt-decode';

const authenticated: NextApiHandler = async (req, res) => {
  const { token } = req.cookies;

  if (token) {
    try {
      const decodedToken = jwt_decode(token) as JwtPayload;
      if (decodedToken && decodedToken.exp && decodedToken.exp < Date.now() / 1000) {
        res.status(401).json({ error: 'Token has expired' });
      } else {
        res.status(200).json({ authenticated: true });
      }
    } catch (error) {
      res.status(401).json({ error: 'Invalid token' });
    }
  } else {
    res.status(401).json({ error: 'No token provided' });
  }
};

export default authenticated;
