import React, { useState } from "react";
import Select from "react-select";
import countriesData from "./countries.json";
import categorysData from "./categorys.json";
import "./Filterpage.css";
import { ArticleType } from "../Homepage/Homepage";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Übersetzungsfunktion: verwendet eine kostenlose Google-API zum Übersetzen von Texten (nicht DeepL)
const translateText = async (
  text: string,
  targetLang: string
): Promise<string> => {
  try {
    const res = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(
        text
      )}`
    );
    const data = await res.json();
    return data[0]?.map((t: any) => t[0]).join("") || text;
  } catch (error) {
    console.error("Translation failed", error);
    return text; // Falls Fehler, gib Originaltext zurück
  }
};

// Typdefinitionen für Länder und Kategorien

// Einzelnes Land mit Name und Ländercode
type Country = {
  name: string;
  code: string;
};

// Optionen für react-select Komponenten
type CountryOption = {
  value: string;
  label: string;
};

type CategoryOption = {
  value: string;
  label: string;
};

// Kategorie ist einfacher String
type Category = string;

const Filterpage: React.FC = () => {
  const [query, setQuery] = useState<string>(""); // Suchbegriff (max. 100 Zeichen)
  const [selectedCountries, setSelectedCountries] = useState<
    CountryOption[] | null
  >(null); // Ausgewählte Länder
  const [selectedCategories, setSelectedCategories] = useState<
    CategoryOption[] | null
  >(null); // Ausgewählte Kategorien
  const [articles, setArticles] = useState<ArticleType[]>([]); // Gefundene Artikel
  const [isLoading, setIsLoading] = useState<boolean>(false); // Ladeanzeige
  const [hasFilter, setHasFilter] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState(10);
  const { t, i18n } = useTranslation(); // Lokalisierung

  // Daten aus JSON-Dateien laden und umwandeln
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

  // Liste an API-Schlüsseln zur Umgehung von Rate Limits
  const apiKeys = [
    "pub_808525d68114469f62b1f6a43852d9efefa5e",
    "pub_811242e708de4442cba69eb51a033854b4acd",
    "pub_811282fa4967114ded81a5e6113a43759389d",
    "pub_81184c0cf9b608ff16835478331619519d935",
    "pub_82495cbea35080abad1e930ac1d03d2e3120a",
    "pub_82499e416d9e96f438501b7195d708f135d86",
    "pub_825006980031d31dab6b2d91aced6dce9ebb3",
    "pub_825019d0afdcc7b687fe5f2511c087911deab",
  ];

  // Artikel aus der API filtern, übersetzen und in den State setzen
  const filterArticles = async () => {
    setHasFilter(true);
    setIsLoading(true);
    const fetchedArticles: any[] = []; // Alle gefundenen Roh-Artikel
    const articleFetchLimit = 40; // Max. zu ladende Artikel

    for (let i = 0; i < apiKeys.length; i++) {
      if (fetchedArticles.length >= articleFetchLimit) break;
      const apiKey = apiKeys[i];
      console.log(`Using API key ${apiKey}`);

      try {
        let nextPage: string | null = null;

        while (fetchedArticles.length < articleFetchLimit) {
          // Dynamisch generierter API-Aufruf basierend auf Filterauswahl
          const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&language=de,en${nextPage ? `&page=${nextPage}` : ""
            }${selectedCategories && selectedCategories.length > 0
              ? `&category=${selectedCategories.map((c) => c.value).join(",")}`
              : ""
            }${selectedCountries && selectedCountries.length > 0
              ? `&country=${selectedCountries.map((c) => c.value).join(",")}`
              : ""
            }${query !== "" ? `&q=${query}` : ""}`;

          const response = await fetch(url);

          // Wenn API-Limit erreicht, nächsten Key probieren
          if (response.status === 429) {
            console.warn(`Rate limit reached for API key ${apiKey}`);
            break;
          }

          const data = await response.json();
          if (!data?.results?.length) break;

          fetchedArticles.push(...data.results);
          nextPage = data.nextPage || null;
          if (!nextPage) break;
        }
      } catch (err) {
        console.error("Error: ", err);
      }
    }

    const titleSet = new Set<string>(); // Zum Entfernen doppelter Titel
    const finalArticles: ArticleType[] = []; // Übersetzte und bereinigte Artikel
    const targetLang = i18n.language; // Sprache aus Dropdown

    // Artikel filtern, normalisieren und übersetzen
    for (
      let i = 0;
      i < fetchedArticles.length && finalArticles.length < 25;
      i++
    ) {
      const article = fetchedArticles[i];
      if (!article) continue;

      // Titel und Beschreibung übersetzen
      const translatedTitle = await translateText(
        article.title || "",
        targetLang
      );
      const translatedDesc = await translateText(
        article.description || "",
        targetLang
      );

      const validArticle: ArticleType = {
        id: article.id,
        title: translatedTitle,
        link: article.link,
        category: article.category,
        description: translatedDesc,
        image_url: article.image_url,
        language: article.language,
        source_name: article.source_name,
        source_link: article.source_link,
        country: article.country,
      };

      // Doppelte Titel ausschließen
      if (!titleSet.has(validArticle.title)) {
        titleSet.add(validArticle.title);
        finalArticles.push(validArticle);
      }
    }

    setArticles(finalArticles);
    setIsLoading(false);
  };

  return (
    <div className="filterpage-container">
      <h1 className="title">{t("filter.title")}</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          filterArticles();
        }}
      >
        <div className="form-group">
          <input
            type="text"
            name="query"
            id="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            maxLength={100}
            placeholder={t("filter.search")}
          />
        </div>

        <div className="form-group">
          <div className="countrie-select-container">
            <div className="select-wrapper">
              <Select
                isMulti
                name="countries"
                options={countryOptions}
                className="countrie-select"
                classNamePrefix="select"
                placeholder={t("filter.country-selector")}
                onChange={(selected) =>
                  setSelectedCountries(selected as CountryOption[])
                }
                value={selectedCountries}
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="categories" className="categories-label">{t("filter.categories")}</label>
          <div className="category-button-container">
            {categoryOptions.map((category) => (
              <button
                key={category.value}
                className={
                  selectedCategories?.some((sc) => sc.value === category.value)
                    ? "category-button-selected"
                    : "category-button"
                }
                onClick={(e) => {
                  e.preventDefault();
                  if (
                    selectedCategories?.some(
                      (sc) => sc.value === category.value
                    )
                  ) {
                    setSelectedCategories(
                      selectedCategories.filter(
                        (sc) => sc.value !== category.value
                      )
                    );
                  } else {
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
        <button type="submit" className="submit-button">
          {t("filter.use")}
        </button>
      </form>
      {isLoading ? (
        <span className="loader"></span>
      ) : articles.length > 0 ? (
        // Articles grid container for side-by-side layout
        <div className="articles-grid-container">
          {articles
            .filter((article) => !!article.image_url) // Only articles with an Imageurl
            .slice(0, visibleCount)
            .map((art, index) => (
              <Link
                to={`/article/${index}`}
                state={{ article: art }}
                className="article-link"
                key={art.id}
              >
                <div className="article-outer-container">
                  <h1 className="article-title">{art.title}</h1>

                  <div
                    className="articles-container"
                    key={art.id}
                    id={index.toString()}
                  >
                    <img className="article-img" src={art.image_url} alt={art.title} />
                  </div>
                  <p className="article-categorys">
                    {t("filter.categories")} {art.category.join(", ")}
                  </p>
                </div>
              </Link>
            ))}
        </div>
      ) : (
        <p>{hasFilter ? t("errors.articles") : ""}</p>
      )}

      {/* Load more button outside the grid container */}
      {articles.length > 0 && visibleCount < articles.length && (
        <button
          className="loadMore"
          onClick={() => setVisibleCount((prev) => prev + 5)}
        >
          {t("navigation.load")}
        </button>
      )}
    </div>
  );
};

export default Filterpage;