import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArticleById } from '../api';
import '../styling/article.css';
import { dateConversion } from '../utils/dateConversion';
import ArticleComments from './ArticleComments';

function Article() {
  const [articleLoading, setArticleLoading] = useState(true);
  const [article, setArticle] = useState({});

  const { article_id } = useParams();
  useEffect(() => {
    setArticleLoading(true);
    getArticleById(article_id).then((article) => {
      setArticle(article);
      setArticleLoading(false);
    });
  }, []);

  const { title, author, created_at, body, topic, votes } = article;

  if (articleLoading) {
    return <p>Loading...</p>;
  } else {
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
          <h4 className='article__author'>{author}</h4>
          <h6 className='article__date'>
            {day}/{month}/{year}
            <br />
            {time}
          </h6>
          <hr className='article__rule' />
          <p className='article__body'>{body}</p>
          <p className='article__votes'>Votes: {votes}</p>
        </article>
        <ArticleComments />
      </main>
    );
  }
}

export default Article;
