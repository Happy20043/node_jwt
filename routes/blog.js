import express from "express";
import {
  CreateBlog,
  deleteBlog,
  getBlog,
  getOneBlog,
  updateBlogs,
} from "../controller/blog.js";
import upload from "../config/upload.js";
const router = express.Router();

router.post("/create", upload.single("image"), CreateBlog);
router.get("/", getBlog);
router.get("/:id", getOneBlog);
router.put("/:id", upload.single("image"), updateBlogs);
router.delete("/:id", deleteBlog);

export default router;
