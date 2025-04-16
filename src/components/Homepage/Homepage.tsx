import React, { useEffect, useState } from 'react'

const Homepage = () => {

  const [articles, setArticles] = useState([])

  const apiKey: string = 'pub_808525d68114469f62b1f6a43852d9efefa5e'

  const fetchArticles = async () => {
    try {
      const response = await fetch(`https://newsdata.io/api/1/news?apikey=${apiKey}&language=de,en`);
      const data = await response.json();
      setArticles(data.results);
      console.log('in function', data.results);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    console.log('out of function', articles)
  }, [articles]);

  return (
    <div className='homepage-container'>
      <h1>NewsHub</h1>
      <button onClick={fetchArticles}>Click me</button>
      <div className='articles-container'>
      </div>
    </div>
  )
}

export default Homepage
