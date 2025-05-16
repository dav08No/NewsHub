import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Homepage.css'

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

const translateText = async (text: string, targetLang: string): Promise<string> => {
  try {
    const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`);
    const data = await res.json();
    return data[0]?.map((t: any) => t[0]).join('') || text;
  } catch (error) {
    console.error('Translation failed', error);
    return text; // Return original text if translation fails
  }
};

const Homepage: React.FC = () => {
  // State for storing the final, filtered articles
  const [articles, setArticles] = useState<ArticleType[]>([]);
  // State to track whether articles are being loaded
  const [isLoading, setIsLoading] = useState(false);
  // State for the number of visible articles - adjust based on screen size
  const [visibleArticles, setVisibleArticles] = useState(getInitialVisibleCount());
  // State to track window width for responsive design decisions
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Translation hook
  const { t, i18n } = useTranslation();

  // Function to determine initial article count based on screen size
  function getInitialVisibleCount() {
    const width = window.innerWidth;
    if (width >= 1920) return 30;
    if (width >= 1440) return 24;
    if (width >= 1024) return 18;
    if (width >= 768) return 12;
    return 6;
  }

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

  // Handle window resize to adjust layout and visible articles
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setVisibleArticles(getInitialVisibleCount());
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Effect for fetching articles
  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);

      const fetchedArticles: any[] = [];
      const articleFetchLimit = 100;

      // Try each API key in sequence until articles are fetched successfully
      for (let i = 0; i < apiKeys.length && fetchedArticles.length < articleFetchLimit; i++) {
        const apiKey = apiKeys[i];
        console.log(`Using API key ${apiKey}`);

        try {
          let nextPage: string | null = null;

          // Continue fetching pages from the current API key until limit is reached
          while (fetchedArticles.length < articleFetchLimit) {
            const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&language=de,en${nextPage ? `&page=${nextPage}` : ""}`;
            const response = await fetch(url);

            console.log(`Response status for key ${apiKey}:`, response.status);

            // Stop using this key if rate limit is reached
            if (response.status === 429) {
              console.warn(`Rate limit reached for API key ${apiKey}`);
              break;
            } else if (response.status === 200) {
              console.info(`${response.status} Erfolgreich Artikel geladen`);
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

      for (let i = 0; i < fetchedArticles.length && finalArticles.length < 80; i++) {
        const article = fetchedArticles[i];
        if (!article) continue;

        // Translate title and description
        const translatedTitle = await translateText(article.title || '', targetLang);
        const translatedDesc = await translateText(article.description || '', targetLang);

        // Normalize and validate each article
        const validArticle: ArticleType = {
          id: article.id,
          title: translatedTitle,
          link: article.link,
          category: article.category || [],
          description: translatedDesc,
          image_url: article.image_url,
          language: article.language,
          source_name: article.source_name,
          source_link: article.source_link,
          country: article.country || [],
        };

        // Avoid adding duplicate titles
        if (!titleSet.has(validArticle.title) && validArticle.image_url) {
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
  }, [i18n.language]);

  // Function to load more articles
  const loadMoreArticles = () => {
    // Calculate increment based on screen size
    let increment = 5; // Small screens default
    if (windowWidth >= 1920) increment = 15;
    else if (windowWidth >= 1440) increment = 12;
    else if (windowWidth >= 1024) increment = 9;
    else if (windowWidth >= 768) increment = 6;

    setVisibleArticles(prev => prev + increment);
  };

  // Function to truncate title if it's too long
  const truncateTitle = (title: string, maxLength = 70) => {
    if (title.length <= maxLength) return title;
    return title.substring(0, maxLength) + '...';
  };

  return (
    <div className="homepage-container">
      <h1 className="title">NewsHub</h1>

      {isLoading ? (
        <span className="loader"></span>
      ) : articles.length > 0 ? (
        <>
          <div className="articles-grid-container">
            {articles
              .slice(0, visibleArticles)
              .map((art, index) => (
                <Link
                  to={`/article/${index}`}
                  state={{ article: art }}
                  className="article-link"
                  key={art.id || index}
                  id={art.id}
                >
                  <div className="article-outer-container">
                    <div className="articles-container">
                      <img
                        className="article-img"
                        src={art.image_url}
                        alt={art.title}
                        loading="lazy"
                      />
                    </div>
                    <div className="article-content">
                      <h2 className="article-title">{truncateTitle(art.title)}</h2>
                      <p className="article-categorys">
                        {t('filter.categories')}: {art.category?.join(", ")}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>

          {visibleArticles < articles.length && (
            <button
              className="loadMore"
              onClick={loadMoreArticles}
              aria-label={t('navigation.load')}
            >
              {t('navigation.load')}
            </button>
          )}
        </>
      ) : (
        <p>{t('errors.articles')}</p>
      )}
    </div>
  );
};

export default Homepage;