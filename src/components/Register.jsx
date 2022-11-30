import styles from './Register.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, createUserWithEmailAndPassword } from '../firebase.js';

const Register = () => {
  const navigate = useNavigate();

  //회원가입에 필요한 '이메일','비밀번호'
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  //오류메세지
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  //이메일 중복 여부
  const [checkEmail, setCheckEmail] = useState(false);

  //이메일 로컬 저장 변수
  const [localEmail, setLocalEmail] = useState("");

  const onRegister = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword,
      );
      console.log(user);
      if (window.confirm(`회원가입이 완료되었습니다.`)) {
        navigate('/');
      }
    } catch (error) {
      console.log(error.message);
    }


  };

  //회원가입 완료 시 해당 이메일 localStorage에 저장
  const saveLocalEmail = (e) => {
    let data = JSON.parse(localStorage.getItem('checkEmail'));
    data.push(localEmail);
    localStorage.setItem('checkEmail', JSON.stringify(data));
  }

  const checkData = (e) => {
    let getEmail = JSON.parse(localStorage.getItem('checkEmail'));
    if (getEmail.includes(e.target.value)) {
      setCheckEmail(true)
    } else {
      setCheckEmail(false)
    }
  }

  //이메일 유효성 검사
  const validationEmail = (e) => {
    const regex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/

    if (!e.target.value || regex.test(e.target.value)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
    setRegisterEmail(e.target.value);
  };

  //비밀번호 유효성 검사
  const validationPassword = (e) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/

    if (!e.target.value || regex.test(e.target.value)) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
    setRegisterPassword(e.target.value);
  };


  return (
    <div className={styles.register}>
      <div className={styles.register__form}>
        <h1 className={styles.header}>Scent</h1>

        <form className={styles.content}>
          <div className={styles.emailBox}>
            <span>아이디(이메일)</span>
          </div><br />
          <input type="email" name="email" placeholder='이메일' onChange={(e) => { validationEmail(e); setLocalEmail(e.target.value); checkData(e); }} /><br />
          {
            emailError &&
            <span className={styles.errorMessage}>이메일 형식이 올바르지 않습니다.<br /></span>
          }
          {
            checkEmail &&
            <span className={styles.errorMessage}>중복된 이메일 주소 입니다.<br /></span>
          }
          

          <div className={styles.passwordBox}>
            <span>비밀번호</span>
          </div><br />
          <input type="password" name="password" placeholder='비밀번호' onChange={validationPassword} /><br />
          {
            passwordError &&
            <span className={styles.errorMessage}>숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요.<br /></span>
          }

          <button type="button" onClick={(e) => { onRegister(); saveLocalEmail(e); }} disabled={!registerEmail || !registerPassword} className={styles.registerBtn}>회원가입</button>
        </form>
      </div>
    </div>
  )
}

export default Register;