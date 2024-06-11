import CustomSidenav from './components/CustomSidenav';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Artist from './components/Artist';
import Series from './components/Series';
import Collection from './components/Collection';
import Character from './components/Character';
import Reseller from './components/Reseller';
import Sale from './components/Sale';
import CustomNavbar from './components/CustomNavbar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <CustomNavbar />
        <div className="main-container">
          <CustomSidenav />
          <div className="content-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/artist" element={<Artist />} />
              <Route path="/series" element={<Series />} />
              <Route path="/collection" element={<Collection />} />
              <Route path="/character" element={<Character />} />
              <Route path="/reseller" element={<Reseller />} />
              <Route path="/sale" element={<Sale />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
