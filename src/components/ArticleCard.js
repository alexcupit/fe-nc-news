import React from 'react';
import '../styling/articleCard.css';
import { dateConversion } from '../utils/dateConversion';

function ArticleCard({ article }) {
  const { title, author, topic, created_at, votes, comment_count } = article;
  const { year, month, day } = dateConversion(created_at);
  return (
    <div>
      <h3>{title}</h3>
      <h4>Written by: {author}</h4>
      <p className='article-card__date'>
        {day}/{month}/{year}
      </p>
      <p className='article-card__topic'>{topic}</p>
      <p className='article-card__votes'>Votes: {votes}</p>
      <p className='article-card__comments'>Comments: {comment_count}</p>
    </div>
  );
}

export default ArticleCard;
