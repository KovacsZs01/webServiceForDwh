import type { Request, Response } from "express";
import { getTopFiveActiveProducersAndCountByMat } from "../repositories/site.repository.js";
import { getStockPrice } from "../repositories/site.repository.js";
import type { AerospaceResult, QueryResultValues, StockPrice } from "../types/aerospace.types.js";

export async function listAerospace(req: Request, res: Response) {
    try {

        const copper: QueryResultValues[] = await getTopFiveActiveProducersAndCountByMat("Copper");
        const cobalt: QueryResultValues[] = await getTopFiveActiveProducersAndCountByMat("Cobalt");
        const tungsten: QueryResultValues[] = await getTopFiveActiveProducersAndCountByMat("Tungsten");
        const magnesite: QueryResultValues[] = await getTopFiveActiveProducersAndCountByMat("Magnesite");
        const bauxite: QueryResultValues[] = await getTopFiveActiveProducersAndCountByMat("Bauxite");
        const titanium: QueryResultValues[] = await getTopFiveActiveProducersAndCountByMat("Titanium");
        const gallium: QueryResultValues[] = await getTopFiveActiveProducersAndCountByMat("Gallium");
        const quartz: QueryResultValues[] = await getTopFiveActiveProducersAndCountByMat("Quartz");
        const cobaltStock: StockPrice[] = await getStockPrice("Cobalt");
        const galliumStock: StockPrice[] = await getStockPrice("Gallium");

        const result: AerospaceResult = {
            copper,
            cobalt,
            tungsten,
            magnesite,
            bauxite,
            titanium,
            gallium,
            quartz,
            stockPrices:
            {
                cobalt: cobaltStock,
                gallium: galliumStock
            }
        }
        res.json(result);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}