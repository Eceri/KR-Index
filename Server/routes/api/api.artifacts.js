import express from "express";

import Data from "../../model/model.artifacts";

const router = express.Router();

router.get("/", async (req, res, next) => {
  console.log("GET Route /");
  try {
    const result = await Data.find();
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
  console.log("End GET Route /");
});

router.post("/post", async (req, res, next) => {
  console.log("POST Route /artifact/post");
  try {
    const Artifact = Data({
      name: req.body.name,
      description: req.body.description,
      story: req.body.story
    });
    await Artifact.save();
    console.log("DB got a new entry", Artifact);
    res.status(200).send("OK");
  } catch (error) {
    next(error);
  }
  console.log("End POST Route /artifact/post");
});

router.get("/id", async (req, res, next) => {
  console.log("GET Route /artifact/id");
  try {
    const id = req.body._id;
    const result = await Data.findById(id);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
  console.log("End GET Route /artifact/id");
});

router.put("/update", async (req, res, next) => {
  console.log("UPDATE Route /artifact/update");
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
  console.log("End UPDATE Route /artifact/update", id);
});

router.delete("/delete/id", async (req, res, next) => {
  console.log("DELETE Route /artifact/delete/id");
  const id = req.body._id;
  try {
    await Data.deleteOne({ _id: id });
  } catch (error) {
    next(error);
  }
  res.status(200).send(`Deleted ${id}`);
  console.log("End DELETE Route /artifact/delete/id", id);
});

router.delete("/delete/all", async (req, res, next) => {
  console.log("DELETE ALL Route /artifact/delete/all");
  try {
    await Data.deleteMany({});
  } catch (error) {
    next(error);
  }
  res.status(200).send(`Deleted all`);
  console.log("End DELETE ALL Route /artifact/delete/all");
});

export default router;
