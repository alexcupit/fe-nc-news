import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArticleById } from '../api';
import { ErrorContext } from '../contexts/ErrorContext';
import '../styling/article.css';
import { dateConversion } from '../utils/dateConversion';
import ArticleComments from './ArticleComments';
import ArticleVotes from './ArticleVotes';
import ErrorPage from './ErrorPage';

function Article() {
  const [articleLoading, setArticleLoading] = useState(true);
  const [article, setArticle] = useState({ author: '', created_at: '' });
  const { err, setErr } = useContext(ErrorContext);
  const { article_id } = useParams();

  useEffect(() => {
    setArticleLoading(true);
    getArticleById(article_id)
      .then((article) => {
        setArticle(article);
        setArticleLoading(false);
      })
      .catch((err) => {
        setErr(err);
      });
  }, [article_id, setErr]);

  if (err) {
    return <ErrorPage err={err} />;
  } else if (articleLoading) {
    return <p>Loading...</p>;
  } else {
    const { title, author, created_at, body, topic, votes } = article;
    const { year, month, day, time } = dateConversion(created_at);
    return (
      <main className='article-container'>
        <ol className='breadcrumb'>
          <li className='breadcrumb__item'>
            <Link to='/'>Home</Link>
          </li>
          <li className='breadcrumb__item'>
            {` > ${topic[0].toUpperCase() + topic.substring(1)}`}
          </li>
          <li className='breadcrumb__item'>{` > ${title}`}</li>
        </ol>

        <article className='article'>
          <h2 className='article__title'>{title}</h2>
          <h3 className='article__author'>{author}</h3>
          <div className='article__datetime'>
            <h4 className='article__date'>
              {day}/{month}/{year}
            </h4>
            <h4 className='article__time'>{time}</h4>
          </div>
          <hr className='article__rule' />
          <p className='article__body'>{body}</p>
        </article>
        <ArticleVotes votes={votes} article_id={article_id} />
        <ArticleComments />
      </main>
    );
  }
}

export default Article;
