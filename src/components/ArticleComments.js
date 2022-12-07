import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCommentsByArticleId } from '../api.js';
import { dateConversion } from '../utils/dateConversion.js';
import '../styling/articleComments.css';
import { UserContext } from '../contexts/UserContext.js';
import CommentForm from './CommentForm.js';

function ArticleComments() {
  const { article_id } = useParams();
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentPosting, setCommentPosting] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    getCommentsByArticleId(article_id).then((comments) => {
      setComments(comments);
      setCommentsLoading(false);
    });
  }, [commentPosting, article_id]);

  if (commentsLoading) {
    return <p className='articlecomments'>Loading comments...</p>;
  } else if (comments.length === 0) {
    return <p className='articlecomments'>no comments yet</p>;
  } else {
    return (
      <section className='articlecomments'>
        <h3 className='articlecomments__h3'>Comments:</h3>
        {user ? (
          <CommentForm
            article_id={article_id}
            setCommentPosting={setCommentPosting}
            commentPosting={commentPosting}
          />
        ) : (
          <p>please log in to leave a comment</p>
        )}
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
