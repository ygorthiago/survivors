import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

function Header() {
  return (
    <header className="header-container">
      <Link to="/">
        <FiArrowLeft /> Back to home
      </Link>
        
      <h3 className="logo">TZR Survivors</h3>
    </header>
  );
}

export default Header;