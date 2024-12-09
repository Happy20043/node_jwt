import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../model/user.js";
import Joi from "joi";

const router = express.Router();

const userSchema = Joi.object({
  fullName: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const Register = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const { error } = userSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ fullName, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Something went wrong, please try again later" });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email not registered" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Something went wrong, please try again later" });
  }
};
