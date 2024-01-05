import React from 'react';
import './NotFound.css';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {

  const navigate = useNavigate();
  const back = () => {
    navigate(-2);
  }

  return (
    <div className='page__container'>
      <div className='page__info-block'>
        <span className='page__status'>404</span>
        <span className='page__not-found'>Страница не найдена</span>
      </div>
      <button to='/' className='page__link' onClick={back}>
        Назад
      </button>
    </div>
  );
}
