import express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  updateUser,
} from "../controller/user.js";
import { Router } from "express";
import jwt from "jsonwebtoken";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = Router();
const auth = (req, res, next) => {
  const token = req?.get("Authorization")?.split("Bearer ")[1];
  try {
    var decoded = jwt.verify(token, "shhhhh");
    console.log(decoded);
    // If token is valid, attach the decoded user information to the request object
    req.user = decoded;
    next(); // Call next middleware
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Unauthorized" });
  }
};

// router.get("/", auth, async (req, res) => {
router.get("/", authenticateToken, async (req, res) => {
  try {
    const userData = await getUser(req.query);
    res.send(userData);
  } catch (error) {
    console.log(error);
    res.json(error.message);
  }
});

// router.post("/", async (req, res) => {
//   try {
//     const userData = await createUser(req.body);
//     var token = jwt.sign({ email: req?.body?.email }, "shhhhh");
//     console.log(token);
//     res.send(userData);
//   } catch (error) {
//     console.log(error);
//     res.json(error.message);
//   }
// });

router.put("/:id", async (req, res) => {
  console.log(req.body);
  try {
    const userData = await updateUser(req.params.id, req.body);
    res.send(userData);
  } catch (error) {
    console.log(error);
    res.json(error.message);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const userData = await deleteUser(req.params.id, req.body);
    res.send({ userData, message: "delete successfully" });
  } catch (error) {
    console.log(error);
    res.json(error.message);
  }
});

export default router;
