import express from "express";
import Logger from "../../Config/logger";

import Data from "../../model/model.artifacts";

const router = express.Router();

router.get("/", async (req, res, next) => {
  const childLogger = Logger.child({ requestId: "451" });
  childLogger.info("GET Route /");
  try {
    const result = await Data.find();
    res.status(200).send(result);
    childLogger.info(`Found ${Object.keys(result).length} entries`);
  } catch (error) {
    next(error);
  }
  childLogger.info("End GET Route /");
});

router.post("/post", async (req, res, next) => {
  const body = req.body;
  Logger.info("POST Route /artifact/post");
  try {
    await body.map(async v => {
      const Artifact = Data({
        name: v.name,
        description: v.description,
        story: v.story
      });
      await Artifact.save();
    });
    Logger.info(`DB got ${body.length} new entry`);
    res.status(200).send("OK");
  } catch (error) {
    next(error);
  }
  Logger.info("End POST Route /artifact/post");
});

router.get("/id", async (req, res, next) => {
  Logger.info("GET Route /artifact/id");
  try {
    const id = req.body._id;
    const result = await Data.findById(id);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
  Logger.info("End GET Route /artifact/id");
});

router.put("/update", async (req, res, next) => {
  Logger.info("UPDATE Route /artifact/update");
  const id = req.body._id;
  try {
    await Data.updateOne(
      { _id: id },
      {
        $set: {
          name: req.body.name,
          description: req.body.description,
          story: req.body.story
        }
      }
    );
  } catch (error) {
    next(error);
  }
  res.status(200).send(`Updated ${id}`);
  Logger.info("End UPDATE Route /artifact/update", id);
});

router.delete("/delete/id", async (req, res, next) => {
  Logger.info("DELETE Route /artifact/delete/id");
  const id = req.body._id;
  try {
    await Data.deleteOne({ _id: id });
  } catch (error) {
    next(error);
  }
  res.status(200).send(`Deleted ${id}`);
  Logger.info("End DELETE Route /artifact/delete/id", id);
});

router.delete("/delete/all", async (req, res, next) => {
  Logger.info("DELETE ALL Route /artifact/delete/all");
  try {
    await Data.deleteMany({});
  } catch (error) {
    next(error);
  }
  res.status(200).send(`Deleted all`);
  Logger.info("End DELETE ALL Route /artifact/delete/all");
});

export default router;
