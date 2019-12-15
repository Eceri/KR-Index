import express from "express";
import Logger from "../../Config/logger";

import Data from "../../model/model.artifacts";

const router = express.Router();

/**
 * @api {get} artifacts/
 * searches for all Artifacts
 */
router.get("/", async (req, res, next) => {
  const childLogger = Logger.child({ requestId: "451" });
  childLogger.info("GET Route /");
  try {
    let result = await Data.find();
    result = result.sort((a, b) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    });
    res.status(200).send(result);
    childLogger.info(`Found ${Object.keys(result).length} entries`);
  } catch (error) {
    next(error);
  }
  childLogger.info("End GET Route /");
});

// Post an array of Artifacts to DB
router.post("/post", async (req, res, next) => {
  const body = req.body;
  Logger.info("POST Route /artifact/post");
  await body.map(async v => {
    Data.create({ ...v }, error => {
      if (error) {
        Logger.error(error);
        res.status(400).send(error);
      }
    });
  });
  Logger.info(`DB got ${body.length} new entry`);
  res.status(200).send("OK");

  Logger.info("End POST Route /artifact/post");
});

/**
 * @api {get} artifacts/:id
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {"description": [String], "name": String, "story": String, metaData: Object }
 */
router.get("/:id", async (req, res, next) => {
  Logger.info("GET Route /artifact/");

  const id = req.params.id;

  if (id.match("^[A-Z]")) {
    Logger.info("Name");
    await searchName(id, res, next);
  } else {
    await searchID(id, res, next);
  }

  Logger.info("End GET Route /artifact/id");
});

const searchID = async (id, res, next) => {
  Logger.info("GET Route /artifact/id");
  await Data.findById(id, (error, artifact) => {
    if (error) {
      Logger.error(error);
      res.status(400).send(error);
    }
    res.status(200).send(artifact);
    next();
  });
};

// Get one Artifact by Name
const searchName = async (req, res, next) => {
  Logger.info("GET Route /artifact/:name");
  await Data.findOne({ name: req }, (error, artifact) => {
    if (error) {
      Logger.error(error);
      res.status(400).send(`No Artifact named ${req} exists in our Database`);
    }
    res.status(200).send(artifact);
    next();
  });
  Logger.info("End GET Route /artifact/:name");
};

// Update one Artifact with id as identifier
router.put("/update/:id", async (req, res, next) => {
  Logger.info("UPDATE Route /artifact/update/:id");
  const id = req.params.id;
  const body = req.body;
  try {
    const compareData = await Data.findById(id, (error, data) => {
      if (error) {
        Logger.error(error);
        res.status(400).send(`No Artifact found with ${id} as an id`);
      }
      return data;
    });
    await Data.updateOne(
      { _id: id },
      {
        $set: {
          name: body.name ? body.name : compareData.name,
          description: body.description
            ? body.description
            : compareData.description,
          story: body.story ? body.story : compareData.story
        }
      }
    );
  } catch (error) {
    next(error);
  }
  res.status(200).send(`Updated ${id} with ${JSON.stringify(body)}`);
  Logger.info("End UPDATE Route /artifact/update/:id", id);
});

// Delete one Artifact with id as identifier
router.delete("/delete/:id", async (req, res, next) => {
  Logger.info("DELETE Route /artifact/delete/:id");
  const id = req.params.id;
  try {
    await Data.deleteOne({ _id: id }, error => {
      if (error) {
        Logger.error(error);
        res.status(400).send(`No Artifact found with ${id} as an id`);
      }
      res.status(200).send(`Deleted ${id}`);
    });
  } catch (error) {
    next(error);
  }
  Logger.info("End DELETE Route /artifact/delete/:id", id);
});

router.delete("/empty/", async (req, res, next) => {
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
