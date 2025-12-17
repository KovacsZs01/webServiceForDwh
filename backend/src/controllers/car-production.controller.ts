import type { Request, Response } from "express";
import { getTopFiveActiveProducersAndCountByMat } from "../repositories/site.repository.js";
import { getStockPrice } from "../repositories/site.repository.js";
import type { CarProductionResult, QueryResultValues, StockPrice } from "../types/car-production.types.js";

export async function listCarProd(req: Request, res: Response) {
    try {
        const copper: QueryResultValues[] = await getTopFiveActiveProducersAndCountByMat("Copper");
        const manganese: QueryResultValues[] = await getTopFiveActiveProducersAndCountByMat("Manganese");
        const lithium: QueryResultValues[] = await getTopFiveActiveProducersAndCountByMat("Lithium");
        const nickel: QueryResultValues[] = await getTopFiveActiveProducersAndCountByMat("Nickel");
        const graphite: QueryResultValues[] = await getTopFiveActiveProducersAndCountByMat("Graphite");
        const zinc: QueryResultValues[] = await getTopFiveActiveProducersAndCountByMat("Zinc");
        const cobalt: QueryResultValues[] = await getTopFiveActiveProducersAndCountByMat("Cobalt");
        const cobaltStock: StockPrice[] = await getStockPrice("Cobalt");
        const zincStock: StockPrice[] = await getStockPrice("Zinc");


        const result: CarProductionResult = {
            copper, manganese, lithium, nickel, graphite, zinc, cobalt,
            stockPrices:
            {
                cobalt: cobaltStock,
                zinc: zincStock
            }
        }

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}
