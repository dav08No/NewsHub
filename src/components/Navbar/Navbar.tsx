import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./NavBar.css";

const NavBar: React.FC = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const language = event.target.value;
    i18n.changeLanguage(language);
  };

  return (
    <ul>
      <li>
        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
          {t('navigation.homepage')}
        </NavLink>
      </li>
      <li>
        <NavLink to="/filter" className={({ isActive }) => (isActive ? "active" : "")}>
          {t('navigation.search')}
        </NavLink>
      </li>
      <li>
        <NavLink to="/überuns" className={({ isActive }) => (isActive ? "active" : "")}>
          {t('navigation.about')}
        </NavLink>
      </li>
      <li>
        <NavLink to="/kontakt" className={({ isActive }) => (isActive ? "active" : "")}>
          {t('navigation.contact')}
        </NavLink>
      </li>
      <li>
        <NavLink to="/chatbot" className={({ isActive }) => (isActive ? "active" : "")}>
          {t('navigation.chatbot')}
        </NavLink>
      </li>
      <li>
        <select onChange={changeLanguage} value={i18n.language}>
          <option value="en">English</option>
          <option value="de">Deutsch</option>
          <option value="fr">Francais</option>
        </select>
      </li>
    </ul>
  );
};

export default NavBar;
