import express from "express";
import { postDesembolso } from "./desembolso.controller.js";

const router = express.Router();

router.post("/desembolso", postDesembolso);

export default router;
