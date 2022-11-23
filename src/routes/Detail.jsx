import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Detail.module.css';
import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Detail = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  //Section에서 Link로 state 전달한 값 받아오기
  const location = useLocation();
  const itemList = location.state.itemList;
  
  //수량 변경
  let [count, setCount] = useState(1);
  function countUp(){
    setCount(count += 1)
  };
  function countDown(){
    if(count > 1){
      setCount(count -= 1)
    }
  };

  //'장바구니 담기'버튼 클릭 시 localStorage에 해당 상품 저장
  const addItemLocal = () => {
    let cartItemData = JSON.parse(localStorage.getItem('cartItem'));

    const find = cartItemData.find(i => i.id === itemList.id);

    if(find === undefined){
      cartItemData.unshift({
        id:itemList.id,
        name:itemList.name,
        price:itemList.price,
        image:itemList.image,
        count:count
      });
    } else { 
      find.count += count;
    }
    localStorage.setItem('cartItem', JSON.stringify(cartItemData));

    if(window.confirm(`장바구니에 상품을 담았습니다.\n장바구니로 이동하시겠습니까?`)){
      navigate('/cart');
    }
  }

  const nowBuy = () => {
    if(window.confirm(`해당 상품을 구매하시겠습니까?`)){
      localStorage.setItem('nowPurchaseItem', JSON.stringify([]));
      let nowItemData = JSON.parse(localStorage.getItem('nowPurchaseItem'));

      nowItemData.push({
        id:itemList.id,
        name:itemList.name,
        price:itemList.price,
        image:itemList.image,
        count:count
      })

      localStorage.setItem('nowPurchaseItem', JSON.stringify(nowItemData));

      navigate('/payment', {
        state: {
          itemData: nowItemData,
          finalAmount: itemList.price
        }
      });
    }
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.item__wrap}>
          <div className={styles.item__imgBox}>
            <img src={itemList.image}/>
          </div>

          <div className={styles.item__formBox}>
              <div className={styles.header}>
                <p>{itemList.name}</p>
                <p>{itemList.price} KRW</p>
              </div>

              <div className={styles.item__payment}>
                <div className={styles.opt__block}>
                  <div className={styles.opt__title}>
                    <span>수량</span>
                  </div>
                  <hr/>
                  <div className={styles.opt__countBox}>
                    <div className={styles.opt__countButton}>
                      <button onClick={()=>{countDown()}}><HiMinusSm /></button>
                      <span>{count}</span>
                      <button onClick={()=>{countUp()}}><HiPlusSm /></button>
                    </div>
                    <div className={styles.opt__totalPrice}>
                      {itemList.price} KRW
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.total}>
                <div className={styles.total__count}>총 상품금액({count}개)</div>
                <div>{itemList.price * count} KRW</div>
              </div>

              <div className={styles.buy__button}>
                {
                  isLoggedIn ? 
                    <button onClick={()=>{nowBuy();}}>
                    바로 구매
                    </button>
                  :
                    <button>
                      <Link to="/login">바로 구매</Link>
                    </button>
                }
                {
                  isLoggedIn ? 
                    <button onClick={()=>{addItemLocal();}}>
                      장바구니 담기
                    </button>
                  : 
                    <button onClick={()=> navigate("/login",{
                      state: location.pathname
                    })}>
                      장바구니 담기
                    </button>
                }
              </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Detail;