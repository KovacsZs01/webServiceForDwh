import { Router } from "express";
import { listAerospace } from "../controllers/aerospace.controller.js";

export const aerospaceRoutes = Router();

aerospaceRoutes.get("/", listAerospace);