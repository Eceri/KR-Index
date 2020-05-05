import express from "express";

const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("Get Hero data");
  const hero = req.query.hero;
  const data = require(`../../data/${hero}.json`);

  res.send(data);
});

export default router;
