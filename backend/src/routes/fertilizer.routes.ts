import { Router } from "express";
import { listFertilizer } from "../controllers/fertilizer.controller.js";

export const fertilizerRoutes = Router();

fertilizerRoutes.get("/", listFertilizer);