import React, { useContext, useState } from 'react';
import { TopicsContext } from '../contexts/TopicsContext';
import { Link } from 'react-router-dom';
import '../styling/topicsList.css';

function TopicsList() {
  const { topics } = useContext(TopicsContext);
  console.log(topics);
  // const [topicsLoading, setTopicsLoading] = useState(true);

  // return
  // topicsLoading ? (
  //   <div className='topicsloading'>
  //     <p>Loading...</p>
  //   </div>
  // ) : (
  return (
    <main className='topics'>
      <h1>Topics</h1>
      <div className='topics-container'>
        {topics.map(({ slug, description }) => {
          return (
            <Link to={`/topics/${slug}`} className='topics-card'>
              {/* <div> */}
              <h3>{slug}</h3>
              <p>{description}</p>
              {/* </div> */}
            </Link>
          );
        })}
      </div>
    </main>
  );
}

export default TopicsList;
