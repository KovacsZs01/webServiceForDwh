export function buildPriceChartData(stockPrices: Record<string, Array<{date: string; price: number}>> | undefined, fallback: any) {
  if (stockPrices && Object.keys(stockPrices).length) {
    const keys = Object.keys(stockPrices);
    const labels = stockPrices[keys[0]].map(item => new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    const colors = ['#353ADD', '#FF6B6B', '#20B2AA', '#FFA500', '#8A2BE2', '#2F4F4F'];
    const datasets = keys.map((k, i) => ({
      label: k.charAt(0).toUpperCase() + k.slice(1),
      data: stockPrices[k].map(it => it.price),
      borderColor: colors[i % colors.length],
      backgroundColor: colors[i % colors.length] + '22',
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 6,
      borderWidth: 2,
      fill: false,
    }));
    return { labels, datasets };
  }
  if (fallback && fallback.labels && fallback.datasets) {
    return {
      labels: fallback.labels,
      datasets: fallback.datasets.map((ds: any) => ({
        label: ds.label,
        data: ds.data,
        borderColor: '#353ADD',
        backgroundColor: 'rgba(53, 58, 221, 0.1)',
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        borderWidth: 2,
        fill: false,
      })),
    };
  }
  return null;
}
