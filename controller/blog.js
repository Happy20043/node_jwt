import express from "express";
import Blog from "../model/blog.js";

const router = express.Router();

export const CreateBlog = async (req, res) => {
  const { title, description } = req.body;

  try {
    const image = req.file ? `uploads/${req.file.filename}` : "";

    const newBlog = new Blog({
      title,
      description,
      image,
    });

    await newBlog.save();
    res
      .status(201)
      .json({ message: "Blog created successfully!", blog: newBlog });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating blog", error: err.message });
  }
};

export const getBlog = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching blogs", error: err.message });
  }
};

export const getOneBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching blog", error: err.message });
  }
};

export const updateBlogs = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  let image = req.body.image || "";

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (req.file) {
      image = `uploads/${req.file.filename}`;
    }

    blog.title = title || blog.title;
    blog.description = description || blog.description;
    blog.image = image || blog.image;

    await blog.save();
    res.status(200).json({ message: "Blog updated successfully!", blog });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating blog", error: err.message });
  }
};

export const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully!" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting blog", error: err.message });
  }
};

export default router;
