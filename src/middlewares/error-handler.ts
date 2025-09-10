import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';

const errorHandler: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => {
  const { statusCode = 500 } = err;
  const isErrorInternal = statusCode === 500;
  const message = isErrorInternal ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
  next();
};

export default errorHandler;
