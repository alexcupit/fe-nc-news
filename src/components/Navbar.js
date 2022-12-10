import React, { useContext, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { getTopics } from '../api';
import { TopicsContext } from '../contexts/TopicsContext';
import '../styling/navbar.css';

function Navbar() {
  const { topics, setTopics } = useContext(TopicsContext);
  const location = useLocation();

  useEffect(() => {
    getTopics().then((topics) => {
      setTopics(topics);
    });
  }, []);

  return (
    <nav>
      <NavLink
        className={
          location.pathname === '/topics' ? 'nav__topic--active' : 'nav__topic'
        }
        to='/topics'
      >
        see all topics
      </NavLink>
      {topics.map(({ slug }) => {
        return (
          <NavLink
            to={`/topics/${slug}`}
            className={({ isActive }) =>
              isActive ? 'nav__topic--active' : 'nav__topic'
            }
            key={`navbar-${slug}`}
          >
            {slug}
          </NavLink>
        );
      })}
    </nav>
  );
}

export default Navbar;
