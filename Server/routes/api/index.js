import express from "express";
import Artifact from "./api.artifacts";
import PugGame from "./api.pluggame";
import Hero from "./api.hero";

const router = express.Router();

router.use("/artifacts", Artifact);
router.use("/plug", PugGame);
router.use("/", Hero);

export default router;
