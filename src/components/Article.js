import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArticleById } from '../api';
import '../styling/article.css';

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

  const { title, author, created_at, body, topic } = article;

  if (articleLoading) {
    return <p>Loading...</p>;
  } else {
    //creates_at in fomat 2020-11-22T11:13:00.000Z
    const [year, month, day] = created_at
      .substring(0, created_at.indexOf('T'))
      .split('-');

    const time = created_at.substring(
      created_at.indexOf(':') + 1,
      created_at.indexOf(':') + 6
    );
    return (
      <main>
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
            <br></br>
            {time}
          </h6>

          <p className='article__body'>
            <hr></hr>
            {body}
          </p>
        </article>
      </main>
    );
  }
}

export default Article;
