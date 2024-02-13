/* eslint-disable @typescript-eslint/comma-dangle */
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import DOMPurify from 'dompurify';
import { JwtToken } from './interfaces/DiscordOAuthInterfaces';

export interface UserAuthInfoRequest extends Request {
  user?: JwtToken;
}

export function unless(path: string, method: string, middleware: any) {
  return function (req: Request, res: Response, next: NextFunction) {
    if (req.path.includes(path) && req.method === method) {
      return next();
    } else {
      return middleware(req, res, next);
    }
  };
}

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  res.status(500).json({
    message: err.message || 'Something went wrong',
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function sanitizeInput(req: Request, res: Response, next: NextFunction) {
  const body = req.body;
  for (const param in body) {
    if (typeof param === 'string') {
      DOMPurify.sanitize(param);
    }
  }
  next();
}

export function authenticateToken(
  req: UserAuthInfoRequest,
  res: Response,
  next: NextFunction
) {
  // eslint-disable-next-line @typescript-eslint/dot-notation
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);
  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    (err: any, payload: any) => {
      if (err) return res.status(403).json({ message: 'Invalid token' });
      req.user = payload as JwtToken;

      next();
    }
  );
}

export function roleAuthorize(
  req: UserAuthInfoRequest,
  res: Response,
  next: NextFunction
) {
  if (req.user?.permissions.includes('ADMIN')) {
    next();
  } else {
    res.status(403).json({ message: 'Unauthorized' });
  }
}
