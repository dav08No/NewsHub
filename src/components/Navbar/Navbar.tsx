import { NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar: React.FC = () => {
  return (
    <ul>
      <li>
        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
          Homepage
        </NavLink>
      </li>
      <li>
        <NavLink to="/filter" className={({ isActive }) => (isActive ? "active" : "")}>
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
    </ul>
  );
};

export default NavBar;