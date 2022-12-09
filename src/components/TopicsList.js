import { TopicsContext } from '../contexts/TopicsContext';
import { Link } from 'react-router-dom';
import '../styling/topicsList.css';
import { useContext } from 'react';

function TopicsList() {
  const { topics } = useContext(TopicsContext);

  return (
    <main className='topics'>
      <h1>Topics</h1>
      <div className='topics-container'>
        {topics.map(({ slug, description }) => {
          return (
            <Link to={`/topics/${slug}`} className='topics-card'>
              {/* <div> */}
              <h2 className='topics-card__topic'>{slug}</h2>
              <p className='topics-card__desc'>{description}</p>
              {/* </div> */}
            </Link>
          );
        })}
      </div>
    </main>
  );
}

export default TopicsList;
