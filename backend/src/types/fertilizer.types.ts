export type FertilizerResult = {
    phosphorite: QueryResultValues[],
    potashpotassium: QueryResultValues[],
    iron: QueryResultValues[],
    copper: QueryResultValues[],
    zinc: QueryResultValues[],
    stockPrices: {
        zinc: StockPrice[],
        phosphorus: StockPrice[],
    },
}

export type QueryResultValues = {
    country: string,
    count: string,
}
export type StockPrice = {
    date: string,
    price: string,
}