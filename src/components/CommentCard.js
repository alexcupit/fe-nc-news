import React, { useState, useContext } from 'react';
import { deleteCommentByCommentId, patchCommentByCommentId } from '../api.js';
import { dateConversion } from '../utils/dateConversion.js';
import { UserContext } from '../contexts/UserContext.js';

function CommentCard({ comment, setDeleted }) {
  const { author, body, created_at, votes, comment_id } = comment;
  const [commentDeleting, setCommentDeleting] = useState('');
  const [deleteErr, setDeleteErr] = useState(null);
  const { user, users } = useContext(UserContext);
  const [commVotes, setCommVotes] = useState(votes);
  const [voteErr, setVoteErr] = useState(null);

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
    console.log(e.target.innerText);
    if (e.target.innerText === '👎') {
      inc_votes = -1;
    } else if (e.target.innerText === '👍') {
      inc_votes = 1;
    }
    setCommVotes((currVotes) => currVotes + inc_votes);
    patchCommentByCommentId(comment_id, inc_votes)
      .then(() => {})
      .catch((err) => {
        console.log();
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
        <img
          className='comment__avatar'
          src={commAuth.avatar_url}
          alt={`${author} profile avatar`}
        />
        <p className='comment__body'>{body}</p>
        <p className='comment__author'>{author}</p>
        <p className='comment__date'>{`${day}/${month}/${year} ${time}`}</p>

        <div className='comment__votes'>
          <button
            className='comment-votes__downvote'
            onClick={handleCommentVote}
          >
            👎
          </button>
          <p className='comment-votes__totalvotes'>Votes: {commVotes}</p>
          <button className='comment-votes__upvote' onClick={handleCommentVote}>
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
