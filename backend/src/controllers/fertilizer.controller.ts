import type { Request, Response } from "express";
import { getTopFiveActiveProducersAndCountByMat } from "../repositories/site.repository.js";
import { getStockPrice } from "../repositories/site.repository.js";
import { getTopFiveActiveProducersAndCountByMatTwoParam } from "../repositories/site.repository.js";
import type { FertilizerResult, QueryResultValues, StockPrice } from "../types/fertilizer.types.js";

export async function listFertilizer(req: Request, res: Response) {
    try {
        const phosphorite: QueryResultValues[] = await getTopFiveActiveProducersAndCountByMat("Phosphorite");
        const potashpotassium: QueryResultValues[] = await getTopFiveActiveProducersAndCountByMatTwoParam("Potash", "Potassium");
        const iron: QueryResultValues[] = await getTopFiveActiveProducersAndCountByMat("Iron");
        const copper: QueryResultValues[] = await getTopFiveActiveProducersAndCountByMat("Copper");
        const zinc: QueryResultValues[] = await getTopFiveActiveProducersAndCountByMat("Zinc");
        const zincStock: StockPrice[] = await getStockPrice("Zinc");
        const phosphorusStock: StockPrice[] = await getStockPrice("Phosphorus");


        const result: FertilizerResult = {
            phosphorite, potashpotassium, iron, copper, zinc,
            stockPrices:
            {
                phosphorus: phosphorusStock,
                zinc: zincStock
            }
        }

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}
