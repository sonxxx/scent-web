import styles from './Cart.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faXmark } from '@fortawesome/free-solid-svg-icons';

const Cart = () => {
  let navigate = useNavigate();
  
  //상품 수량 저장
  const [itemCount, setItemCount] = useState();
  //장바구니 내 상품 총 가격 저장
  const [totalPrice, setTotalPrice] = useState(0);
  //상품 삭제 
  const [itemDel, setItemDel] = useState();
  //배송비
  const delieveryPay = 3000;
  //총 상품금액 + 배송비 
  const finalAmount = totalPrice + delieveryPay;

  let cartItemData = JSON.parse(localStorage.getItem('cartItem'));

  //장바구니에서 상품 수량 변경(증감)
  const countPlus = (targetId) => {
    const find = cartItemData.find(i => i.id === targetId);
    setItemCount(find.count++);
    localStorage.setItem('cartItem', JSON.stringify(cartItemData));
  }

  const countMinus = (targetId) => {
    const find = cartItemData.find(i => i.id === targetId);

    if(find.count > 1){
      setItemCount(find.count--);
      localStorage.setItem('cartItem', JSON.stringify(cartItemData));
    }
  }


  //체크박스 선택한 상품
  const [checkItem, setCheckItem] = useState([]);

  //전체선택
  const checkAllHandler = (checked, id) => {
    if(checked) {
      //전체 선택 시 모든 상품(id)를 배열에 담는다
      const idArr = [];
      cartItemData.forEach(i => idArr.push(i.id));
      setCheckItem(idArr)

      let price = cartItemData.map((item, index)=>{
        return item.price * item.count
        });
      let sumPrice = price.reduce((a,b)=> (a+b));
      setTotalPrice(Math.floor(sumPrice));
    } else {
      //전체 선택 해제 시 checkItem을 빈 배열로 업데이트
      setCheckItem([])
      setTotalPrice(0);
    }
  }

  //개별선택
  const checkHandler = (checked, id, price) => {
      const itemIndex = cartItemData.findIndex(i => i.id === id);
      //장바구니에 담긴 해당상품의 가격 가져오는 변수
      const checkitemPrice = cartItemData[itemIndex].price;
      //장바구니에 담긴 해당상품의 개수 가져오는 변수
      const checkitemCount = cartItemData[itemIndex].count;
      const checkTotal = checkitemPrice*checkitemCount;

    if(checked) {
      //개별 선택 시 해당 상품을 배열에 추가
      setCheckItem(prev => [...prev, id]);
      //체크한 상품의 가격 누적(총 합계위함)
      setTotalPrice(totalPrice + checkTotal);
    } else {
      //개별 선택 해제 시 체크된 상품을 제외한 배열
      setCheckItem(checkItem.filter((element) => element !== id));
      setTotalPrice(totalPrice - checkTotal);
    }
  }

  //체크박스 '삭제' 기능
  const checkDelete = () => {
    if(window.confirm(`선택하신 ${checkItem.length}개 상품을 장바구니에서 삭제하시겠습니까?`)){
      //전체선택 삭제
      if(checkItem.length === cartItemData.length){
        setItemDel(cartItemData.splice(0));
        localStorage.setItem('cartItem', JSON.stringify(cartItemData));
      } else  {
        checkItem.forEach(v => {
          const idx = cartItemData.findIndex(i => {
            return i.id === v
          })
          setItemDel(cartItemData.splice(idx, 1));
        })
        localStorage.setItem('cartItem', JSON.stringify(cartItemData));
      }
      alert("삭제되었습니다.");
    } 
  }

  //상품 개별'삭제' 기능
  const itemDelete = (targetId) => {
    const index = cartItemData.findIndex(i => i.id === targetId);
    setItemDel(cartItemData.splice(index,1));
    localStorage.setItem('cartItem', JSON.stringify(cartItemData));
  }


  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <h2>장바구니</h2>
        {
          cartItemData.length === 0 ?
          <div className={styles.emptyCart}>
            <FontAwesomeIcon icon={faCartShopping}/>
            <p>장바구니에 상품을 담아보세요</p>
          </div>

          :

          <div>
            <div className={styles.allCheck} >
              <input type="checkbox" onChange={(e)=>checkAllHandler(e.target.checked,cartItemData.id, cartItemData.price)} checked={checkItem.length === cartItemData.length ? true : false }/>  전체({cartItemData.length})
            </div>
            <div className={styles.list__box}>
              {
                cartItemData.map((cartItemData,index)=>{
                  return (
                    <ul key={cartItemData.id}>
                      <div className={styles.chk__basket}>
                        <li className={styles.checkBox}>
                          <input type="checkbox" onChange={(e)=>checkHandler(e.target.checked, cartItemData.id, cartItemData.price)} checked={checkItem.includes(cartItemData.id) ? true : false }/>
                        </li>
                        <li className={styles.itemDel}>
                          <button onClick={()=> itemDelete(cartItemData.id)}>
                            <FontAwesomeIcon icon={faXmark}/>
                          </button>
                        </li>
                      </div>
                      
                      <div className={styles.description__basket}>
                        <li className={styles.imgBox}>
                          <Link to={`/detail/${cartItemData.id}`} state={{itemList: cartItemData}}>
                            <img src={cartItemData.image}/>
                          </Link>
                        </li>
                        
                        <div className={styles.optBox}>
                          <li>
                            <Link to={`/detail/${cartItemData.id}`} state={{itemList: cartItemData}}>{cartItemData.name}</Link>
                          </li>
                          <li>
                            <div className={styles.opt__countButton}>
                              <button onClick={()=>{countMinus(cartItemData.id)}}><HiMinusSm /></button>
                              <span>{cartItemData.count}</span>
                              <button onClick={()=>{countPlus(cartItemData.id)}}><HiPlusSm /></button>
                            </div>
                          </li>
                          <li>{(cartItemData.price) * (cartItemData.count)} KRW</li>  
                        </div>
                      </div>
                    </ul>
                  )
                })
              }
            </div>
          </div>
        }
        
        <div>
          {
            cartItemData.length === 0 ?
            <Link to="/">
              <button className={styles.shopBtn}>쇼핑 계속하기</button>
            </Link>
            
            :
            <div className={styles.totalList}>
              <div className={styles.totalBox}>
                <div className={styles.totalBox__content}>
                  <div  className={styles.totalBox__left}>
                    <p>총 상품금액</p>
                    <p>배송비</p>
                  </div>
                  
                  <div className={styles.totalBox__right}>
                    <p>{totalPrice} KRW</p>
                    {
                      checkItem.length === 0 ?
                      <p>0 KRW</p>
                      :
                      <p>{delieveryPay} KRW</p>
                    }
                  </div>
                </div>
                <hr/>
                <div className={styles.totalBox__result}>
                  <p>총 결제금액</p>
                  {
                    checkItem.length === 0 ?
                    <p>0 KRW</p>
                    :
                    <p>{finalAmount} KRW</p>
                  }
                </div>
              </div>
              <button onClick={() => navigate('/payment',{state:{itemData:cartItemData, finalAmount:finalAmount}})} className={styles.purchaseBtn}>
                {checkItem.length}개 상품 구매하기
              </button>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Cart;