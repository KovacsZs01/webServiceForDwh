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
import './Aerospace.css';
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

interface AerospaceData {
  copper: CountryValues[];
  cobalt: CountryValues[];
  tungsten: CountryValues[];
  magnesite: CountryValues[];
  bauxite: CountryValues[];
  titanium: CountryValues[];
  gallium: CountryValues[];
  quartz: CountryValues[];
  priceData?: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
    }>;
  };
}

const Aerospace: React.FC = () => {
  const [data, setData] = useState<AerospaceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/aerospace');
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
        <p className="loading-text">Loading aerospace data...</p>
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

  // Mining countries data for key aerospace minerals - individual datasets
  const copperData = {
    labels: data.copper.map(item => item.country),
    datasets: [
      {
        label: 'Active Copper Mines by Country',
        data: data.copper.map(item => item.count),
        backgroundColor: ['#822E81', '#A952A8', '#CF76CF', '#E599E5', '#FEC3A6'],
        borderColor: ['rgba(130, 46, 129, 0.8)'],
        borderWidth: 2,
        hoverOffset: 15,
      },
    ],
  };

  const cobaltData = {
    labels: data.cobalt.map(item => item.country),
    datasets: [
      {
        label: 'Active Cobalt Mines by Country',
        data: data.cobalt.map(item => item.count),
        backgroundColor: ['#0C0F5B', '#1A237E', '#3F51B5', '#5C6BC0', '#353AD6'],
        borderColor: ['rgba(12, 15, 91, 0.8)'],
        borderWidth: 2,
        hoverOffset: 15,
      },
    ],
  };

  const tungstenData = {
    labels: data.tungsten.map(item => item.country),
    datasets: [
      {
        label: 'Active Tungsten Mines by Country',
        data: data.tungsten.map(item => item.count),
        backgroundColor: ['#767B91', '#8A8FA5', '#9EA3B8', '#B1B7CC', '#C7CCDB'],
        borderColor: ['rgba(118, 123, 145, 0.8)'],
        borderWidth: 2,
        hoverOffset: 15,
      },
    ],
  };

  const magnesiteData = {
    labels: data.magnesite.map(item => item.country),
    datasets: [
      {
        label: 'Active Magnesite Mines by Country',
        data: data.magnesite.map(item => item.count),
        backgroundColor: ['#474973', '#5D5F87', '#74769B', '#8A8CAF', '#E1E5EE'],
        borderColor: ['rgba(71, 73, 115, 0.8)'],
        borderWidth: 2,
        hoverOffset: 15,
      },
    ],
  };

  const bauxiteData = {
    labels: data.bauxite.map(item => item.country),
    datasets: [
      {
        label: 'Active Bauxite Mines by Country',
        data: data.bauxite.map(item => item.count),
        backgroundColor: ['#F28123', '#F5956F', '#F8A98B', '#DBBDA7', '#E4B1AB'],
        borderColor: ['rgba(242, 129, 35, 0.8)'],
        borderWidth: 2,
        hoverOffset: 15,
      },
    ],
  };

  const titaniumData = {
    labels: data.titanium.map(item => item.country),
    datasets: [
      {
        label: 'Active Titanium Mines by Country',
        data: data.titanium.map(item => item.count),
        backgroundColor: ['#CAD6D1', '#D0DDD8', '#D6E4DF', '#DCEBE6', '#C9F0FF'],
        borderColor: ['rgba(202, 214, 209, 0.8)'],
        borderWidth: 2,
        hoverOffset: 15,
      },
    ],
  };

  const galliumData = {
    labels: data.gallium.map(item => item.country),
    datasets: [
      {
        label: 'Active Gallium Mines by Country',
        data: data.gallium.map(item => item.count),
        backgroundColor: ['#339989', '#4DA89D', '#66B8B1', '#7FC7C5', '#A9FFF7'],
        borderColor: ['rgba(51, 153, 137, 0.8)'],
        borderWidth: 2,
        hoverOffset: 15,
      },
    ],
  };

  const siliconData = {
    labels: data.quartz.map(item => item.country),
    datasets: [
      {
        label: 'Active Quartz Mines by Country',
        data: data.quartz.map(item => item.count),
        backgroundColor: ['#C08497', '#CA96A8', '#D4A8B9', '#DDBACA', '#B8E1FF'],
        borderColor: ['rgba(192, 132, 151, 0.8)'],
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
      y: { beginAtZero: false, title: { display: true, text: 'Price (USD/T)' } },
    },
  };

  return (
    <div className="aerospace-container">
      <div className="aerospace-content">

        {/* Header Section */}
        <div className="header-section">
          <h1 className="main-title">
            Aerospace
          </h1>
        </div>

        {/* Industry Label Section */}
        <div className="industry-label-section">
          <h2 className="industry-label-title">Aircraft Manufacturing Industry</h2>
          <p className="industry-label-subtitle">Critical Mineral Dependencies & Global Supply Chains</p>
        </div>

        {/* Overview Section */}
        <div className="overview-section">

          {/* Aircraft Manufacturing Overview */}
          <div className="subsection">
            <h2 className="subsection-title">Aircraft Manufacturing & Mineral Dependencies</h2>

            <p className="subsection-text">
              Modern aircraft manufacturing represents one of the most mineral-intensive industries in the world, requiring a sophisticated array of specialized materials to meet stringent safety, performance, and durability requirements. Commercial aircraft construction demands approximately 15-20 different critical minerals, each serving specific functions in airframe construction, engine manufacturing, avionics systems, and safety equipment.
            </p>

            <p className="subsection-text">
              The aerospace industry's mineral consumption has evolved significantly with the introduction of advanced materials and next-generation aircraft designs. A typical commercial airliner contains approximately 3,000-4,000 kg of aluminum from bauxite, 800-1,200 kg of titanium for engine components, 150-200 kg of copper for electrical systems, and specialized amounts of rare minerals like gallium for semiconductors and tungsten for high-temperature applications.
            </p>
          </div>

          {/* Critical Aerospace Minerals */}
          <div className="subsection">
            <h3 className="subsection-title">Critical Aerospace Minerals & Applications</h3>

            <p className="subsection-text">
              <strong>Aluminum (from Bauxite):</strong> Forms the primary structural backbone of aircraft, providing lightweight strength for fuselage construction, wing structures, and interior components. Modern aircraft are typically 70-80% aluminum by weight, with aerospace-grade alloys offering superior corrosion resistance and fatigue performance.
            </p>

            <p className="subsection-text">
              <strong>Titanium:</strong> Essential for jet engine components operating under extreme temperatures and pressures. Titanium's exceptional strength-to-weight ratio and heat resistance make it indispensable for compressor blades, engine casings, and landing gear systems, with each commercial aircraft requiring 15-20 tonnes of titanium.
            </p>

            <p className="subsection-text">
              <strong>Copper & Cobalt:</strong> Critical for aircraft electrical systems, wiring harnesses, and increasingly important for electric aircraft propulsion systems. Modern aircraft contain 3-5 km of copper wiring, while cobalt enables high-performance batteries and magnetic systems in advanced avionics.
            </p>
          </div>

          {/* Advanced Materials Section */}
          <div className="subsection">
            <h3 className="subsection-title">Specialized Minerals & Future Technologies</h3>

            <p className="subsection-text">
              <strong>Tungsten & Magnesite:</strong> Tungsten provides critical density and heat resistance for aircraft ballast systems and engine components, while magnesite-derived materials offer fire-resistant properties essential for aircraft interior safety standards and thermal protection systems.
            </p>

            <p className="subsection-text">
              <strong>Gallium & Quartz:</strong> Enable the sophisticated semiconductor systems that power modern aircraft avionics, navigation systems, and fly-by-wire controls. Gallium arsenide semiconductors provide superior performance in radar systems and satellite communications, while high-purity quartz forms the foundation of aircraft computer systems and flight management technology.
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
                Number of active mines by country for each critical mineral used in aerospace manufacturing, showing the geographic distribution of global mining operations.
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

              {/* Cobalt Chart */}
              <div className="mineral-chart-item">
                <h3 className="mineral-title">Cobalt</h3>
                <div className="pie-chart-wrapper-small">
                  <Pie data={cobaltData} options={pieOptions} />
                </div>
              </div>

              {/* Tungsten Chart */}
              <div className="mineral-chart-item">
                <h3 className="mineral-title">Tungsten</h3>
                <div className="pie-chart-wrapper-small">
                  <Pie data={tungstenData} options={pieOptions} />
                </div>
              </div>

              {/* Magnesite Chart */}
              <div className="mineral-chart-item">
                <h3 className="mineral-title">Magnesite</h3>
                <div className="pie-chart-wrapper-small">
                  <Pie data={magnesiteData} options={pieOptions} />
                </div>
              </div>

              {/* Bauxite Chart */}
              <div className="mineral-chart-item">
                <h3 className="mineral-title">Bauxite</h3>
                <div className="pie-chart-wrapper-small">
                  <Pie data={bauxiteData} options={pieOptions} />
                </div>
              </div>

              {/* Titanium Chart */}
              <div className="mineral-chart-item">
                <h3 className="mineral-title">Titanium</h3>
                <div className="pie-chart-wrapper-small">
                  <Pie data={titaniumData} options={pieOptions} />
                </div>
              </div>

              {/* Gallium Chart */}
              <div className="mineral-chart-item">
                <h3 className="mineral-title">Gallium</h3>
                <div className="pie-chart-wrapper-small">
                  <Pie data={galliumData} options={pieOptions} />
                </div>
              </div>

              {/* Quartz Chart */}
              <div className="mineral-chart-item">
                <h3 className="mineral-title">Quartz</h3>
                <div className="pie-chart-wrapper-small">
                  <Pie data={siliconData} options={pieOptions} />
                </div>
              </div>

            </div>
          </div>

          {/* Line Chart Section */}
          <div className="chart-section">
            <div className="chart-decoration-left"></div>

            <div className="line-chart-header">
              <p className="line-chart-description">
                Recent price volatility in key aerospace minerals reflecting supply chain
                dynamics and increasing demand from next-generation aircraft production.
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
              <strong>Mineral consumption data:</strong> Based on industry estimates and research from aerospace manufacturers, aircraft certification bodies, and materials engineering studies.
            </p>

            <p className="sources-paragraph">
              <strong>Mining country distribution:</strong> Represents approximate global production shares for aerospace-relevant minerals from various geological surveys and mining industry associations.
            </p>

            <p className="sources-paragraph">
              <strong>Price data:</strong> Simulated price trends based on historical market patterns and commodity price movements. Actual prices may vary.
            </p>

            <p className="sources-paragraph">
              For the most current and accurate data, please consult official industry reports, government geological surveys, and aerospace industry publications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aerospace;