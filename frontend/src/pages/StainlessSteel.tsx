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
import './StainlessSteel.css';
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

interface StainlessSteelData {
  chromium: CountryValues[];
  nickel: CountryValues[];
  iron: CountryValues[];
  quartz: CountryValues[];
  manganese: CountryValues[];
  priceData?: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
    }>;
  };
}

const StainlessSteel: React.FC = () => {
  const [data, setData] = useState<StainlessSteelData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/stainlesssteel');
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
        <p style={{ color: 'white', marginLeft: '1rem' }}>Loading stainless steel data...</p>
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

  // Mineral data for stainless steel industry
  const chromiumData = {
    labels: data.chromium.map(item => item.country),
    datasets: [
      {
        label: 'Active Chromium Mines by Country',
        data: data.chromium.map(item => parseInt(item.count)),
        backgroundColor: ['#433A3F', '#6B6067', '#93868F', '#BBACB7', '#DFDFDF'],
        borderColor: ['rgba(67, 58, 63, 0.8)'],
        borderWidth: 2,
        hoverOffset: 15,
      },
    ],
  };

  const nickelData = {
    labels: data.nickel.map(item => item.country),
    datasets: [
      {
        label: 'Active Nickel Mines by Country',
        data: data.nickel.map(item => parseInt(item.count)),
        backgroundColor: ['#333333', '#555555', '#777777', '#999999', '#AAAAAA'],
        borderColor: ['rgba(51, 51, 51, 0.8)'],
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

  const quartz = {
    labels: data.quartz.map(item => item.country),
    datasets: [
      {
        label: 'Active Quartz Mines by Country',
        data: data.quartz.map(item => parseInt(item.count)),
        backgroundColor: ['#B8E1FF', '#C4B5D9', '#D08AB3', '#DC5F8D', '#C08497'],
        borderColor: ['rgba(184, 225, 255, 0.8)'],
        borderWidth: 2,
        hoverOffset: 15,
      },
    ],
  };

  const manganeseData = {
    labels: data.manganese.map(item => item.country),
    datasets: [
      {
        label: 'Active Manganese Mines by Country',
        data: data.manganese.map(item => parseInt(item.count)),
        backgroundColor: ['#FF928B', '#E4776F', '#C95C53', '#AE4137', '#4E0110'],
        borderColor: ['rgba(255, 146, 139, 0.8)'],
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
    <div className="stainlesssteel-container">
      <div className="stainlesssteel-content">

        {/* Header Section */}
        <div className="header-section">
          <h1 className="main-title">
            Stainless Steel
          </h1>
        </div>

        {/* Industry Label Section */}
        <div className="industry-label-section">
          <h2 className="industry-label-title">Stainless Steel Manufacturing Industry</h2>
          <p className="industry-label-subtitle">Critical Alloy Components & Mining Supply Chains</p>
        </div>

        {/* Content Description */}
        <div className="overview-section">
          {/* Stainless Steel Manufacturing Overview */}
          <div className="subsection">
            <h3 className="subsection-title">Stainless Steel Manufacturing Process</h3>

            <p className="subsection-text">
              Stainless steel manufacturing is a complex metallurgical process that combines multiple mined raw materials to create corrosion-resistant alloys. The main steps include raw material preparation, electric arc furnace melting, refining, continuous casting, and hot/cold rolling. The process requires precise control of chemical composition and temperature to achieve the desired properties.
            </p>

            <p className="subsection-text">
              The essential minerals used in stainless steel production each serve specific purposes: chromium provides corrosion resistance and is the defining element (minimum 10.5%), nickel enhances ductility and toughness, iron forms the base matrix, silicon acts as a deoxidizer and improves high-temperature properties, and manganese stabilizes the austenitic structure and improves workability. These materials are sourced from active mining operations worldwide, with supply chain geography significantly impacting production costs and availability.
            </p>
          </div>

          {/* Critical Minerals Section */}
          <div className="subsection">
            <h3 className="subsection-title">Critical Raw Materials in Stainless Steel Production</h3>

            <p className="subsection-text">
              <strong>Chromium:</strong> The most critical alloying element, typically comprising 12-30% of stainless steel composition. Chromium creates a passive oxide layer that provides corrosion resistance and gives stainless steel its characteristic properties.
            </p>

            <p className="subsection-text">
              <strong>Nickel:</strong> Essential for austenitic grades, providing excellent ductility, formability, and enhanced corrosion resistance. Nickel content typically ranges from 8-20% in common stainless steel grades.
            </p>

            <p className="subsection-text">
              <strong>Iron, Silicon, and Manganese:</strong> Iron serves as the base metal matrix, silicon improves oxidation resistance and strength at high temperatures, while manganese enhances hardenability and contributes to austenite stabilization in various steel grades.
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
                Number of active mines by country for each critical mineral used in stainless steel manufacturing, showing the geographic distribution of global mining operations.
              </p>
            </div>

            {/* Mineral Charts Grid */}
            <div className="mineral-charts-container">

              {/* Chromium Chart */}
              <div className="mineral-chart-item">
                <h3 className="mineral-title">Chromium</h3>
                <div className="pie-chart-wrapper-small">
                  <Pie data={chromiumData} options={pieOptions} />
                </div>
              </div>

              {/* Nickel Chart */}
              <div className="mineral-chart-item">
                <h3 className="mineral-title">Nickel</h3>
                <div className="pie-chart-wrapper-small">
                  <Pie data={nickelData} options={pieOptions} />
                </div>
              </div>

              {/* Iron Chart */}
              <div className="mineral-chart-item">
                <h3 className="mineral-title">Iron</h3>
                <div className="pie-chart-wrapper-small">
                  <Pie data={ironData} options={pieOptions} />
                </div>
              </div>

              {/* Silicon Chart */}
              <div className="mineral-chart-item">
                <h3 className="mineral-title">Quartz</h3>
                <div className="pie-chart-wrapper-small">
                  <Pie data={quartz} options={pieOptions} />
                </div>
              </div>

              {/* Manganese Chart */}
              <div className="mineral-chart-item">
                <h3 className="mineral-title">Manganese</h3>
                <div className="pie-chart-wrapper-small">
                  <Pie data={manganeseData} options={pieOptions} />
                </div>
              </div>

            </div>
          </div>

          {/* Line Chart Section */}
          <div className="chart-section">
            <div className="chart-decoration-left"></div>

            <div className="line-chart-header">
              <p className="line-chart-description">
                Recent price volatility in key stainless steel raw materials reflecting supply chain
                dynamics and increasing demand from global steel production.
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
              <strong>Mineral consumption data:</strong> Based on industry estimates and research from stainless steel manufacturers, metallurgical research institutions, and mining industry reports.
            </p>

            <p className="sources-paragraph">
              <strong>Mining country distribution:</strong> Represents approximate global production shares for stainless steel-relevant minerals from various geological surveys and industry associations.
            </p>

            <p className="sources-paragraph">
              <strong>Price data:</strong> Simulated price trends based on historical market patterns and commodity price movements. Actual prices may vary.
            </p>

            <p className="sources-paragraph">
              For the most current and accurate data, please consult official industry reports, government geological surveys, and steel industry publications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StainlessSteel;