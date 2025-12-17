import { client } from "../pg.js";
import type { QueryResultValues, StockPrice } from "../types/car-production.types.js";


export async function getTopFiveActiveProducersAndCountByMat(materialname: string): Promise<QueryResultValues[]> {
    const res = await client.query(
        `SELECT l."country" as country, COUNT(m."materialname") as count
         FROM "FactMaterial" AS m
         INNER JOIN "DimLocation" AS l
             ON l."locationID" = m."locationID"
			 inner join "DimSite" as s 
			 ON s."siteID"  = m."siteID"
         WHERE (m."materialname" = $1) 
		 AND (s."status" != 'Past Producer')
         AND (s."status" is not null)
		 GROUP BY l."country"
         ORDER BY COUNT(m."materialname") DESC
         LIMIT 5;`,
        [materialname]
    );

    const result: QueryResultValues[] = res.rows.map((pairs) => ({
        country: pairs.country,
        count: pairs.count,
    }))
    return result;
}
export async function getTopFiveActiveProducersAndCountByMatTwoParam(materialname1: string, materialname2: string) {
    const res = await client.query(
        `SELECT l."country", COUNT(m."materialname")
         FROM "FactMaterial" AS m
         INNER JOIN "DimLocation" AS l
             ON l."locationID" = m."locationID"
			 inner join "DimSite" as s 
			 ON s."siteID"  = m."siteID"
         WHERE ((m."materialname" = $1) 
		 OR (m."materialname" = $2))
		 AND (s."status" != 'Past Producer')
         AND (s."status" is not null)
		 GROUP BY l."country"
         ORDER BY COUNT(m."materialname") DESC
         LIMIT 5;`,
        [materialname1, materialname2]
    );
    return res.rows;
}
export async function getStockPrice(materialname: string) {
    const res = await client.query(
        `SELECT p."date", p."price"
        FROM "DimStockPrice" AS p
        WHERE (p."material" = $1
        AND EXTRACT(YEAR FROM p."date") = 2025
        AND EXTRACT(month FROM p."date") > 6 )`,
        [materialname]
    );

    const result: StockPrice[] = res.rows.map((pairs) => ({
        date: pairs.date,
        price: pairs.price
    }))


    return result;
}
