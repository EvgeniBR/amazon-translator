import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const Header = () => (
  <div className="head">
    <Link to="/">Home Page</Link>
    <br />
    <Link to="/search">Search Page</Link>
    <br />
    <Link to="/history">Search History</Link>
  </div>
);
export default Header;
