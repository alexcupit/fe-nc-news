import React from 'react';
import '../styling/articleCard.css';

function ArticleCard({ article: { title, author, topic, created_at } }) {
  const [year, month, day] = created_at
    .substring(0, created_at.indexOf('T'))
    .split('-');
  return (
    <div>
      <h3>{title}</h3>
      <h4>Written by: {author}</h4>
      <p className='article-card__date'>
        {day}/{month}/{year}
      </p>
      <p className='article-card__topic'>{topic}</p>
    </div>
  );
}

export default ArticleCard;
