export type StainlesssteelResult = {
    chromium: QueryResultValues[],
    nickel: QueryResultValues[],
    iron: QueryResultValues[],
    quartz: QueryResultValues[],
    manganese: QueryResultValues[],
    stockPrices: {
        manganese: StockPrice[]
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