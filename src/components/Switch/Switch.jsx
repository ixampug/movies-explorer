import React from 'react';
import './Switch.css';

export default function Switch({ onFilterMovies, shortMovies }) {
  return (
    <div className='switch'>
      <input
        type='checkbox'
        id='checkbox'
        className='switch__checkbox'
        required
        onChange={onFilterMovies}
        checked={shortMovies}
      />
      <label className='switch__label'>Короткометражки</label>
    </div>
  );
}
