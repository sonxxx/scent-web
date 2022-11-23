import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Main from './routes/Main';
import Nav from './components/Nav';
import Soap from './routes/Soap';
import Perfume from './routes/Perfume';
import Diffuser from './routes/Diffuser';
import Detail from './routes/Detail';
import Footer from './components/Footer';
import Register from './components/Register';
import Login from './components/Login';
import Cart from './routes/Cart';
import Payment from './routes/Payment';
import { signInWithEmailAndPassword } from './firebase.js';


const App = ({ auth }) => {
  const navigate = useNavigate();
  //로그인 , 회원가입(+오류메세지, 중복여부) 변수
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  //Best상품 데이터 저장
  const [best, setBest] = useState([]);
  //Best상품 더보기 버튼 삭제 state
  const [visible, setVisible] = useState(0);

  //자식 컴포넌트에서 itemList 값 받아오는 함수
  const [itemList, setItemList] = useState([]);
  const productList = (itemList) => {
  }
  useEffect(() => {
    setItemList(productList)
  },[productList])

  //Best상품 데이터 받아오기
  function bestData(url){
    fetch(url)
      .then(res => res.json())
      .then(res => {
        let newBest = [...best, ...res];
        setBest(newBest);
      })
  }

  useEffect(() => {
    loginCheck();
    bestData(`https://raw.githubusercontent.com/sonxxx/scent-json/master/data/best1.json`);
    //첫 접속 시 localStorage에 [] 있어야 여기에 자료 추가
    if(!localStorage.getItem('checkEmail')){
      localStorage.setItem('checkEmail', JSON.stringify([]))
    }
  },[])

  //로그인 기능
  const onLogin = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user.user.email);
      loginData(user);
      return navigate(-1);
    } catch (error) {
      console.log(error.message);
    }
  };
  
  //로그인 체크 여부
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginData = (user) => {
    localStorage.setItem('isLoggedIn', user.user.emailVerified);
    localStorage.setItem('cartItem', JSON.stringify([]))
    loginCheck();
  }

  //로그인 - localstorage 체크
  const loginCheck = () => {
    let getEmail = localStorage.getItem('isLoggedIn');
    if(getEmail){
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }

  
  return (
    <div className="App">
      <Nav itemList={itemList} onLogin={onLogin} loginData={loginData} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <Routes>
        <Route path="/" element={ <Main best={best} setBest={setBest} bestData={bestData} visible={visible} setVisible={setVisible} itemList={itemList}/> }/>
        <Route path="/perfume" element={ <Perfume productList={productList}/> }/>
        <Route path="/soap" element={ <Soap productList={productList}/> }/>
        <Route path="/diffuser" element={ <Diffuser productList={productList}/> }/>
        <Route path="/login" element={ <Login onLogin={onLogin} setLoginEmail={setLoginEmail} setLoginPassword={setLoginPassword}/> }/>
        <Route path="/cart" element={ isLoggedIn === true? <Cart itemList={itemList}/> : <Login/> }/>
        <Route path="/register" element={ <Register/> }/>
        <Route path="/detail/:id" element={ <Detail isLoggedIn={isLoggedIn}/> }/>
        <Route path="/payment" element={ <Payment/> } />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
