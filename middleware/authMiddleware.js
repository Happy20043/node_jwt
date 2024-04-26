import fs from 'fs';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const privateKey = fs.readFileSync(
  path.resolve(dirname, "../private.key"),
  "utf-8"
);

export const authenticateToken = (req, res, next) => {
    const authHeader = req.get('Authorization');
    const token = authHeader && authHeader.split('Bearer ')[1];
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, privateKey, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  };