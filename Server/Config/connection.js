// Relative imports
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import expressWinston from "express-winston";
import Logger from "./logger";

// Absolute Imports
import apiRoutes from "../routes/api/index";
import winston from "winston";

const router = express.Router();
const app = express();
// TODO: Settings.json ?
const PORT = process.env.PORT;

try {
  // TODO: create process.ENV with URL
  mongoose.connect(
    `mongodb+srv://${process.env.MONGOLAB_URI}@krc-hinbo.mongodb.net/test?retryWrites=true&w=majority`
  );
} catch (error) {
  mongoose.connection.on("error", error => {
    Logger.error("Database connection error:", error);
  });
}

mongoose.connection.once("open", () => {
  Logger.info("Connected to Database!");
});

app.listen(PORT, () => {
  Logger.info(`App is running on port ${PORT}`);
});

app.use(bodyParser.json());
app.use(
  expressWinston.logger({
    transports: [
      new winston.transports.Console({
        json: true,
        colorize: true,
        format: new winston.format.prettyPrint()
      })
    ]
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use("/api", apiRoutes);

export default router;
