import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Homepage from "./components/Homepage/Homepage";
import SucheFilter from "./components/SucheFilter/SucheFilter";
import AboutUs from "./components/AboutUs/AboutUs";
import Kontakt from "./components/Kontakt/Kontakt";
import ChatComponent from "./ChatComponent";
import Detailview from "./components/Detailview/Detailview";

const App = () => {
  return (
    <div className="max-w-lg mt-20 mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <Router>
        <NavBar />
        <div className="w-full max-w-lg bg-white shadow-lg rounded-lg overflow-hidden">
        </div>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/suche" element={<SucheFilter />} />
          <Route path="/überuns" element={<AboutUs />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/chatbot" element={<ChatComponent />} />
          <Route path="/article/:id" element={<Detailview />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
