import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListProduce from './pages/ListProduce';

import Login from './pages/Login';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/list-produce" element={<ListProduce />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
