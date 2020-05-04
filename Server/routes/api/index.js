import express from "express";
import Artifact from "./api.artifacts";
import PugGame from "./api.puggame";

const router = express.Router();

router.use("/artifacts", Artifact);
router.use("/pug", PugGame);

export default router;
