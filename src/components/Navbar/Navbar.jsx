import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

export const Navbar = ({ activePage }) => {
  const pages = [
    { name: 'Characters', path: '/' },
    { name: 'Episodes', path: '/episodes' },
    { name: 'Locations', path: '/locations' }
  ];

  return (
    <nav className='navbar'>
      <ul className='navbar-list'>
        {pages.map(page => (
          <li key={page.name}>
            <Link
              to={page.path}
              className={`navbar-link ${activePage === page.name ? 'active' : ''}`}
            >
              {page.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
