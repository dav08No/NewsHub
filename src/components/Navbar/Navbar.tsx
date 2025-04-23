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
        <NavLink to="/chatbot" className={({ isActive }) => (isActive ? "active" : "")}>
          Chat Bot
        </NavLink>
      </li>
    </ul>
  );
};

export default NavBar;
