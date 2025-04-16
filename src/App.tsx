import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar/NavBar";
import Homepage from "./components/Homepage/Homepage";
import Home from "./components/Home/Home";
import SucheFilter from "./components/SucheFilter/SucheFilter";
import AboutUs from "./components/AboutUs/AboutUs";
import Kontakt from "./components/Kontakt/Kontakt";
import Anmelden from "./components/Anmelden/Anmelden";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Homepage />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/suche-filter" element={<SucheFilter />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/kontakt" element={<Kontakt />} />
        <Route path="/anmelden" element={<Anmelden />} />
      </Routes>
    </Router>
  );
};

export default App;
