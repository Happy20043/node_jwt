import {
  deleteUser,
  getUser,
  updateUser,
} from "../controller/user.js";
import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
 
const router = Router();

router.get("/", authMiddleware, getUser);

router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
