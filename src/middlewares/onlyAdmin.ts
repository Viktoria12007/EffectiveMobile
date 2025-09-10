import { NextFunction, Request, Response } from "express";
import { RequestHandler } from 'express';
import ForbiddenError from "../errors/forbidden-error";

const onlyAdmin: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const { role } = (req as any).user;

  if (role !== 'admin') {
    next(new ForbiddenError("У вас нет разрешения на доступ к этому ресурсу"));
  } else {
    next();
  }
}

export default onlyAdmin;
