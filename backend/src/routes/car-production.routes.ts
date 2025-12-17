import { Router } from "express";
import { listCarProd } from "../controllers/car-production.controller.js";

export const carProductionRoutes = Router();

carProductionRoutes.get("/", listCarProd);