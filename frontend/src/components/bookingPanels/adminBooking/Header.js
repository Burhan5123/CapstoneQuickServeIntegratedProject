import { FaHome, FaUserCircle } from 'react-icons/fa';
import { IoNotificationsSharp } from "react-icons/io5";
import React, { useState } from 'react';
import './Header.css';
import BurgerButton from './BurgerButton';


function Header({ title, logo, user }){

  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  }
  return (
    <header 
      className={`header-ab ${clicked ? 'clicked' : '' }`}
    >
      <img id="logo-ab" src={logo} alt="Prospect company logo" /> 
      <h1 className="title-ab">{title}</h1>
      <div className='burger-ab'>
        <BurgerButton
          clicked={clicked}
          handleClick={handleClick}
        />
      </div>
      <div className={`user-container-ab ${clicked? 'active' : ''}`}>
        <FaHome className='header-icon-ab' />
        <IoNotificationsSharp className='header-icon-ab' />
        <FaUserCircle className='header-icon-ab'/>
        <span className='header-icon-ab user-email-ab'>{user.email}</span>
      </div>
      
    </header>
  );
};

export default Header;
