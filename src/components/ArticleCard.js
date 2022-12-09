import React from 'react';
import '../styling/articleCard.css';
import { dateConversion } from '../utils/dateConversion';

function ArticleCard({ article }) {
  const { title, author, topic, created_at, votes, comment_count } = article;
  const { year, month, day } = dateConversion(created_at);
  return (
    <grid className='article-card__grid'>
      <h2 className='article-card__title'>{title}</h2>
      <h3 className='article-card__author'>written by: {author}</h3>
      <p className='article-card__date'>
        {day}/{month}/{year}
      </p>
      <p className='article-card__topic'>{topic}</p>
      <div className='article-card__votescomments'>
        <p className='article-card__votes'>Votes: {votes}</p>
        <p className='article-card__comments'>Comments: {comment_count}</p>
      </div>
    </grid>
  );
}

export default ArticleCard;
