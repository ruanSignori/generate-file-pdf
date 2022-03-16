import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import ListOfUsers from './pages/ListOfUsers';

import Stats from './components/stats';
import Nav from './components/nav';

import './App.css';

export function App(){
    return (
      <div className='page'>
          <Router>
            <Nav />
              <Routes>
                <Route path="/" element={<Stats />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/ListOfUsers" element={<ListOfUsers />} />
              </Routes>
          </Router>
      </div>
    );
}
