import CustomSidenav from './components/CustomSidenav';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Artist from './components/Artist';
import ArtistPage from './components/ArtistPage';
import CreateArtistPage from './components/CreateArtistPage';
import Series from './components/Series';
import SeriesPage from './components/SeriesPage';
import CreateSeriesPage from './components/CreateSeriesPage';
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
        <CustomSidenav />
        <div className="main-container">
          {/* <CustomNavbar /> */}
          <div className="content-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/artist" element={<Artist />} />
              <Route path="/artist/:id" element={<ArtistPage />} />
              <Route path="/create-artist" element={<CreateArtistPage />} />
              <Route path="/series" element={<Series />} />
              <Route path="/series/:id" element={<SeriesPage />} />
              <Route path="/create-series" element={<CreateSeriesPage />} />
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
