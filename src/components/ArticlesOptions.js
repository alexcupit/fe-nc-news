import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TopicsContext } from '../contexts/TopicsContext';

function ArticlesOptions() {
  const { topic } = useParams();
  const { topics } = useContext(TopicsContext);
  const navigate = useNavigate();

  const handleTopic = (e) => {
    if (e.target.value === 'all') {
      navigate('/');
    } else {
      navigate(`/topics/${e.target.value}`);
    }
  };
  return (
    <div>
      <label htmlFor='select__topic'>Filter by: </label>
      <select
        id='select__topic'
        className='select__topic'
        onChange={handleTopic}
        defaultValue={topic}
      >
        <option className='select__topic-option'>all</option>
        {topics.map(({ slug }) => {
          return (
            <option className='select__topic-option' key={`dropdown-${slug}`}>
              {slug}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default ArticlesOptions;
