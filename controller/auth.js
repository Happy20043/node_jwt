import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";
import User from "../model/user.js";
import path from "path";
import { fileURLToPath } from "url";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const privateKey = fs.readFileSync(
  path.resolve(dirname, "../private.key"),
  "utf-8"
);
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdnZ2dAZ21haWwuY29tIiwiaWF0IjoxNzE0MTE0MDA2LCJleHAiOjE3MTQxMTc2MDZ9.fO2y5T8qij6fTwKONynj4sKcmbc-QehatVTaOf68Sw0
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Error occurs here
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).send("User registered successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error registering user");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("Invalid email or password");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send("Invalid email or password");
    }
    const token = jwt.sign({ email: user.email }, privateKey, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error logging in");
  }
};
