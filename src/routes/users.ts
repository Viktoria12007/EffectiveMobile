import { Router } from "express";
import { blockUser, getUserById, getUsers } from "../controllers/users";
import onlyAdmin from "../middlewares/onlyAdmin";
import adminOrMyself from "../middlewares/adminOrMyself";

const router = Router();

router.get('/', onlyAdmin, getUsers);
router.get('/:id', adminOrMyself, getUserById);
router.patch('/:id/block', adminOrMyself, blockUser);

export default router;
