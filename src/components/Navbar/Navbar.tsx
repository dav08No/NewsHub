import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <ul>
      <li className="Home"><Link to="/home">Home</Link></li>
      <li className="Suche-Filter"><Link to="/suche-filter">Suche-Filter</Link></li>
      <li className="AboutUs"><Link to="/aboutus">AboutUs</Link></li>
      <li className="Kontakt"><Link to="/kontakt">Kontakt</Link></li>
      <li className="Anmelden"><Link to="/anmelden">Anmelden</Link></li>
    </ul>
  );
};

export default NavBar;