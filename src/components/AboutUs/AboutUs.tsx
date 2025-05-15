import './AboutUs.css';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

const AboutUs = () => {
  const { t } = useTranslation();

  // Animate elements when they become visible
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.2 });

    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="container">
      <h1 className="title">{t('about.title')}</h1>

      <section className="textTeam fade-in myMargin" >
        <h2 className="title-ourTeam">{t('about.team')}</h2>
        <p className="team-intro">
          {t('about.start')}
        </p>

        <div className="pepole">
          <div className="description fade-in">
            <img className="profile" src="profile.jpg" alt="Fabian Spiri" />
            <h3>Fabian Spiri</h3>
            <p>{t('about.17')}</p>
          </div>

          <div className="description fade-in">
            <img className="profile" src="profile.jpg" alt="Davide Nocito" />
            <h3>Davide Nocito</h3>
            <p>{t('about.16')}</p>
          </div>

          <div className="description fade-in">
            <img className="profile" src="profile.jpg" alt="Leon Gjidoda" />
            <h3>Leon Gjidoda</h3>
            <p>{t('about.16')}</p>
          </div>

          <div className="description fade-in">
            <img className="profile" src="profile.jpg" alt="Flurin Manella" />
            <h3>Flurin Manella</h3>
            <p>{t('about.15')}</p>
          </div>

          <div className="description fade-in">
            <img className="profile" src="profile.jpg" alt="Joel Nigg" />
            <h3>Joel Nigg</h3>
            <p>{t('about.16')}</p>
          </div>

          <div className="description fade-in contact-card">
            <img className="profile" src="profile.jpg" alt="Contact" />
            <h3>{t('about.vlt')}</h3>
            <p className="about-contact" dangerouslySetInnerHTML={{ __html: t('about.contact') }} />
          </div>
        </div>
      </section>

      <section className="textProjekt fade-in">
        <h2 className="title-ourProject">{t('about.projekt')}</h2>
        <p>{t('about.text')}</p>
      </section>
    </div>
  );
};

export default AboutUs;