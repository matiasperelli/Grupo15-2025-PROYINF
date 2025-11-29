import express from "express";
import desembolsoRouter from "./desembolso.routes.js";
import { postFirma } from "./firma.controller.js";

app.use("/api", desembolsoRouter);

const router = express.Router();

router.post("/firma", postFirma);

export default router;
