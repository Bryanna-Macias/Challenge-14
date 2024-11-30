import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Get token from the 'Authorization' header

  if (!token) return res.status(401).json({ message: 'Access denied, token missing!' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload;
    req.user = decoded; // Attaching user data to request object
    return next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

