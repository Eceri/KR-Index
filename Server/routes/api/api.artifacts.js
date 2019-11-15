import express from "express";

import Data from "../../model/model.artifacts";

const router = express.Router();

router.get("/", async (req, res, next) => {
  console.log("Route /artifact");
  res.send("Hello World");
});

router.post("/post", async (req, res, next) => {
  console.log("Start Route /artifact/post");

  const Artifact = Data({
    name: req.body.name,
    description: req.body.description,
    story: req.body.story,
    picture: req.body.picture
  });
  await Artifact.save();

  console.log("End Route /artifact/post");
  res.status(200).send("OK");
});

export default router;
