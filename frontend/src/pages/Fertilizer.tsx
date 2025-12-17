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
import './Fertilizer.css';
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

interface FertilizerData {
  phosphorite: CountryValues[];
  potashpotassium: CountryValues[];
  iron: CountryValues[];
  copper: CountryValues[];
  zinc: CountryValues[];
  priceData?: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
    }>;
  };
}

const Fertilizer: React.FC = () => {
  const [data, setData] = useState<FertilizerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/fertilizer');
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
        <p style={{ color: 'white', marginLeft: '1rem' }}>Loading fertilizer data...</p>
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

  // Mineral data for fertilizer industry
  const phosphoriteData = {
    labels: data.phosphorite.map(item => item.country),
    datasets: [
      {
        label: 'Active Phosphorite Mines by Country',
        data: data.phosphorite.map(item => parseInt(item.count)),
        backgroundColor: ['#FFF1EF', '#D7C4C1', '#AF9792', '#876A64', '#536564'],
        borderColor: ['rgba(255, 241, 239, 0.8)'],
        borderWidth: 2,
        hoverOffset: 15,
      },
    ],
  };

  const potashData = {
    labels: data.potashpotassium.map(item => item.country),
    datasets: [
      {
        label: 'Active Potash Mines by Country',
        data: data.potashpotassium.map(item => parseInt(item.count)),
        backgroundColor: ['#FF9578', '#FA7C62', '#F5624C', '#F04836', '#F53500'],
        borderColor: ['rgba(255, 149, 120, 0.8)'],
        borderWidth: 2,
        hoverOffset: 15,
      },
    ],
  };

  const ironData = {
    labels: data.iron.map(item => item.country),
    datasets: [
      {
        label: 'Active Iron Mines by Country',
        data: data.iron.map(item => parseInt(item.count)),
        backgroundColor: ['#4E364D', '#6B536A', '#887087', '#A58DA4', '#B8AEBA'],
        borderColor: ['rgba(78, 54, 77, 0.8)'],
        borderWidth: 2,
        hoverOffset: 15,
      },
    ],
  };

  const copperData = {
    labels: data.copper.map(item => item.country),
    datasets: [
      {
        label: 'Active Copper Mines by Country',
        data: data.copper.map(item => parseInt(item.count)),
        backgroundColor: ['#822E81', '#9B5199', '#B474B1', '#CD97C9', '#FEC3A6'],
        borderColor: ['rgba(130, 46, 129, 0.8)'],
        borderWidth: 2,
        hoverOffset: 15,
      },
    ],
  };

  const zincData = {
    labels: data.zinc.map(item => item.country),
    datasets: [
      {
        label: 'Active Zinc Mines by Country',
        data: data.zinc.map(item => parseInt(item.count)),
        backgroundColor: ['#F5D7E3', '#C4A8B5', '#937987', '#624A59', '#0B3C49'],
        borderColor: ['rgba(245, 215, 227, 0.8)'],
        borderWidth: 2,
        hoverOffset: 15,
      },
    ],
  };

  // Price trends: prefer `stockPrices` (time-series per material), fallback to `priceData`
  const priceData = buildPriceChartData((data as any).stockPrices, data.priceData);

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
      legend: { position: 'top' as const },
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
        title: { display: true, text: 'Price (USD)' },
      },
    },
  };

  return (
    <div className="fertilizer-container">
      <div className="fertilizer-content">

        {/* Header Section */}
        <div className="header-section">
          <h1 className="main-title">
            Fertilizer
          </h1>
        </div>

        {/* Industry Label Section */}
        <div className="industry-label-section">
          <h2 className="industry-label-title">Fertilizer Manufacturing Industry</h2>
          <p className="industry-label-subtitle">Critical Mineral Dependencies & Agricultural Supply Chains</p>
        </div>

        {/* Content Description */}
        <div className="overview-section">
          {/* Fertilizer Manufacturing Overview */}
          <div className="subsection">
            <h3 className="subsection-title">Fertilizer Manufacturing and Mining Raw Materials</h3>

            <p className="subsection-text">
              Fertilizer manufacturing fundamentally relies on mining-derived raw materials. The production of phosphorus fertilizers requires phosphorite mining, which is found in significant quantities primarily in China, Morocco, and the USA. Potassium fertilizers require potash mining, mainly occurring in Belarus, Russia, and Canada.
            </p>

            <p className="subsection-text">
              Iron and copper also play important roles in the fertilizer industry, particularly in micronutrient fertilizer production and production infrastructure development. Zinc is also a critical micronutrient that is essential for plant nutrition. These minerals originate from active mines worldwide, whose geographical distribution determines global fertilizer supply chains.
            </p>
          </div>

          {/* Critical Minerals Section */}
          <div className="subsection">
            <h3 className="subsection-title">Critical Minerals in Fertilizer Manufacturing</h3>

            <p className="subsection-text">
              <strong>Phosphorite (Phosphorus):</strong> The raw material for phosphorus fertilizers, which is essential for plant root development and energy transfer. Global phosphorite reserves are concentrated in a few countries.
            </p>

            <p className="subsection-text">
              <strong>Potash (Potassium):</strong> The source of potassium fertilizers, which plays a key role in regulating plant water balance and photosynthesis processes.
            </p>

            <p className="subsection-text">
              <strong>Iron, Copper, and Zinc:</strong> These elements provide proper plant nutrition and healthy development in the form of micronutrient fertilizers.
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
                Number of active mines by country for each critical mineral used in fertilizer manufacturing, showing the geographic distribution of global mining operations.
              </p>
            </div>

            {/* Mineral Charts Grid */}
            <div className="mineral-charts-container">

              {/* Phosphorite Chart */}
              <div className="mineral-chart-item">
                <h3 className="mineral-title">Phosphorite (Phosphorus)</h3>
                <div className="pie-chart-wrapper-small">
                  <Pie data={phosphoriteData} options={pieOptions} />
                </div>
              </div>

              {/* Potash Chart */}
              <div className="mineral-chart-item">
                <h3 className="mineral-title">Potash (Potassium)</h3>
                <div className="pie-chart-wrapper-small">
                  <Pie data={potashData} options={pieOptions} />
                </div>
              </div>

              {/* Iron Chart */}
              <div className="mineral-chart-item">
                <h3 className="mineral-title">Iron</h3>
                <div className="pie-chart-wrapper-small">
                  <Pie data={ironData} options={pieOptions} />
                </div>
              </div>

              {/* Copper Chart */}
              <div className="mineral-chart-item">
                <h3 className="mineral-title">Copper</h3>
                <div className="pie-chart-wrapper-small">
                  <Pie data={copperData} options={pieOptions} />
                </div>
              </div>

              {/* Zinc Chart */}
              <div className="mineral-chart-item">
                <h3 className="mineral-title">Zinc</h3>
                <div className="pie-chart-wrapper-small">
                  <Pie data={zincData} options={pieOptions} />
                </div>
              </div>

            </div>
          </div>

          {/* Line Chart Section */}
          <div className="chart-section">
            <div className="chart-decoration-left"></div>

            <div className="line-chart-header">
              <p className="line-chart-description">
                Recent price volatility in key fertilizer minerals reflecting supply chain
                dynamics and increasing demand from global agricultural production.
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
              <strong>Mineral consumption data:</strong> Based on industry estimates and research from fertilizer manufacturers, agricultural research institutions, and mining industry reports.
            </p>

            <p className="sources-paragraph">
              <strong>Mining country distribution:</strong> Represents approximate global production shares for fertilizer-relevant minerals from various geological surveys and industry associations.
            </p>

            <p className="sources-paragraph">
              <strong>Price data:</strong> Simulated price trends based on historical market patterns and commodity price movements. Actual prices may vary.
            </p>

            <p className="sources-paragraph">
              For the most current and accurate data, please consult official industry reports, government geological surveys, and agricultural commodity trading platforms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fertilizer;