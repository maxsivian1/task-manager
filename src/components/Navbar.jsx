// Navbar.jsx

import styles from "./Navbar.module.css"
import { NavLink } from 'react-router-dom'
import Settings from './Settings'


const Navbar = () => {

  return (
    <nav className={styles.nav} id='navbar'>
      <div className={styles.logo}>
        <NavLink to={"/"} tabIndex={-1} >

          <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"
            x="0px" y="0px" viewBox="0 0 164 150" enableBackground="new 0 0 164 164" xmlSpace="preserve">
            <g transform="translate(0,-20)">
              <path fillRule="evenodd" clipRule="evenodd" d="M61.539,91.746l102.142-66.967L61.539,139.541V91.746L61.539,91.746z   M54.244,139.025L0,60.19l54.244,31.774V139.025z" fill='var(--color3)' />
            </g>
          </svg>

          <span>TASK MANAGER v2</span>
        </NavLink>
      </div>
      <ul>
        <li>
          <NavLink to={"/"} tabIndex={-1} className={e => e.isActive ? styles.active : ""} aria-label='Home'>Home</NavLink>
        </li>
        <li>
          <NavLink to={"/about"} tabIndex={-1} className={e => e.isActive ? styles.active : ""} aria-label='About'>About</NavLink>
        </li>

        <li className={styles.settings}>
          <Settings />
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
