import express from "express";
import { createUser, getUser, updateUser } from "../controller/user.js";
import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const userData = await getUser(req.query);
    res.send(userData);
  } catch (error) {
    console.log(error);
    res.json(error.message);
  }
});
router.post("/", async (req, res) => {
  try {
    const userData = await createUser(req.body);
    res.send(userData);
  } catch (error) {
    console.log(error);
    res.json(error.message);
  }
});
router.put("/:id", async (req, res) => {
    console.log( req.body)
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
    const userData = await createUser(req.params.id, req.body);
    res.send({ userData, message: "delete successfully" });
  } catch (error) {
    console.log(error);
    res.json(error.message);
  }
});

export default router;
