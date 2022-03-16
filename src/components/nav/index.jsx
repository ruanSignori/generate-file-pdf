import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import './Nav.css';

export default function Nav() {
  return (
    <nav>
      <Link to="/ListOfUsers" className="link-styled">Lista de cadastros</Link>
      <Link to="/Home" className="link-styled">
        <FaPlus />
        Novo cadastro
      </Link>
    </nav>
  );
}
