import React, { useEffect, useState } from 'react';
import './Homepage.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const translateText = async (text: string, targetLang: string): Promise<string> => {
  try {
    const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`);
    const data = await res.json();
    return data[0]?.map((t: any) => t[0]).join('') || text;
  } catch (error) {
    console.error('Translation failed', error);
    return text; // Falls Fehler, gib Originaltext zurück
  }
};

// Define the structure of an article item
export type ArticleType = {
  id: string;
  title: string;
  link: string;
  category: string[];
  description: string;
  image_url: string;
  language?: string;
  source_name: string;
  source_link: string;
  country: string[];
};

const Homepage: React.FC = () => {
  // State for storing the final, filtered articles
  const [articles, setArticles] = useState<ArticleType[]>([]);
  // State to track whether articles are being loaded
  const [isLoading, setIsLoading] = useState(false);
  const [visibleArticles, setVisibleArticles] = useState(10);

  const { i18n } = useTranslation();

  // Array of API keys to use in case one hits its rate limit
  const apiKeys = [
    'pub_808525d68114469f62b1f6a43852d9efefa5e', // Davide
    'pub_811242e708de4442cba69eb51a033854b4acd', // Fabian
    'pub_811282fa4967114ded81a5e6113a43759389d', // Joel
    'pub_81184c0cf9b608ff16835478331619519d935', // Davide
    'pub_82495cbea35080abad1e930ac1d03d2e3120a', // Flurin / Minion
    'pub_82499e416d9e96f438501b7195d708f135d86', // Flurin / Minion
    'pub_825006980031d31dab6b2d91aced6dce9ebb3', // Leon
    'pub_825019d0afdcc7b687fe5f2511c087911deab', // Flurin / Minion
    'pub_82542de7da230979a9c41c5d5bf86d98034e2' // Fabian
  ];

  useEffect(() => {
    // Function that fetches articles from the news API
    const fetchArticles = async () => {
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
            const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&language=de,en${nextPage ? `&page=${nextPage}` : ""}`;
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
      const targetLang = i18n.language;

      for (let i = 0; i < fetchedArticles.length && finalArticles.length < 25; i++) {
        const article = fetchedArticles[i];
        if (!article) continue;

        // Titel und Beschreibung übersetzen
        const translatedTitle = await translateText(article.title || '', targetLang);
        const translatedDesc = await translateText(article.description || '', targetLang);

        // Normalize and validate each article
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

    // Run fetch once when component mounts
    fetchArticles();
  }, []);

  return (
    <div className="homepage-container">
      <h1 className="title">NewsHub</h1>
      {isLoading ? (
        // Show loading message while fetching data
        <span className="loader"></span>
      ) : articles.length > 0 ? (
        // Render each article if available
        <>
          {articles
            .filter((article) => !!article.image_url) // Only articles with an Imageurl
            .slice(0, visibleArticles)
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
            ))}
          <button
            className="loadMore"
            onClick={() => setVisibleArticles((prev) => prev + 10)}
          >
            Mehr laden
          </button>
        </>
      ) : (
        // Fallback message if no articles are available
        <p>No articles available. Please try again later.</p>
      )}
    </div>
  );
};

export default Homepage;
