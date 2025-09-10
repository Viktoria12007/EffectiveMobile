import { Router } from "express";
import { createUser, login } from "../controllers/users";
import userRoute from "./users";
import auth from "../middlewares/auth";
import { NextFunction, Request, Response } from "express";
import NotFoundError from "../errors/not-found-error";
import checkIsActive from "../middlewares/checkIsActive";

const router = Router();

router.post("/signup", createUser);
router.post("/signin", login);

router.use(auth);
router.use(checkIsActive);
router.use("/users", userRoute);

router.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError('Маршрут не найден'));
});

export default router;
