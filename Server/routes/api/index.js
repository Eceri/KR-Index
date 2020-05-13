import express from "express";
import Artifact from "./api.artifacts";
import PugGame from "./api.puggame";
import Hero from "./api.hero";
import AWS from "./api.awsArtifacts";

const router = express.Router();

router.use("/artifacts", Artifact);
router.use("/pug", PugGame);
router.use("/", Hero);
router.use("/aws", AWS);

export default router;
