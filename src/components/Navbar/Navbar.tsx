import { NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar: React.FC = () => {
  return (
    <ul>
<<<<<<< HEAD
      <li className="Homepage"><Link to="/">Homepage</Link></li>
      <li className="SucheFilter"><Link to="/suchefilter">Suche-Filter</Link></li>
      <li className="AboutUs"><Link to="/aboutus">AboutUs</Link></li>
      <li className="Kontakt"><Link to="/kontakt">Kontakt</Link></li>
      <li className="Anmelden"><Link to="/anmelden">Anmelden</Link></li>
=======
      <li>
        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
          Homepage
        </NavLink>
      </li>
      <li>
        <NavLink to="/suche" className={({ isActive }) => (isActive ? "active" : "")}>
          Suche
        </NavLink>
      </li>
      <li>
        <NavLink to="/überuns" className={({ isActive }) => (isActive ? "active" : "")}>
          Über Uns
        </NavLink>
      </li> 
      <li>
        <NavLink to="/kontakt" className={({ isActive }) => (isActive ? "active" : "")}>
          Kontakt
        </NavLink>
      </li>
      <li>
        <NavLink to="/anmelden" className={({ isActive }) => (isActive ? "active" : "")}>
          Anmelden
        </NavLink>
      </li>
>>>>>>> 6bbc25baba6fb08503952ab5fcfa654fd325a088
    </ul>
  );
};

export default NavBar;