import { NextFunction, Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

export function validation(type: any) {
  return async (req: Request, res: Response, next: NextFunction)=> {
    const dto = plainToInstance(type, req.body);
    const errors = await validate(dto);
    if (errors.length > 0) {
      return res.status(400).json(errors.map(err => ({
        property: err.property,
        constraints: err.constraints
      })));
    }
    next();
  }
}
