import "./AboutUs.css";

const AboutUs = () => {
  return (
    <>
      <div className="container">
        <h1 className="title-about">Über uns</h1>
        <div className="textTeam">
          <h3 className="title-ourTeam">Unser Team</h3>
          <p>
            Unser Team besteht aus fünf leidenschaftlichen Programmierern, die
            gemeinsam diese Newswebseite entwickelt haben. Mit Herzblut,
            Kreativität und technischem Know-how haben wir eine Plattform
            geschaffen, die Informationen modern und zugänglich macht.
          </p>
          <div className="pepole">
            <div className="description">
              <img className="profile" src="profile.jpg" />
              <h3>Fabian Spiri</h3>
              <p>17 Jahre 1.Lehrjahr</p>
            </div>
            <div className="description">
              <img className="profile" src="profile.jpg" />
              <h3>Davide Nocito</h3>
              <p>16 Jahre 1.Lehrjahr</p>
            </div>
            <div className="description">
              <img className="profile" src="profile.jpg" />
              <h3>Leon Gjidoda</h3>
              <p>16 Jahre 1.Lehrjahr</p>
            </div>

            <div className="description">
              <img className="profile" src="profile.jpg" />
              <h3>Flurin Manella</h3>
              <p>15 Jahre 1.Lehrjahr</p>
            </div>
            <div className="description">
              <img className="profile" src="profile.jpg" />
              <h3>Joel Nigg</h3>
              <p>16 Jahre 1.Lehrjahr</p>
            </div>
            <div className="description">
              <img className="profile" src="profile.jpg" />
              <h3>Vielleicht Du</h3>
              <p>
                Schreibe uns über <br />
                die Kontaktseite an!
              </p>
            </div>
          </div>
        </div>
        <div className="textProjekt">
          <h3 className="title-ourProject">Unser Projekt</h3>

          <p>
            Unsere Idee unseres Projektes war, eine Website zu erstellen, auf
            der man im Allgemeinen die wichtigsten Nachrichten der letzten Zeit
            anschauen kann. Wir haben dafür die API News API verwendet, um die
            Nachrichten auch zu erhalten und sie anzuschauen.
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
