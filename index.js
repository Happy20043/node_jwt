import bodyParser from "body-parser";
import express from "express";
import DbConnect from "./middleware/dbConnect.js";
import serverRoutes from "./routes/serverRoutes.js";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

dotenv.config();

DbConnect();
const app = express();
app.use(express.json());
// app.use();
app.use(bodyParser.json());
app.use("/", (req, res, next) => {
  next();
}); 

app.use("/", serverRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
