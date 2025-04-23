import React from "react";
import { useLocation } from "react-router-dom";

const Detailview: React.FC = () => {
  // Access the location object from React Router to retrieve passed state
  const { state } = useLocation();

  // Extract the article data from the location state
  const article = state?.article;

  // If no article data is found, display a message
  if (!article) return <p>Artikel nicht gefunden.</p>;

  return (
    <div>
      <h1>{article.title}</h1>

      <img src={article.image_url} alt={article.title} />

      <p>Kategorie: {article.category.join(", ")}</p>
      <p>Countys: {article.country.join(", ")}</p>

      <p>{article.description}</p>

      <a href={article.link} target="_blank" rel="noopener noreferrer">
        Zum vollständigen Artikel
      </a>
    </div>
  );
};

export default Detailview;
