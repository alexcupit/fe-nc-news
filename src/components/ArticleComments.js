import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { deleteCommentByCommentId, getCommentsByArticleId } from '../api.js';
import { dateConversion } from '../utils/dateConversion.js';
import '../styling/articleComments.css';
import { UserContext } from '../contexts/UserContext.js';
import CommentForm from './CommentForm.js';

function ArticleComments() {
  const { article_id } = useParams();
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentPosting, setCommentPosting] = useState(false);
  const { user, users } = useContext(UserContext);
  const [deleted, setDeleted] = useState(false);
  const [commentDeleting, setCommentDeleting] = useState('');
  const [deleteErr, setDeleteErr] = useState(null);

  useEffect(() => {
    getCommentsByArticleId(article_id).then((comments) => {
      setComments(comments);
      setCommentsLoading(false);
      setDeleted(false);
    });
  }, [commentPosting, article_id, deleted]);

  const handleDelete = (comment_id) => {
    return function (e) {
      setCommentDeleting(comment_id);
      deleteCommentByCommentId(comment_id)
        .then((status) => {
          if (status === 204) {
            setDeleted(true);
          }
        })
        .catch((err) => {
          console.log(err);
          setDeleteErr(err);
        });
    };
  };

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
          const { day, month, year, time } = dateConversion(comment.created_at);
          const commUser = users.find(
            (user) => user.username === comment.author
          );

          return (
            <div className='comment' key={comment.comment_id}>
              <img
                className='comment__avatar'
                src={commUser.avatar_url}
                alt={`${comment.author} profile avatar`}
              />
              <p className='comment__body'>{comment.body}</p>
              <p className='comment__author'>{comment.author}</p>
              <p className='comment__votes'>Votes: {comment.votes}</p>
              <p className='comment__date'>{`${day}/${month}/${year} ${time}`}</p>
              {!user ? null : comment.author === user.username ? (
                <button
                  onClick={handleDelete(comment.comment_id)}
                  className='comment__delete'
                  disabled={
                    commentDeleting === comment.comment_id ? true : false
                  }
                >
                  {commentDeleting === comment.comment_id && deleteErr
                    ? 'Please try again'
                    : commentDeleting === comment.comment_id
                    ? 'Deleting...'
                    : 'Delete'}
                </button>
              ) : null}
            </div>
          );
        })}
      </section>
    );
  }
}

export default ArticleComments;
