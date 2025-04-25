import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const Detailview: React.FC = () => {
  // Access the location object from React Router to retrieve passed state
  const { state } = useLocation();
  const { t } = useTranslation();

  // Extract the article data from the location state
  const article = state?.article;

  // If no article data is found, display a message
  if (!article) return <p>{t('errors.not-found')}</p>;

  return (
    <div>
      <h1>{article.title}</h1>

      <img src={article.image_url} alt={article.title} />

      <p>{t('detailview.categories')}<br /> {article.category.join(", ")}</p>
      <p>{t('detailview.countrys')}<br /> {article.country.join(", ")}</p>

      <p>{t('detailview.description')}<br /> {article.description}</p>

      <a href={article.link} target="_blank" rel="noopener noreferrer">
        {t('detailview.link')}
      </a>
    </div>
  );
};

export default Detailview;
