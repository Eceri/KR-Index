import express from "express";
import Artifact from "./api.artifacts";

const router = express.Router();

router.use("/artifacts", Artifact);

export default router;
