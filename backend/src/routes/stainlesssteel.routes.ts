import { Router } from "express";
import { listStainlesssteel } from "../controllers/stainlesssteel.controller.js";

export const stainlesssteelRoutes = Router();

stainlesssteelRoutes.get("/", listStainlesssteel);