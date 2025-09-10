import { RequestHandler } from 'express';
import ForbiddenError from "../errors/forbidden-error";

const onlyAdmin: RequestHandler = (req, res, next) => {
  const { role } = (req as any).user;

  if (role !== 'admin') {
    next(new ForbiddenError("У вас нет разрешения на доступ к этому ресурсу"));
  } else {
    next();
  }
}

export default onlyAdmin;
