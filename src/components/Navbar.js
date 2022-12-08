import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { TopicsContext } from '../contexts/TopicsContext';
import '../styling/navbar.css';

function Navbar() {
  const { topics } = useContext(TopicsContext);

  return (
    <nav>
      <NavLink className='nav__topic' to='/topics'>
        see all topics
      </NavLink>
      {topics.map(({ slug }) => {
        return (
          <NavLink
            to={`/topics/${slug}`}
            className='nav__topic'
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
