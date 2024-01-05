import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

export default function Navigation({ isOpen, onClose }) {

  const setActiveLink = ({ isActive }) =>
    isActive ? 'menu-link_active' : 'menu-link';

  return (
    <div className={`menu ${isOpen ? 'menu_visible' : ''}`}>
      <div className='menu__popup'>
        <div className='menu__container'>
          <button className='menu__close' onClick={onClose} />
          <div className='menu__open'>
            <NavLink className={setActiveLink} to='/'>
              Главная
            </NavLink>
            <NavLink className={setActiveLink} to='/movies'>
              Фильмы
            </NavLink>
            <NavLink className={setActiveLink} to='/saved-movies'>
              Сохраненные фильмы
            </NavLink>
          </div>
          <NavLink className='menu__account' to='/profile'>
            Аккаунт
          </NavLink>
        </div>
      </div>
    </div>
  );
}
