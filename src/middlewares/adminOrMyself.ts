import { RequestHandler } from 'express';
import ForbiddenError from "../errors/forbidden-error";

const adminOrMyself: RequestHandler = (req, res, next) => {
  const paramsIdNumber = parseInt(req.params.id, 10);
  const { id, role } = (req as any).user;

  if (paramsIdNumber !== id && role !== 'admin') {
    next(new ForbiddenError("У вас нет разрешения на доступ к этому ресурсу"));
  } else {
    next();
  }
}

export default adminOrMyself;
