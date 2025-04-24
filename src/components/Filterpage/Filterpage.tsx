import React, { useEffect, useState } from "react";
import Select from "react-select";
import countriesData from "./countries.json";
import categorysData from "./categorys.json";
import "./Filterpage.css";
import { ArticleType } from "../Homepage/Homepage";
import { Link } from "react-router-dom";

type Country = {
  name: string;
  code: string;
};

type CountryOption = {
  value: string;
  label: string;
};

type CategoryOption = {
  value: string;
  label: string;
};

type Category = string;

const Filterpage = () => {
  const [query, setQuery] = useState<string>(""); // value must be URL-encoded and the maximum character limit permitted is 100
  const [selectedCountries, setSelectedCountries] = useState<
    CountryOption[] | null
  >(null);
  const [selectedCategories, setSelectedCategories] = useState<
    CategoryOption[] | null
  >(null);
  const [articles, setArticles] = useState<ArticleType[]>([]);
  // State to track whether articles are being loaded
  const [isLoading, setIsLoading] = useState(false);

  const countries: Country[] = countriesData as Country[];
  const categories: Category[] = categorysData.categorys as Category[];

  const countryOptions: CountryOption[] = countries.map((c) => ({
    value: c.code,
    label: c.name,
  }));

  const categoryOptions: CategoryOption[] = categories.map((cat) => ({
    value: cat,
    label: cat,
  }));

  // Array of API keys to use in case one hits its rate limit
  const apiKeys = [
    "pub_808525d68114469f62b1f6a43852d9efefa5e", // Davide
    "pub_811242e708de4442cba69eb51a033854b4acd", // Fabian
    "pub_811282fa4967114ded81a5e6113a43759389d", // Joel
    "pub_81184c0cf9b608ff16835478331619519d935", // Davide
    "pub_82495cbea35080abad1e930ac1d03d2e3120a", // Flurin / Minion
    "pub_82499e416d9e96f438501b7195d708f135d86", // Flurin / Minion
    "pub_825006980031d31dab6b2d91aced6dce9ebb3", // Leon
    "pub_825019d0afdcc7b687fe5f2511c087911deab", // Flurin / Minion
  ];

  // Function that fetches articles from the news API
  const filterArticles = async () => {
    setIsLoading(true); // Start loading state

    const fetchedArticles: any[] = []; // Hold all fetched articles
    const articleFetchLimit = 40; // Maximum number of articles to fetch in total

    // Try each API key in sequence until articles are fetched successfully
    for (let i = 0; i < apiKeys.length; i++) {
      if (fetchedArticles.length >= articleFetchLimit) break;

      const apiKey = apiKeys[i];
      console.log(`Using API key ${apiKey}`);

      try {
        let nextPage: string | null = null;

        // Continue fetching pages from the current API key until limit is reached or no more pages
        while (fetchedArticles.length < articleFetchLimit) {
          const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&language=de,en${
            nextPage ? `&page=${nextPage}` : ""
          }${
            selectedCategories && selectedCategories.length > 0
              ? `&category=${selectedCategories.map((c) => c.value).join(",")}`
              : ""
          }${
            selectedCountries && selectedCountries.length > 0
              ? `&country=${selectedCountries.map((c) => c.value).join(",")}`
              : ""
          }          ${query !== "" ? `&q=${query}` : ""}`;
          const response = await fetch(url);

          // Stop using this key if rate limit is reached
          if (response.status === 429) {
            console.warn(`Rate limit reached for API key ${apiKey}`);
            break;
          }

          const data = await response.json();
          if (!data?.results?.length) break;

          // Add the fetched results to the total
          fetchedArticles.push(...data.results);
          nextPage = data.nextPage || null;

          // If there is no next page, exit loop
          if (!nextPage) break;
        }
      } catch (err) {
        // If fetch fails, continue with next API key
        console.error("Error: ", err);
      }
    }

    // Filter and normalize the articles for display
    const titleSet = new Set<string>(); // Used to avoid duplicates by title
    const finalArticles: ArticleType[] = [];

    for (
      let i = 0;
      i < fetchedArticles.length && finalArticles.length < 25;
      i++
    ) {
      const article = fetchedArticles[i];
      if (!article) continue;

      // Normalize and validate each article
      const validArticle: ArticleType = {
        id: article.id,
        title: article.title,
        link: article.link,
        category: article.category,
        description: article.description,
        image_url: article.image_url,
        language: article.language,
        source_name: article.source_name,
        source_link: article.source_link,
        country: article.country,
      };

      // Avoid adding duplicate titles
      if (!titleSet.has(validArticle.title)) {
        titleSet.add(validArticle.title);
        finalArticles.push(validArticle);
      }
    }

    // Update state with the final filtered article list
    setArticles(finalArticles);
    setIsLoading(false); // Loading complete
  };

  return (
    <div className="filterpage-container">
      <h1>Filtern</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Query:", query);
          console.log("Selected Countries:", selectedCountries);
          console.log("Selected Categories:", selectedCategories);
        }}
      >
        <div className="form-group">
          <label htmlFor="query">Suchen</label>
          <input
            type="text"
            name="query"
            id="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            maxLength={100}
          />
        </div>

        <div className="form-group">
          <label htmlFor="countries">Länder</label>
          <div className="countrie-select-container">
            <Select
              isMulti
              name="countries"
              options={countryOptions}
              className="countrie-select"
              classNamePrefix="select"
              placeholder="Länder auswählen..."
              onChange={(selected) =>
                setSelectedCountries(selected as CountryOption[])
              }
              value={selectedCountries}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="categories">Kategorien</label>
          <div className="category-button-container">
            {categoryOptions.map((category) => (
              <button
                key={category.value}
                className={
                  selectedCategories?.some((sc) => sc.value === category.value)
                    ? "category-button-selected"
                    : "category-button"
                }
                onClick={() => {
                  if (
                    selectedCategories?.some(
                      (sc) => sc.value === category.value
                    )
                  ) {
                    // If already selected, remove it
                    setSelectedCategories(
                      selectedCategories.filter(
                        (sc) => sc.value !== category.value
                      )
                    );
                  } else {
                    // If not selected, add it
                    setSelectedCategories(
                      selectedCategories
                        ? [...selectedCategories, category]
                        : [category]
                    );
                  }
                }}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="submit-button"
          onClick={filterArticles}
        >
          Anwenden
        </button>
      </form>
      {isLoading ? (
        // Show loading message while fetching data
        <p>Loading articles...</p>
      ) : articles.length > 0 ? (
        // Render each article if available
        articles
          .filter((article) => !!article.image_url) // Only articles with an Imageurl
          .map((art, index) => (
            <Link
              to={`/article/${index}`}
              state={{ article: art }}
              className="article-link"
              key={art.id}
            >
              <div
                className="articles-container"
                key={art.id}
                id={index.toString()}
              >
                <h1 className="article-title">{art.title}</h1>
                <img className="article-img" src={art.image_url} />
                <p className="article-categorys">{art.category.join(", ")}</p>
              </div>
            </Link>
          ))
      ) : (
        // Fallback message if no articles are available
        <p>No articles available. Please try again later.</p>
      )}
    </div>
  );
};

export default Filterpage;
