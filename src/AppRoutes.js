// src/AppRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AllArtist from './pages/AllArtist';
import ArtistDetail from './pages/ArtistDetail';
import CreateArtist from './pages/CreateArtist';
import AllSeries from './pages/AllSeries';
import SeriesDetail from './pages/SeriesDetail';
import CollectionDetail from './pages/CollectionDetail';
import ItemDetail from './pages/ItemDetail';
import CreateSeries from './pages/CreateSeries';
import AllCollection from './pages/AllCollection';
import AllItem from './pages/AllItem';
import AllReseller from './pages/AllReseller';
import AllSale from './pages/AllSale';
import CreateCollection from './pages/CreateCollection';
import CreateReseller from './pages/CreateReseller';
import CreateItem from './pages/CreateItem';
import ResellerDetail from './pages/ResellerDetail';

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
      <Route path="/collection/:id" element={<CollectionDetail />} />
      <Route path="/create-collection" element={<CreateCollection />} />
      <Route path="/item" element={<AllItem />} />
      <Route path="/item/:id" element={<ItemDetail />} />
      <Route path="/create-item" element={<CreateItem />} />
      <Route path="/reseller" element={<AllReseller />} />
      <Route path="/reseller/:id" element={<ResellerDetail />} />
      <Route path="/create-reseller" element={<CreateReseller />} />
      <Route path="/sale" element={<AllSale />} />
    </Routes>
  );
};

export default AppRoutes;
