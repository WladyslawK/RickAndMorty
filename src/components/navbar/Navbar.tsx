import React, {useState, useEffect} from 'react';
import s from './Navbar.module.css'
import menuIcon from '../../assets/icons/burger-bar.png'
import closeIcon from '../../assets/icons/close.png'
import logo from '../../assets/images/logo.jpg'
import {menuItems} from "../../data/constants";

export const Navbar = () => {
  const [click, setClick] = useState(false);
  const [iconMenu, setIconMenu] = useState(true);

  const handleClick = () => {
    setClick(!click);
  }
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setIconMenu(false);
    } else {
      setIconMenu(true);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', showButton);
    showButton();
  }, []);



  const menuImage = <img onClick={handleClick} className={s.menuIcon} src={click ? closeIcon : menuIcon} alt="menu"/>

  const menu = menuItems.map((item, i) => <li key={i} className={s.navItem}><a href="#">{item}</a></li>)

  return (
    <header className={s.header}>
      <div className={s.headerContainer}>
        <div className={s.menuContainer}>
          <img src={logo} alt="logo" className={s.logo_img}/>
          <h2 className={s.logo}>Rick & Morris</h2>
          <nav>
            <ul className={click ? `${s.navMenu} ${s.navMenuActive}` : s.navMenu}>
              {
                menu
              }
              {click ?
                <>
                  <li className={s.navItem}><a href="#">Log in</a></li>
                  <li className={s.navItem}><a href="#">Get Started</a></li>
                </>
                : ''

              }
            </ul>
          </nav>

        </div>

        <div className={s.actionContainer}>
          {
            iconMenu ? '' : menuImage
          }
        </div>

      </div>
    </header>
  )
}