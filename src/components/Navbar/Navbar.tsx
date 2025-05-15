import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";
import "./NavBar.css";

const NavBar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Handle language change
  const changeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const language = event.target.value;
    i18n.changeLanguage(language);
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);

    // Prevent scrolling when menu is open
    if (!menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  // Close menu after clicking a link
  const closeMenu = () => {
    if (menuOpen) {
      setMenuOpen(false);
      document.body.style.overflow = '';
    }
  };

  // Close menu when window is resized
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992 && menuOpen) {
        setMenuOpen(false);
        document.body.style.overflow = '';
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node) && menuOpen) {
        setMenuOpen(false);
        document.body.style.overflow = '';
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
        document.body.style.overflow = '';
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [menuOpen]);

  return (
    <nav className={menuOpen ? "nav-open" : ""} ref={navRef}>
      <div className="nav-container">
        <button
          className="menu-toggle"
          onClick={toggleMenu}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
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
                aria-label={t('accessibility.selectLanguage') || "Select language"}
              >
                <option value="en" className="language-selector-option">English</option>
                <option value="de" className="language-selector-option">Deutsch</option>
                <option value="fr" className="language-selector-option">Français</option>
              </select>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;