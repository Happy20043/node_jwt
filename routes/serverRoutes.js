import express from "express";

const router = express.Router();

import userRoutes from "./user.js";
import authRoutes from "./auth.js";
import blogRoutes from "./blog.js";

router.use("/user", userRoutes);
router.use('/auth', authRoutes);
router.use('/blog', blogRoutes);

export default router;
