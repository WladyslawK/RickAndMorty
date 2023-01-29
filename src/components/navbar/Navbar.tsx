import React, {useState, useEffect} from 'react'

//icons imports
import menuIcon from 'assets/icons/burger-bar.png'
import closeIcon from 'assets/icons/close.png'
import logo from 'assets/images/logo.jpg'

//react-router-dom import
import {Link, useNavigate} from "react-router-dom"

//constants import
import {PATH} from "constants/routePaths.enum"

//style import
import s from 'components/navbar/Navbar.module.css'

export const Navbar = () => {
  const [click, setClick] = useState(false)
  const [iconMenu, setIconMenu] = useState(true)
  const navigate = useNavigate()

  const handleClick = () => {
    setClick(!click);
  }
  const closeMobileMenu = () => setClick(false)

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setIconMenu(false)
    } else {
      setIconMenu(true)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', showButton)
    showButton();
  }, []);


  const toMainPageHandler = () => navigate(PATH.ALL_CHARACTERS)


  const menuImage = <img onClick={handleClick} className={s.menuIcon} src={click ? closeIcon : menuIcon} alt="menu"/>


  return (
    <header className={s.header}>
      <div className={s.headerContainer}>
        <div className={s.menuContainer}>
          <img onClick={toMainPageHandler} src={logo} alt="logo" className={s.logo_img}/>
          <h2 className={s.logo} onClick={toMainPageHandler}>Rick & Morris</h2>
          <nav>
            <ul className={click ? `${s.navMenu} ${s.navMenuActive}` : s.navMenu}>
              <li onClick={closeMobileMenu} className={s.navItem}><Link className={s.navLink} to={PATH.ALL_CHARACTERS}>All characters</Link></li>
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