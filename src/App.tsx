import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar/Navbar";
import Homepage from "./components/Homepage/Homepage";
import Filterpage from "./components/Filterpage/Filterpage";
import AboutUs from "./components/AboutUs/AboutUs";
import Kontakt from "./components/Kontakt/Kontakt";
import Anmelden from "./components/Anmelden/Anmelden";
import Detailview from "./components/Detailview/Detailview";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/filter" element={<Filterpage />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/kontakt" element={<Kontakt />} />
        <Route path="/anmelden" element={<Anmelden />} />
        <Route path="/article/:id" element={<Detailview />} />
      </Routes>
    </Router>
  );
};

export default App;
