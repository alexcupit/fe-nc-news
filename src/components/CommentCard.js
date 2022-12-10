import React, { useState, useContext, useEffect } from 'react';
import {
  deleteCommentByCommentId,
  getUsers,
  patchCommentByCommentId,
} from '../api.js';
import { dateConversion } from '../utils/dateConversion.js';
import { UserContext } from '../contexts/UserContext.js';

function CommentCard({ comment, setDeleted }) {
  const { author, body, created_at, votes, comment_id } = comment;
  const [commentDeleting, setCommentDeleting] = useState('');
  const [deleteErr, setDeleteErr] = useState(null);
  const { user, users, setUsers } = useContext(UserContext);
  const [commVotes, setCommVotes] = useState(votes);
  const [voteErr, setVoteErr] = useState(null);
  const [commVoteCount, setcommVoteCount] = useState(0);

  useEffect(() => {
    // can this live in UsersContext?
    getUsers().then((users) => {
      setUsers(users);
    });
  }, []);

  const { day, month, year, time } = dateConversion(created_at);
  const commAuth = users.find((user) => user.username === author);

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
          setDeleteErr(err);
        });
    };
  };

  const handleCommentVote = (e) => {
    let inc_votes = 0;
    if (e.target.innerText === '👎') {
      inc_votes = -1;
    } else if (e.target.innerText === '👍') {
      inc_votes = 1;
    }
    setcommVoteCount((currVoteCount) => currVoteCount + inc_votes);
    setCommVotes((currVotes) => currVotes + inc_votes);
    patchCommentByCommentId(comment_id, inc_votes)
      .then(() => {})
      .catch((err) => {
        setCommVotes((currVotes) => currVotes - inc_votes);
        setVoteErr(err);
      });
  };

  if (voteErr) {
    return (
      <p className='comment comment__err'>
        something went wrong, please try again
      </p>
    );
  } else {
    return (
      <div className='comment' key={comment_id}>
        {commAuth ? (
          <img
            className='comment__avatar'
            src={commAuth.avatar_url}
            alt={`${author} profile avatar`}
          />
        ) : null}
        <p className='comment__body'>{body}</p>
        <p className='comment__author'>{author}</p>
        <p className='comment__date'>{`${day}/${month}/${year} ${time}`}</p>

        <div className='comment__votes'>
          <button
            disabled={commVoteCount === -1}
            className={
              commVoteCount === -1 ? 'comment-votes__button--disabled' : null
            }
            onClick={handleCommentVote}
          >
            👎
          </button>
          <p className='comment-votes__totalvotes'>Votes: {commVotes}</p>
          <button
            className={
              commVoteCount === 1 ? 'comment-votes__button--disabled' : null
            }
            onClick={handleCommentVote}
            disabled={commVoteCount === 1}
          >
            👍
          </button>
        </div>

        {/* delete button only appears if current user === comment author */}
        {!user ? null : comment.author === user.username ? (
          <button
            onClick={handleDelete(comment.comment_id)}
            className='comment__delete'
            disabled={commentDeleting === comment.comment_id ? true : false}
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
  }
}

export default CommentCard;
