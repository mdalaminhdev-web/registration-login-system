import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getMe, listUsers } from "../controllers/userController.js";

const router = Router();

router.get("/me", authMiddleware, getMe);
router.get("/", authMiddleware, listUsers);

export default router;
