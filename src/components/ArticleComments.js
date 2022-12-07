import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCommentsByArticleId } from '../api.js';
import { dateConversion } from '../utils/dateConversion.js';
import '../styling/articleComments.css';

function ArticleComments() {
  const { article_id } = useParams();
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getCommentsByArticleId(article_id).then((comments) => {
      setComments(comments);
      setCommentsLoading(false);
    });
  }, []);

  if (commentsLoading) {
    return <p className='articlecomments'>Loading comments...</p>;
  } else if (comments.length === 0) {
    return <p className='articlecomments'>no comments yet</p>;
  } else {
    return (
      <section className='articlecomments'>
        <h3 className='articlecomments__h3'>Comments:</h3>
        {comments.map((comment) => {
          const { day, month, year, time } = dateConversion(comment.created_at);
          return (
            <div className='comment' key={comment.comment_id}>
              <p className='comment__body'>{comment.body}</p>
              <p className='comment__author'>{comment.author}</p>
              <p className='comment__votes'>Votes: {comment.votes}</p>
              <p className='comment__date'>{`${day}/${month}/${year} ${time}`}</p>
            </div>
          );
        })}
      </section>
    );
  }
}

export default ArticleComments;
