export type CarProductionResult = {
    copper: QueryResultValues[],
    manganese: QueryResultValues[],
    cobalt: QueryResultValues[],
    nickel: QueryResultValues[],
    graphite: QueryResultValues[],
    zinc: QueryResultValues[],
    lithium: QueryResultValues[],
    stockPrices: {
        cobalt: StockPrice[],
        zinc: StockPrice[],
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