// src/AppRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AllArtist from './pages/AllArtist';
import ArtistDetail from './pages/ArtistDetail';
import CreateArtist from './pages/CreateArtist';
import AllSeries from './pages/AllSeries';
import SeriesDetail from './pages/SeriesDetail';
import CreateSeries from './pages/CreateSeries';
import AllCollection from './pages/AllCollection';
import AllCharacter from './pages/AllCharacter';
import AllReseller from './pages/AllReseller';
import AllSale from './pages/AllSale';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/artist" element={<AllArtist />} />
      <Route path="/artist/:id" element={<ArtistDetail />} />
      <Route path="/create-artist" element={<CreateArtist />} />
      <Route path="/series" element={<AllSeries />} />
      <Route path="/series/:id" element={<SeriesDetail />} />
      <Route path="/create-series" element={<CreateSeries />} />
      <Route path="/collection" element={<AllCollection />} />
      <Route path="/character" element={<AllCharacter />} />
      <Route path="/reseller" element={<AllReseller />} />
      <Route path="/sale" element={<AllSale />} />
    </Routes>
  );
};

export default AppRoutes;