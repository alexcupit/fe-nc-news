import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TopicsContext } from '../contexts/TopicsContext';
import '../styling/articlesList.css';

function ArticlesOptions({
  searchParams,
  setSearchParams,
  selectedSortBy,
  setSelectedSortBy,
}) {
  const { topic } = useParams();
  const { topics } = useContext(TopicsContext);
  const navigate = useNavigate();

  const handleTopic = (e) => {
    if (e.target.value === 'all') {
      navigate('/');
    } else {
      setSelectedSortBy('date-desc');
      navigate(`/topics/${e.target.value}`);
    }
  };

  const handleSortBy = (e) => {
    setSelectedSortBy(e.target.value);
    if (e.target.value === 'date-desc') {
      setSearchParams({ sort_by: 'created_at', order: 'desc' });
    } else if (e.target.value === 'date-asc') {
      setSearchParams({ sort_by: 'created_at', order: 'asc' });
    } else if (e.target.value === 'votes-desc') {
      setSearchParams({ sort_by: 'votes', order: 'desc' });
    } else if (e.target.value === 'votes-asc') {
      setSearchParams({ sort_by: 'votes', order: 'asc' });
    }
  };

  return (
    <div className='articles-options'>
      <label className='articles-options__label' htmlFor='select__topic'>
        Topic:
        <select
          id='select__topic'
          className='articles-options__select'
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
      </label>
      <label className='articles-options__label' htmlFor='sort_by'>
        Sort by:
        <select
          id='sort_by'
          name='sort_by'
          className='articles-options__select'
          onChange={handleSortBy}
          defaultValue={selectedSortBy}
        >
          <option value='date-desc'>date: newest first</option>
          <option value='date-asc'>date: oldest first</option>
          <option value='votes-desc'>votes: most first</option>
          <option value='votes-asc'>votes: lowest first</option>
        </select>
      </label>
    </div>
  );
}

export default ArticlesOptions;
