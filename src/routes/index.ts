import { Router } from "express";
import { createUser, login } from "../controllers/users";
import userRoute from "./users";
import auth from "../middlewares/auth";
import { NextFunction, Request, Response } from "express";
import NotFoundError from "../errors/not-found-error";
import checkIsActive from "../middlewares/checkIsActive";
import { validation } from "../middlewares/validation";
import { User } from "../entities/user";
import { LoginUserDto } from "../entities/dto/login-user.dto";

const router = Router();

router.post("/signup", validation(User), createUser);
router.post("/signin", validation(LoginUserDto), login);

router.use(auth);
router.use(checkIsActive);
router.use("/users", userRoute);

router.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError('Маршрут не найден'));
});

export default router;
