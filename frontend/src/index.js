import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import Home from "./components/View/Home";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<App />}/>
          <Route path="/home" element={<Home />}/>
      </Routes>
    </BrowserRouter>

);
