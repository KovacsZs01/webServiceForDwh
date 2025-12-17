import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <h2>Industry Analytics</h2>
        </div>
        <ul className="nav-links">
          <li>
            <Link 
              to="/introduction" 
              className={isActive('/introduction') ? 'active' : ''}
            >
              Introduction
            </Link>
          </li>
          <li>
            <Link 
              to="/car-production" 
              className={isActive('/car-production') ? 'active' : ''}
            >
              Automotive
            </Link>
          </li>
          <li>
            <Link 
              to="/aerospace" 
              className={isActive('/aerospace') ? 'active' : ''}
            >
              Aerospace
            </Link>
          </li>
          <li>
            <Link 
              to="/fertilizer" 
              className={isActive('/fertilizer') ? 'active' : ''}
            >
              Fertilizer
            </Link>
          </li>
          <li>
            <Link 
              to="/stainless-steel" 
              className={isActive('/stainless-steel') ? 'active' : ''}
            >
              Steel
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;