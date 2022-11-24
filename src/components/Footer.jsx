import styles from './Footer.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faInstagram, faFacebook, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footer__nav}>
          <span>회사소개</span>
          <span>채용정보</span>
          <span>이용약관</span>
          <span>개인정보 처리방침</span>
          <span>입점문의</span>
          <span>매장안내</span>
          <hr/>
        </div>
        
        <div className={styles.footer__content}>
          <div>
            <h2>Scent</h2>
          </div>
          <div className={styles.copy}>
            <p><FontAwesomeIcon icon={faPhone} /> (1234-5678)</p>
            <p style={{fontSize: '11px'}}>COPYRIGHT © SCENT ALL RIGHTS RESERVED.</p>
          </div>

          <div className={styles.sns}>
            <ul>
              <li>
                <a href="#" target='blink'><FontAwesomeIcon icon={faTwitter} /></a>
              </li>
              <li>
                <a href="#" target='blink'><FontAwesomeIcon icon={faInstagram} /></a>
              </li>
              <li>
                <a href="#" target='blink'><FontAwesomeIcon icon={faFacebook} /></a>
              </li>
              <li>
                <a href="#" target='blink'><FontAwesomeIcon icon={faYoutube} /></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;