import React, { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { TopicsContext } from '../contexts/TopicsContext';
import '../styling/navbar.css';

function Navbar() {
  const { topics } = useContext(TopicsContext);
  const location = useLocation();

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
