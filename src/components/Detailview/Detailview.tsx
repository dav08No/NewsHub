import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import "./Detailview.css";

const Detailview: React.FC = () => {
  // Access the location object from React Router to retrieve passed state
  const { state } = useLocation();
  const { t } = useTranslation();

  // Extract the article data from the location state
  const article = state?.article;

  // If no article data is found, display a message
  if (!article) return <p>{t("errors.not-found")}</p>;
  if (!article.description)
    return (
      <div className="detailview-container">
        <div className="img-article-container">
          <h1>{article.title}</h1>
          <img src={article.image_url} alt={article.title} />
          <div className="article-container">
            <p className="article">
              {" "}
              <span className="article-title">{t('errors.description')}</span>{" "}
            </p>
          </div>
          <a href={article.link} target="_blank" rel="noopener noreferrer">
         {t('detailview.link')}
        </a>
        </div>
      </div>
    );
  else
    return (
      <div className="detailview-container">
        <div className="img-article-container">
          <h1 className="title">{article.title}</h1>
          <img
            className="detailview-img"
            src={article.image_url}
            alt={article.title}
          />
          <div className="article-container">
            <p className="article">
              {" "}
              <span className="article-title">Beschreibung:</span> <br />{" "}
              <span className="article-description">{article.description}</span>
            </p>
          </div>
          <a href={article.link} target="_blank" rel="noopener noreferrer" className="link">
          {t('detailview.link')}
          </a>
        </div>
      </div>
    );
};

export default Detailview;
