import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar/Navbar";
import Homepage from "./components/Homepage/Homepage";
import Filterpage from "./components/Filterpage/Filterpage";
import AboutUs from "./components/AboutUs/AboutUs";
import Kontakt from "./components/Kontakt/Kontakt";
import ChatComponent from "./components/Chatbot/ChatComponent";
import Detailview from "./components/Detailview/Detailview";
import './i18n';
const App = () => {
  return (
    <div className="max-w-lg mt-20 mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <Router>
        <NavBar />
        <div className="w-full max-w-lg bg-white shadow-lg rounded-lg overflow-hidden">
        </div>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/filter" element={<Filterpage />} />
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
