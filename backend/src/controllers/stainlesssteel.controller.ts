import type { Request, Response } from "express";
import { getStockPrice, getTopFiveActiveProducersAndCountByMat } from "../repositories/site.repository.js";
import type { StainlesssteelResult, QueryResultValues, StockPrice } from "../types/stainlesssteel.types.js";

export async function listStainlesssteel(req: Request, res: Response) {
    try {
        const chromium: QueryResultValues[] = await getTopFiveActiveProducersAndCountByMat("Chromium");
        const nickel: QueryResultValues[] = await getTopFiveActiveProducersAndCountByMat("Nickel");
        const iron: QueryResultValues[] = await getTopFiveActiveProducersAndCountByMat("Iron");
        const quartz: QueryResultValues[] = await getTopFiveActiveProducersAndCountByMat("Quartz");
        const manganese: QueryResultValues[] = await getTopFiveActiveProducersAndCountByMat("Manganese");
        const manganeseStock: StockPrice[] = await getStockPrice("Manganese");

        const result: StainlesssteelResult = {
            chromium, nickel, iron, quartz, manganese,
            stockPrices:
            {
                manganese: manganeseStock
            }
        }
        res.json(result);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}