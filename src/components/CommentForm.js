import React, { useContext, useState } from 'react';
import { postComment } from '../api';
import { UserContext } from '../contexts/UserContext';
import '../styling/newComment.css';

function CommentForm({ commentPosting, setCommentPosting, article_id }) {
  const {
    user: { username },
  } = useContext(UserContext);
  const [newComment, setNewComment] = useState('');
  const [err, setErr] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCommentPosting(true);
    postComment(article_id, username, newComment)
      .then(() => {
        setCommentPosting(false);
        setNewComment('');
      })
      .catch((err) => {
        setErr(err);
      });
  };

  const handleInput = (e) => {
    setNewComment(e.target.value);
  };

  if (err) {
    return (
      <div className='new comment newcomment__err'>
        <p>Sorry, there's been an error. Please try agian.</p>
      </div>
    );
  } else if (commentPosting) {
    return <p>Sending comment...</p>;
  } else {
    return (
      <div className='newcomment'>
        <form className='newcomment__form' onSubmit={handleSubmit}>
          <label className='newcomment__label' htmlFor='comment'>
            Leave a comment
            <br />
            <input
              className='newcomment__input'
              onChange={handleInput}
              id='comment'
              value={newComment}
              required
              placeholder='add your comment here...'
            ></input>
          </label>
          <button className='newcomment__submit' type='submit'>{`>`}</button>
        </form>
        <p className='newcomment__username'>posting as: {username}</p>
      </div>
    );
  }
}

export default CommentForm;
