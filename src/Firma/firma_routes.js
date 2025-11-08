import express from "express";
import { postFirma } from "./firma.controller.js";

const router = express.Router();

router.post("/firma", postFirma);

export default router;
