import React, { useEffect, useState } from 'react'

type ArticleType = {
  title: string
  link: string
  category: string[]
  description: string
  image_url: string
  language?: string
  source_name: string
  source_link: string
}

const Homepage: React.FC = () => {

  // useState to store the fetched articles
  const [articles, setArticles] = useState<any[]>([]);

  // API key for accessing newsdata.io
  const apiKey: string = 'pub_808525d68114469f62b1f6a43852d9efefa5e'

  // Function to fetch articles from the API
  const fetchArticles = async () => {
    try {

      let fetchedArticles: any[] = []; // Temporary array to hold all fetched articles
      let nextPage = ''; // Variable to track the page token
      const pageSize = 20; // Number of articles we want to fetch

      // Keep fetching until we have enough articles or there are no more pages
      while (fetchedArticles.length < pageSize) {
        // Construct the URL dynamically with the current `nextPage` token if present
        const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&language=de,en${nextPage ? `&page=${nextPage}` : ''}`;
        const response = await fetch(url);
        const data = await response.json();

        // If the API returned results, add them to our fetched list
        if (data.results) {
          fetchedArticles = [...fetchedArticles, ...data.results];
        }

        /* Stop fetching if:
         - there is no nextPage token (end of pagination), or
         - we already have enough articles */
        if (!data.nextPage || fetchedArticles.length >= pageSize) {
          break;
        }

        // Update nextPage for the next API call
        nextPage = data.nextPage;
      };

      // Take only the amount articles we want
      const finalArticles = fetchedArticles.slice(0, 20);

      // Save them in state
      setArticles(finalArticles);

    } catch (err) {
      console.error(err);
    }
  };

  // useEffect runs whenever articles state changes
  useEffect(() => {
    console.log('Updated articles state:', articles)
  }, [articles]);

  return (
    <div className='homepage-container'>
      <h1>NewsHub</h1>

      <button onClick={fetchArticles}>Trigger</button>

      {/* Container where fetched articles would be displayed */}
      <div className='articles-container'></div>
    </div>
  )
}

export default Homepage
