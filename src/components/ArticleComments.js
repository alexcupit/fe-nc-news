import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styling/articleComments.css';
import { UserContext } from '../contexts/UserContext.js';
import { getCommentsByArticleId } from '../api.js';

import CommentForm from './CommentForm.js';
import CommentCard from './CommentCard.js';

function ArticleComments() {
  const { article_id } = useParams();
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentPosting, setCommentPosting] = useState(false);
  const { user } = useContext(UserContext);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    getCommentsByArticleId(article_id).then((comments) => {
      setComments(comments);
      setCommentsLoading(false);
      setDeleted(false);
    });
  }, [commentPosting, article_id, deleted]);

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
          <p className='articlecomments__nologin'>
            please log in to leave a comment
          </p>
        )}
        {comments.map((comment) => {
          return (
            <CommentCard
              comment={comment}
              setDeleted={setDeleted}
              key={comment.comment_id}
            />
          );
        })}
      </section>
    );
  }
}

export default ArticleComments;
