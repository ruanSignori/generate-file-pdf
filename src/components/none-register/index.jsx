import React from 'react';
import { Link } from 'react-router-dom';
import './NoneRegister.css';

export default function NoneRegister() {
  return (
    <div className="parent-title">
        <div>
          <h1>Atualmente não existe nenhum cadastro.</h1>
          <Link to="/Home">
            <button className="btn btn-primary ">Novo Cadastro</button>
          </Link>
        </div>
    </div>
  )
}
