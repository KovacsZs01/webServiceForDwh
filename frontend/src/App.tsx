import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import CarProduction from './pages/CarProduction';
import Aerospace from './pages/Aerospace';
import './App.css'
import StainlessSteel from './pages/StainlessSteel';
import Introduction from './pages/Introduction';
import Fertilizer from './pages/Fertilizer';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Introduction />} />
            <Route path="/introduction" element={<Introduction />} />
            <Route path="/car-production" element={<CarProduction />} />
            <Route path="/aerospace" element={<Aerospace />} />
            <Route path="/fertilizer" element={<Fertilizer />} />
            <Route path="/stainless-steel" element={<StainlessSteel />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
