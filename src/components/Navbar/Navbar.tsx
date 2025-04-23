import { NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar: React.FC = () => {
  return (
    <ul>
      <li className="Homepage"><Link to="/">Homepage</Link></li>
      <li className="SucheFilter"><Link to="/suchefilter">Suche-Filter</Link></li>
      <li className="AboutUs"><Link to="/aboutus">AboutUs</Link></li>
      <li className="Kontakt"><Link to="/kontakt">Kontakt</Link></li>
      <li className="Anmelden"><Link to="/anmelden">Anmelden</Link></li>
    </ul>
  );
};

export default NavBar;