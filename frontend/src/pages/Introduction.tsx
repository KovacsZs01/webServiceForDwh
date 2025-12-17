import React from 'react';
import { Link } from 'react-router-dom';
import './Introduction.css';

const Introduction: React.FC = () => {
  return (
    <div className="introduction-container">
      <div className="introduction-content">
        
        {/* Header Section */}
        <div className="header-section">
          <h1 className="main-title">
            Introduction
          </h1>
        </div>

        {/* Industry Label Section */}
        <div className="industry-label-section">
          <h2 className="industry-label-title">Industrial Mineral Dependencies Analysis</h2>
          <p className="industry-label-subtitle">Critical Supply Chains & Global Mining Operations</p>
        </div>
      
        {/* Content Description */}
        <div className="overview-section">
          {/* Purpose Overview */}
          <div className="subsection">
            <h3 className="subsection-title">Purpose and Scope of This Analysis</h3>
            
            <p className="subsection-text">
              This comprehensive analysis platform was created to provide detailed insights into the critical mineral dependencies that underpin modern industrial manufacturing. Each industry page examines the complex relationships between mining operations and industrial production, highlighting how global supply chains affect everything from automotive manufacturing to agricultural productivity.
            </p>
            
            <p className="subsection-text">
              The goal is to demonstrate the interconnected nature of global mineral resources and manufacturing industries, showing how geographic distribution of mining operations influences industrial capabilities, supply chain resilience, and economic dependencies. Through detailed visualizations and data analysis, these pages reveal the hidden mineral foundation of modern industrial society.
            </p>
          </div>

          {/* Methodology Overview */}
          <div className="subsection">
            <h3 className="subsection-title">Analysis Methodology</h3>
            
            <p className="subsection-text">
              Each industry analysis focuses on active mining operations rather than reserve estimates, providing a realistic view of current production capabilities. The data encompasses the top 5 producing countries for each critical mineral, showing both the concentration and geographic distribution of global mining activities. Price trend analysis covers recent three-month periods to capture market volatility and supply chain dynamics.
            </p>
          </div>
        </div>

        {/* Industry Links Section */}
        <div className="industry-links-section">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ 
              fontSize: '24pt', 
              color: '#333',
              lineHeight: '1.4',
              margin: '0 0 0.5rem 0',
              fontWeight: '600'
            }}>
              Industry Analysis Pages
            </h2>
            <p style={{ 
              fontSize: '11pt', 
              color: '#6c757d',
              lineHeight: '1.6',
              margin: '0',
              textAlign: 'center'
            }}>
              Explore detailed mineral dependency analysis for key industrial sectors
            </p>
          </div>

          <div className="industry-links-grid">
            
            {/* Car Production */}
            <Link to="/car-production" className="industry-link-card">
              <h3 className="industry-card-title">Car Production</h3>
              <p className="industry-card-description">
                Comprehensive analysis of automotive manufacturing mineral requirements, focusing on the electric vehicle transition and critical battery materials. Covers copper, lithium, nickel, cobalt, manganese, graphite, and zinc dependencies across global production networks.
              </p>
            </Link>

            {/* Aerospace */}
            <Link to="/aerospace" className="industry-link-card">
              <h3 className="industry-card-title">Aerospace</h3>
              <p className="industry-card-description">
                Detailed examination of aircraft manufacturing mineral dependencies, including specialized alloys and high-performance materials. Analyzes copper, cobalt, tungsten, magnesite, bauxite, titanium, gallium, and quartz supply chains for aviation industry requirements.
              </p>
            </Link>

            {/* Fertilizer */}
            <Link to="/fertilizer" className="industry-link-card">
              <h3 className="industry-card-title">Fertilizer</h3>
              <p className="industry-card-description">
                Analysis of agricultural fertilizer production dependencies on mined raw materials. Examines phosphorite, potash, iron, copper, and zinc supply chains that support global food security through agricultural nutrient production.
              </p>
            </Link>

            {/* Stainless Steel */}
            <Link to="/stainless-steel" className="industry-link-card">
              <h3 className="industry-card-title">Stainless Steel</h3>
              <p className="industry-card-description">
                Comprehensive study of stainless steel manufacturing mineral requirements and alloy composition dependencies. Covers chromium, nickel, iron, silicon, and manganese supply chains essential for corrosion-resistant steel production.
              </p>
            </Link>

          </div>
        </div>

        {/* Key Insights Section */}
        <div className="overview-section">
          <div className="subsection">
            <h3 className="subsection-title">Key Analytical Insights</h3>
            
            <p className="subsection-text">
              <strong>Geographic Concentration:</strong> Critical mineral production is often concentrated in specific regions, creating supply chain vulnerabilities and geopolitical dependencies that affect global industrial capacity.
            </p>
            
            <p className="subsection-text">
              <strong>Industrial Integration:</strong> Modern manufacturing requires complex mineral inputs, with each industry depending on multiple mining operations across different continents to maintain production capabilities.
            </p>
            
            <p className="subsection-text">
              <strong>Market Dynamics:</strong> Mineral price volatility directly impacts industrial production costs, influencing everything from automotive pricing to agricultural productivity through fertilizer costs.
            </p>
          </div>
        </div>

        {/* Data Sources */}
        <div className="data-sources">
          <h4 className="sources-title">Data Sources & Methodology</h4>
          
          <div className="sources-content">
            <p className="sources-paragraph">
              <strong>Note:</strong> All data and statistics presented across these pages are compiled from multiple industry sources and research reports. This platform is designed for educational and analytical purposes to demonstrate industrial mineral dependencies.
            </p>
            
            <p className="sources-paragraph">
              <strong>Mining Data:</strong> Active mine counts and production statistics are derived from geological surveys, mining industry associations, and corporate reports from major mining companies globally.
            </p>
            
            <p className="sources-paragraph">
              <strong>Price Analysis:</strong> Commodity price trends reflect historical market patterns and are used to illustrate market volatility. Actual current prices should be verified through commodity trading platforms.
            </p>
            
            <p className="sources-paragraph">
              <strong>Industrial Requirements:</strong> Mineral consumption data is based on industry estimates from manufacturing associations, research institutions, and technical literature.
            </p>
            
            <p className="sources-paragraph">
              For the most current and accurate data, please consult official industry reports, government geological surveys, and specialized commodity research organizations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;