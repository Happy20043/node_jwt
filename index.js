import bodyParser from "body-parser";
import express from "express";
import DbConnect from "./middleware/dbConnect.js";
import serverRoutes from "./routes/serverRoutes.js";

const app = express();

app.use(DbConnect);
app.use(bodyParser.json());
app.use("/", (req, res, next) => {
  next();
});

app.use("/", serverRoutes);

app.listen(6200);
