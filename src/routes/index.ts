import { Router } from "express";
import { createUser, login } from "../controllers/users";
import userRoute from "./users";

const router = Router();

router.post("/signup", createUser);
router.post("/signin", login);

router.use("/users", userRoute);

export default router;
