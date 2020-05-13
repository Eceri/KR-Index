import Data from "../../data/Data.json";
import express from "express";
import fetch from "node-fetch";

const router = express.Router();

const query = (name, description, story, release, drop) =>
  JSON.stringify({
    query: `mutation {
    createArtifact(input: {
      name: ${name}
      description: ${description}
      story: ${story}
      release: ${release}
      drop: ${drop}
    }{name})
  }`,
  });

router.get("/", (req, res, next) => {
  Data.map((d) =>
    fetch(
      "https://gd3mlj54t5d4dmsodj4zmkwbyy.appsync-api.eu-central-1.amazonaws.com/graphql",
      {
        method: "POST",
        headers: {
          "x-api-key": "da2-jffl545h5rbhvedvunyv44e44a",
          "Content-Type": "application/graphql",
          Host: req.headers.host,
          "User-Agent": req.headers["user-agent"],
          Connection: "keep-alive",
        },
        body: query(d.name, d.description, d.story, d.release, d.drop),
      }
    )
      .then((v) => console.log(v))
      .catch((err) => console.log(err))
  );

  res.sendStatus(200);
});

export default router;
