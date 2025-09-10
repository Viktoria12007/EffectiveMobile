import { NextFunction, Request, Response } from "express";
import UnauthorizedError from "../errors/unauthorized-error";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: number,
  role: 'admin' | 'user',
  isActive: boolean,
}

export default function auth(req: Request, res: Response, next: NextFunction) {
  try {
    let token = req.cookies.jwt || req.headers.authorization;
    if (!token) {
      throw new UnauthorizedError('Токен не передан');
    }
    token = token.replace('Bearer ', '');
    let payload: JwtPayload | null = null;
    payload = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    (req as any).user = payload;
    next();
  } catch (e) {
    next(new UnauthorizedError('Необходима авторизация'));
  }
}
