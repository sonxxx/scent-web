import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { auth, onAuthStateChanged } from '../firebase.js';
import { useState } from 'react';

const Login = ({ setLoginEmail, setLoginPassword, onLogin}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser)=>{
    setUser(currentUser);
  });

  
  return (
    <div className={styles.login}>
        <div className={styles.login__form}>
          <h1 className={styles.header}>Scent</h1>
          
          <form className={styles.content}>
            <input type="text" placeholder='이메일' onChange={(e)=>{setLoginEmail(e.target.value)}}/><br/>
            <input type="password" placeholder='비밀번호' onChange={(e)=>{setLoginPassword(e.target.value);}}/><br/>
          </form>

          <div className={styles.loginBtn}>
              <button type="button" onClick={onLogin}>Login</button>
              <button type="button" style={{marginTop: '20px'}} onClick={()=>{ navigate('/register')}}>Sign Up</button>
          </div>
        </div>
    </div>
  )
}

export default Login;