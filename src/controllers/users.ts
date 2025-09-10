import { User } from "../entities/user";
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import ConflictError from "../errors/conflict-error";
import BadRequestError from "../errors/bad-request-error";
import jwt from 'jsonwebtoken';
import UnauthorizedError from "../errors/unauthorized-error";
import { AppDataSource } from "../data-source";
import NotFoundError from "../errors/not-found-error";

const userRepository = AppDataSource.getRepository(User);

export function createUser(req: Request, res: Response, next: NextFunction) {
  const { fullName, dateOfBirth, email, password, role } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => userRepository.save({ fullName, dateOfBirth, email, role, password: hash }))
    .then((data) => res.status(201).send(data))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError(error.message));
      } else if (error.code === 11000) {
        next(new ConflictError('Пользователь с данным email уже существует'));
      } else {
        next(error);
      }
    })
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const user = await userRepository.findOne({
      where: { email },
      select: { id: true, password: true, role: true, isActive: true }
    });
    if (!user) {
     throw new UnauthorizedError('Неправильные почта или пароль');
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      throw new UnauthorizedError('Неправильные почта или пароль')
    }
    const token = jwt.sign({ id: user.id, role: user.role, isActive: user.isActive }, process.env.JWT_SECRET);
    return res.cookie('jwt', token, {
      maxAge: 3600000,
      httpOnly: true,
      sameSite: true,
    }).send({ token })
  } catch (e) {
    next(e);
  }
}

export async function getUserById(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await userRepository.findOneBy({ id: parseInt(req.params.id, 10) });
    if (!user) {
      throw new NotFoundError("Такого пользователя не существует");
    }
    res.send(user);
  } catch (e) {
    next(e);
  }
}

export async function getUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await userRepository.find();
    res.send(users);
  } catch (e) {
    next(e);
  }
}

export async function blockUser(req: Request, res: Response, next: NextFunction) {
  try {
    const userBlocked = await userRepository.update(parseInt(req.params.id, 10), { isActive: false });
    res.send(userBlocked);
  } catch (e) {
    next(e);
  }
}
