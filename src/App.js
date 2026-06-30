import React from 'react';
import { ToastContainer } from "react-toastify";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './Routing/Index';
import "./App.css";
import Header from "./Components/Header/Header";

const App = () => {
  return (

    <Router>
      <Header />
      <Routes>


        <Route path="/*" element={<Index />} />
      </Routes>
      <ToastContainer />

    </Router>


  );
};

export default App;
