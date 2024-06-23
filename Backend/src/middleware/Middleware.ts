import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../interface/request';
import jwt from 'jsonwebtoken';
const JWT_SECRET = 'fasefraw4r5r3wq45wdfgw34twdfg';
export const extractUserIdMiddleware = (
  req: AuthenticatedRequest, 
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }
  const token = authHeader.split(' ')[1]; 
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET) as { userId: string };
    const userId = decodedToken.userId;
    req.userId = userId;
    next();
  } catch (error) {
    console.error('Error verifying JWT token:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};
