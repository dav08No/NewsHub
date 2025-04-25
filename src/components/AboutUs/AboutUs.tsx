import "./AboutUs.css";
import { useTranslation } from 'react-i18next';

const AboutUs = () => {

  const { t } = useTranslation();

  return (
    <>
      <div className="container">
        <h1 className="title-about">{t('about.title')}</h1>
        <div className="textTeam">
          <h3 className="title-ourTeam">{t('about.team')}</h3>
          <p>
            {t('about.start')}
          </p>
          <div className="pepole">
            <div className="description">
              <img className="profile" src="profile.jpg" />
              <h3>Fabian Spiri</h3>
              <p>{t('about.17')}</p>
            </div>
            <div className="description">
              <img className="profile" src="profile.jpg" />
              <h3>Davide Nocito</h3>
              <p>{t('about.16')}</p>
            </div>
            <div className="description">
              <img className="profile" src="profile.jpg" />
              <h3>Leon Gjidoda</h3>
              <p>{t('about.16')}</p>
            </div>

            <div className="description">
              <img className="profile" src="profile.jpg" />
              <h3>Flurin Manella</h3>
              <p>{t('about.15')}</p>
            </div>
            <div className="description">
              <img className="profile" src="profile.jpg" />
              <h3>Joel Nigg</h3>
              <p>{t('about.16')}</p>
            </div>
            <div className="description">
              <img className="profile" src="profile.jpg" />
              <h3>{t('about.vlt')}</h3>
              <p>{t('about.contact')}</p>
            </div>
          </div>
        </div>
        <div className="textProjekt">
          <h3 className="title-ourProject"> {t('about.projekt')}</h3>

          <p>{t('about.text')}</p>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
