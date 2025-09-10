import { NextFunction, Request, Response } from "express";
import ForbiddenError from "../errors/forbidden-error";

export default function checkIsActive(req: Request, res: Response, next: NextFunction) {
  const { isActive } = (req as any).user;

  if (!isActive) {
    next(new ForbiddenError("Пользователь заблокирован"));
  } else {
    next();
  }
}
