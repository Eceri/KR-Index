import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import apiRoutes from "../routes/api/index";

const router = express.Router();

const PORT = 5000;

const app = express();

try {
  mongoose.connect("mongodb://localhost:27017/krc");
} catch (error) {
  mongoose.connection.on("error", error => {
    console.error("Database connection error:", error);
  });
}

mongoose.connection.once("open", () => {
  console.log("Connected to Database!");
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});

app.use(bodyParser.json());
app.use("/api", apiRoutes);

export default router;
