import React, { useEffect, useState } from 'react';
import { getArticles } from '../api';
import '../styling/articlesList.css';
import '../styling/articleCard.css';
import ArticleCard from './ArticleCard';
import { Link, useParams } from 'react-router-dom';
import ArticlesOptions from './ArticlesOptions';

function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [articlesLoading, setArticlesLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const { topic } = useParams();

  useEffect(() => {
    setArticlesLoading(true);
    getArticles(page, topic).then(({ articles, total_count }) => {
      setArticles(articles);
      setMaxPage(Math.ceil(total_count / 10));
      setArticlesLoading(false);
    });
  }, [page, topic]);

  const handlePage = (e) => {
    if (e.target.innerText === 'Next') {
      setPage((currPage) => ++currPage);
    } else if (e.target.innerText === 'Previous') {
      setPage((currPage) => --currPage);
    }
  };

  return (
    <main className='articles-list'>
      <h1>Articles</h1>
      {articlesLoading ? (
        <p>Loading...</p>
      ) : (
        <section>
          <ArticlesOptions />
          <div className='articles-container'>
            {articles.map((article) => {
              return (
                <Link
                  className='article-card'
                  to={`/articles/${article.article_id}`}
                  key={article.article_id}
                >
                  <ArticleCard article={article} />
                </Link>
              );
            })}
          </div>
        </section>
      )}
      <p>page {page}</p>
      <button
        style={{ display: page === 1 ? 'none' : 'inline' }}
        onClick={handlePage}
        className='articles-list__button'
      >
        Previous
      </button>
      <button
        style={{ display: page === maxPage ? 'none' : 'inline' }}
        onClick={handlePage}
        className='articles-list__button'
      >
        Next
      </button>
    </main>
  );
}

export default ArticlesList;
