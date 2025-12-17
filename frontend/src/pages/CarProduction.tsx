import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Pie, Line } from 'react-chartjs-2';
import './CarProduction.css';
import { buildPriceChartData } from '../utils/chart';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface CountryValues {
  country: string;
  count: string
}

interface CarProductionData {
  copper: CountryValues[];
  manganese: CountryValues[];
  lithium: CountryValues[];
  nickel: CountryValues[];
  graphite: CountryValues[];
  zinc: CountryValues[];
  cobalt: CountryValues[];
  stockPrices?: {
    cobalt: Array<{
      date: string;
      price: number[];
    }>;
    zinc: Array<{
      date: string;
      price: number[];
    }>;
  };
}

const CarProduction: React.FC = () => {
  const [data, setData] = useState<CarProductionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/carproduction');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p style={{ color: 'white', marginLeft: '1rem' }}>Loading car production data...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="error-container">
        <p>Error loading data: {error}</p>
      </div>
    );
  }
  // Mining countries data for key minerals - individual datasets
  const copperData = {
    labels: data.copper.map(item => item.country),
    datasets: [
      {
        label: 'Number of Active Copper Mines',
        data: data.copper.map(item => parseInt(item.count)),
        backgroundColor: ['#FF6B35', '#E74C3C', '#C0392B', '#A93226', '#922B21'],
        borderColor: ['rgba(255, 107, 53, 0.8)'],
        borderWidth: 2,
        hoverOffset: 15,
      },
    ],
  };

  const manganeseData = {
    labels: data.manganese.map(item => item.country),
    datasets: [
      {
        label: 'Number of Active Manganese Mines',
        data: data.manganese.map(item => parseInt(item.count)),
        backgroundColor: ['#8B4513', '#D2691E', '#FF8C00', '#CD853F', '#A0522D'],
        borderColor: ['rgba(139, 69, 19, 0.8)'],
        borderWidth: 2,
        hoverOffset: 15,
      },
    ],
  };

  const lithiumData = {
    labels: data.lithium.map(item => item.country),
    datasets: [
      {
        label: 'Number of Active Lithium Mines',
        data: data.lithium.map(item => parseInt(item.count)),
        backgroundColor: ['#00CED1', '#20B2AA', '#48CAE4', '#0077B6', '#023E8A'],
        borderColor: ['rgba(0, 206, 209, 0.8)'],
        borderWidth: 2,
        hoverOffset: 15,
      },
    ],
  };

  const nickelData = {
    labels: data.nickel.map(item => item.country),
    datasets: [
      {
        label: 'Number of Active Nickel Mines',
        data: data.nickel.map(item => parseInt(item.count)),
        backgroundColor: ['#708090', '#778899', '#B0C4DE', '#4682B4', '#2F4F4F'],
        borderColor: ['rgba(112, 128, 144, 0.8)'],
        borderWidth: 2,
        hoverOffset: 15,
      },
    ],
  };

  const graphiteData = {
    labels: data.graphite.map(item => item.country),
    datasets: [
      {
        label: 'Number of Active Graphite Mines',
        data: data.graphite.map(item => parseInt(item.count)),
        backgroundColor: ['#2F4F4F', '#696969', '#808080', '#A9A9A9', '#36454F'],
        borderColor: ['rgba(47, 79, 79, 0.8)'],
        borderWidth: 2,
        hoverOffset: 15,
      },
    ],
  };

  const zincData = {
    labels: data.zinc.map(item => item.country),
    datasets: [
      {
        label: 'Number of Active Zinc Mines',
        data: data.zinc.map(item => parseInt(item.count)),
        backgroundColor: ['#4682B4', '#5F9EA0', '#6495ED', '#4169E1', '#1E90FF'],
        borderColor: ['rgba(70, 130, 180, 0.8)'],
        borderWidth: 2,
        hoverOffset: 15,
      },
    ],
  };

  const cobaltData = {
    labels: data.cobalt.map(item => item.country),
    datasets: [
      {
        label: 'Number of Active Cobalt Mines',
        data: data.cobalt.map(item => parseInt(item.count)),
        backgroundColor: ['#4169E1', '#8A2BE2', '#9370DB', '#7B68EE', '#6A5ACD'],
        borderColor: ['rgba(65, 105, 225, 0.8)'],
        borderWidth: 2,
        hoverOffset: 15,
      },
    ],
  };

  // Price trends (use shared helper)
  const priceData = buildPriceChartData((data as any).stockPrices, (data as any).priceData);

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 15,
          usePointStyle: true,
          font: {
            size: 11
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#353ADD',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
      },
    },
    elements: {
      arc: {
        borderWidth: 2
      }
    }
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index' as const, intersect: false },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          padding: 15,
          usePointStyle: true,
          font: { size: 12 }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#353ADD',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          title: (items: any) => items && items.length ? items[0].label : '',
          label: (ctx: any) => {
            const value = ctx.parsed?.y ?? ctx.raw;
            return `${ctx.dataset.label}: ${Number(value).toLocaleString()} USD`;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Price (USD/T)',
        },
      },
    },
  };

  return (
    <div className="car-production-container">
      <div className="car-production-content">

        {/* Header Section */}
        <div className="header-section">
          <h1 className="main-title">
            Car Production
          </h1>
        </div>

        {/* Industry Label Section */}
        <div className="industry-label-section">
          <h2 className="industry-label-title">Automotive Manufacturing Industry</h2>
          <p className="industry-label-subtitle">Electric Vehicle Transition & Critical Mineral Supply Chains</p>
        </div>

        {/* Content Description */}
        <div className="overview-section">
          {/* Traditional vs Electric Vehicles Section */}
          <div className="subsection">
            <h3 className="subsection-title">Traditional vs Electric Vehicle Manufacturing</h3>

            <p className="subsection-text">
              The automotive industry stands at a critical transformation point, shifting from traditional internal combustion engines to electric powertrains. This transition fundamentally changes the mineral requirements and supply chains that have supported vehicle manufacturing for over a century.
            </p>

            <p className="subsection-text">
              Traditional vehicles primarily rely on steel for body construction, aluminum for lightweight components, copper for basic electrical wiring, and zinc for corrosion protection through galvanization. The mineral footprint of conventional cars has remained relatively stable, with incremental improvements in material efficiency and recycling.
            </p>
          </div>

          {/* Electric Vehicle Revolution Section */}
          <div className="subsection">
            <h3 className="subsection-title">The Electric Vehicle Mineral Revolution</h3>

            <p className="subsection-text">
              Electric vehicles represent a paradigm shift in automotive mineral consumption. A typical electric vehicle battery pack requires approximately 8-10 kg of lithium, 35-40 kg of nickel, 10-20 kg of cobalt, and 50-60 kg of graphite. The electric motor and charging infrastructure demand an additional 80-85 kg of copper per vehicle, compared to just 20-25 kg in conventional cars.
            </p>

            <p className="subsection-text">
              Beyond the battery minerals, electric vehicles utilize manganese for battery chemistry optimization, rare earth elements for permanent magnet motors, and specialized steel grades for high-performance components. This mineral intensity makes EVs approximately 6 times more mineral-intensive than their conventional counterparts.
            </p>
          </div>

          {/* Supply Chain Implications Section */}
          <div className="subsection">
            <h3 className="subsection-title">Global Supply Chain Implications</h3>

            <p className="subsection-text">
              The geographic concentration of critical mineral resources creates new dependencies for automotive manufacturers. Unlike traditional automotive materials that are widely available, battery minerals are concentrated in specific regions: lithium in South America's "Lithium Triangle," cobalt in the Democratic Republic of Congo, and rare earth elements in China.
            </p>

            <p className="subsection-text">
              This concentration has prompted automotive companies to secure direct supply agreements with mining operations, invest in recycling technologies, and develop alternative battery chemistries that reduce dependence on the most constrained materials. The industry is also exploring urban mining and battery-to-battery recycling as sustainable supply sources.
            </p>
          </div>
        </div>

        {/* Charts Container */}
        <div className="charts-container">

          {/* Mineral Charts Grid Section */}
          <div className="mineral-charts-grid">
            <div className="chart-decoration-right"></div>

            <div style={{ textAlign: 'left', marginBottom: '2rem', padding: '2rem' }}>
              <h2 style={{
                fontSize: '24pt',
                color: '#333',
                lineHeight: '1.4',
                margin: '0 0 0.5rem 0',
                fontWeight: '600'
              }}>
                Global Mineral Production by Country
              </h2>
              <p style={{
                fontSize: '11pt',
                color: '#6c757d',
                lineHeight: '1.6',
                margin: '0',
                textAlign: 'left'
              }}>
                Number of active mines by country for each critical mineral used in automotive manufacturing, showing the geographic distribution of global mining operations.
              </p>
            </div>

            {/* Mineral Charts Grid */}
            <div className="mineral-charts-container">

              {/* Copper Chart */}
              <div className="mineral-chart-item">
                <h3 className="mineral-title">Copper</h3>
                <div className="pie-chart-wrapper-small">
                  <Pie data={copperData} options={pieOptions} />
                </div>
              </div>

              {/* Manganese Chart */}
              <div className="mineral-chart-item">
                <h3 className="mineral-title">Manganese</h3>
                <div className="pie-chart-wrapper-small">
                  <Pie data={manganeseData} options={pieOptions} />
                </div>
              </div>

              {/* Lithium Chart */}
              <div className="mineral-chart-item">
                <h3 className="mineral-title">Lithium</h3>
                <div className="pie-chart-wrapper-small">
                  <Pie data={lithiumData} options={pieOptions} />
                </div>
              </div>

              {/* Nickel Chart */}
              <div className="mineral-chart-item">
                <h3 className="mineral-title">Nickel</h3>
                <div className="pie-chart-wrapper-small">
                  <Pie data={nickelData} options={pieOptions} />
                </div>
              </div>

              {/* Graphite Chart */}
              <div className="mineral-chart-item">
                <h3 className="mineral-title">Graphite</h3>
                <div className="pie-chart-wrapper-small">
                  <Pie data={graphiteData} options={pieOptions} />
                </div>
              </div>

              {/* Zinc Chart */}
              <div className="mineral-chart-item">
                <h3 className="mineral-title">Zinc</h3>
                <div className="pie-chart-wrapper-small">
                  <Pie data={zincData} options={pieOptions} />
                </div>
              </div>

              {/* Cobalt Chart */}
              <div className="mineral-chart-item">
                <h3 className="mineral-title">Cobalt</h3>
                <div className="pie-chart-wrapper-small">
                  <Pie data={cobaltData} options={pieOptions} />
                </div>
              </div>

            </div>
          </div>

          {/* Line Chart Section */}
          <div className="chart-section">
            <div className="chart-decoration-left"></div>

            <div className="line-chart-header">
              <p className="line-chart-description">
                Recent price volatility in key automotive minerals reflecting supply chain
                dynamics and increasing demand from electric vehicle production.
              </p>
            </div>

            <div className="line-chart-container chart-full-height">
              {priceData && (
                <Line data={priceData} options={lineOptions} />
              )}
            </div>

            <div className="chart-title-bottom">
              <h3 className="chart-title-text">Mineral Price Trends</h3>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="footer-navigation">
          <Link
            to="/introduction"
            className="back-link"
          >
            ← Back to Introduction
          </Link>
        </div>

        {/* Data Sources */}
        <div className="data-sources">
          <h4 className="sources-title">Data Sources & References</h4>

          <div className="sources-content">
            <p className="sources-paragraph">
              <strong>Note:</strong> The data and statistics presented on this page are compiled from multiple industry sources and research reports. This is a demonstration page created for educational and analytical purposes.
            </p>

            <p className="sources-paragraph">
              <strong>Mineral consumption data:</strong> Based on industry estimates and research from automotive manufacturers, mining industry reports, and battery technology studies.
            </p>

            <p className="sources-paragraph">
              <strong>Mining country distribution:</strong> Represents approximate global production shares for automotive-relevant minerals from various geological surveys and industry associations.
            </p>

            <p className="sources-paragraph">
              <strong>Price data:</strong> Simulated price trends based on historical market patterns and commodity price movements. Actual prices may vary.
            </p>

            <p className="sources-paragraph">
              For the most current and accurate data, please consult official industry reports, government geological surveys, and commodity trading platforms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarProduction;