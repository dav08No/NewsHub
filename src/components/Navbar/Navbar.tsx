import { NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <ul>
      <li>
        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
          Homepage
        </NavLink>
      </li>
      <li>
        <NavLink to="/suchefilter" className={({ isActive }) => (isActive ? "active" : "")}>
          Suche-Filter
        </NavLink>
      </li>
      <li>
        <NavLink to="/aboutus" className={({ isActive }) => (isActive ? "active" : "")}>
          About Us
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