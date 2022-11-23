import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from './Nav.module.css';
import { Link, useNavigate } from 'react-router-dom';

const Nav = (props) => {
  const navigate = useNavigate();
  let navMenu = useRef(null)
  let toggleMenu = useRef(null)

  //토클 버튼 스위치
  const [isOpen, setIsOpen] = useState(false);
  function toggleSwitch() {
    setIsOpen(!isOpen);
  }

  //반응형 토글 메뉴
  function toggleClick(e){
    e.classList.toggle(`${styles.active}`);
    navMenu.current.classList.toggle(`${styles.active}`)
  }

  function toggleClose(){
    toggleMenu.current.classList.remove(`${styles.active}`)
    navMenu.current.classList.remove(`${styles.active}`)

    if(isOpen === true){
      setIsOpen(false);
    }
  }

  //로그아웃
  const onLogout = async () => {
    localStorage.removeItem('nowPurchaseItem');
    localStorage.removeItem('isLoggedIn');
    props.setIsLoggedIn(false);
    navigate('/');
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.navbar__menu} ref={navMenu}>
          <div className={styles.navbar__logo}>
            <Link to="/">
              <h1>Scent</h1>
            </Link>
          </div>

          <ul className={styles.navbar__links} onClick={()=>{ toggleClose(); }}>
            <li>
              <Link to="/"><span>Home</span></Link>
            </li>
            <li>
              <Link to="/perfume"><span>Perfume</span></Link>
            </li>
            <li>
              <Link to="/soap"><span>Soap</span></Link>
            </li>
            <li>
              <Link to="/diffuser"><span>Diffuser</span></Link>
            </li>
          </ul>
        </div>

        <div className={styles.navbar__login}>
          <ul>
            {
              props.isLoggedIn ?
              <li onClick={onLogout} className={styles.loginBtn}>LOGOUT</li>
              : <li className={styles.loginBtn}>
                  <Link to="/login">
                    <span>LOGIN</span>
                  </Link>
                </li>
            }

            {
              props.isLoggedIn ? 
              <li className={styles.cartBtn}>
                <Link to="/cart" state={{itemList: props.itemList}}>
                  <FontAwesomeIcon icon={faCartShopping}/>
                </Link>
              </li> 
              : 
              <li className={styles.cartBtn}>
                <Link to="/login">
                  <FontAwesomeIcon icon={faCartShopping}/>
                </Link>
              </li>
            }

             <li className={styles.navbar__toggleBtn} onClick={(e)=>{ toggleClick(e.currentTarget); toggleSwitch();}}  ref={toggleMenu}>
                {isOpen ? 
                  <FontAwesomeIcon icon={faXmark}/>
                 : 
                  <FontAwesomeIcon icon={faBars}/>
                }
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;