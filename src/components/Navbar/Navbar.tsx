import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import "./NavBar.css";

const NavBar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const changeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const language = event.target.value;
    i18n.changeLanguage(language);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Schließt das Menü nach Klick auf einen Link
  const closeMenu = () => {
    if (menuOpen) {
      setMenuOpen(false);
    }
  };

  // Schließt das Menü beim Resize des Fensters
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [menuOpen]);

  return (
    <nav className={menuOpen ? "nav-open" : ""}>
      <div className="nav-container">
        <button
          className="menu-toggle"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        <ul className={menuOpen ? "open" : ""}>
          <li className="nav-list-item">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={closeMenu}
            >
              {t('navigation.homepage')}
            </NavLink>
          </li>
          <li className="nav-list-item">
            <NavLink
              to="/filter"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={closeMenu}
            >
              {t('navigation.search')}
            </NavLink>
          </li>
          <li className="nav-list-item">
            <NavLink
              to="/überuns"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={closeMenu}
            >
              {t('navigation.about')}
            </NavLink>
          </li>
          <li className="nav-list-item">
            <NavLink
              to="/kontakt"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={closeMenu}
            >
              {t('navigation.contact')}
            </NavLink>
          </li>
          <li className="nav-list-item">
            <NavLink
              to="/chatbot"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={closeMenu}
            >
              {t('navigation.chatbot')}
            </NavLink>
          </li>
          <li className="nav-list-item language-item">
            <div className="select-wrapper">
              <select
                onChange={changeLanguage}
                value={i18n.language}
                className="languageSelector"
                aria-label="Sprache auswählen"
              >
                <option value="en" className="language-selector-option">English</option>
                <option value="de" className="language-selector-option">Deutsch</option>
                <option value="fr" className="language-selector-option">Francais</option>
              </select>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;