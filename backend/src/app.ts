import express from "express";
import cors from "cors";
//import { siteRoutes } from "./routes/site.routes.js";
import { carProductionRoutes } from "./routes/car-production.routes.js";
import { aerospaceRoutes } from "./routes/aerospace.routes.js";
import { fertilizerRoutes } from "./routes/fertilizer.routes.js";
import { stainlesssteelRoutes } from "./routes/stainlesssteel.routes.js";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//app.use("/sites", siteRoutes);
app.use("/carproduction", carProductionRoutes);
app.use("/aerospace", aerospaceRoutes);
app.use("/fertilizer", fertilizerRoutes);
app.use("/stainlesssteel", stainlesssteelRoutes);
