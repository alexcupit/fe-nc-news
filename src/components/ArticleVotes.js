import React, { useState } from 'react';
import { patchArticleById } from '../api';
import '../styling/articleVotes.css';

function ArticleVotes({ article_id, votes }) {
  const [articleVotes, setArticleVotes] = useState(votes);
  const [err, setErr] = useState(null);

  const handleVote = (e) => {
    let inc_votes = 0;
    if (e.target.innerText === '👎') {
      inc_votes = -1;
    } else if (e.target.innerText === '👍') {
      inc_votes = 1;
    }
    setArticleVotes((currVotes) => currVotes + inc_votes);
    patchArticleById(article_id, inc_votes)
      .then(() => {})
      .catch((err) => {
        setErr('Something went wrong, please try again!');
      });
  };

  if (err) {
    return <p className='article-votes article-votes__err'>{err}</p>;
  }
  return (
    <div className='article-votes'>
      <button className='article-votes__downvote' onClick={handleVote}>
        👎
      </button>
      <p className='article-votes__totalvotes'>
        Votes:
        <br />
        {articleVotes}
      </p>
      <button className='article-votes__upvote' onClick={handleVote}>
        👍
      </button>
    </div>
  );
}

export default ArticleVotes;
