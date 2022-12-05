import React, { useEffect, useState } from 'react';
import { getArticles } from '../api';
import '../styling/articlesList.css';
import ArticleCard from './ArticleCard';

function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [articlesLoading, setArticlesLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    setArticlesLoading(true);
    getArticles(page).then(({ articles, total_count }) => {
      setArticles(articles);
      setMaxPage(Math.ceil(total_count / 10));
      setArticlesLoading(false);
    });
  }, [page]);

  const nextHandler = () => {
    setPage((currPage) => {
      return currPage + 1;
    });
  };

  const prevHandler = () => {
    setPage((currPage) => {
      return currPage - 1;
    });
  };

  return (
    <main>
      <h1>Articles:</h1>
      {articlesLoading ? (
        <p>Loading...</p>
      ) : (
        <section className='articles-container'>
          {articles.map((article) => {
            return <ArticleCard key={article.article_id} article={article} />;
          })}
        </section>
      )}
      <p>page {page}</p>
      <button
        style={{ display: page === 1 ? 'none' : 'inline' }}
        onClick={prevHandler}
        className='articleslist__button'
      >
        Previous
      </button>
      <button
        style={{ display: page === maxPage ? 'none' : 'inline' }}
        onClick={nextHandler}
        className='articleslist__button'
      >
        Next
      </button>
    </main>
  );
}

export default ArticlesList;
