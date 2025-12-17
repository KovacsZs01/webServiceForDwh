export type AerospaceResult = {
    copper: QueryResultValues[],
    cobalt: QueryResultValues[],
    tungsten: QueryResultValues[],
    magnesite: QueryResultValues[],
    bauxite: QueryResultValues[],
    titanium: QueryResultValues[],
    gallium: QueryResultValues[],
    quartz: QueryResultValues[],
    stockPrices: {
        cobalt: StockPrice[],
        gallium: StockPrice[],
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