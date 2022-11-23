import Carousel from '../components/Carousel';
import styles from './Main.module.css';
import Best from '../components/Best';
import Latest from '../components/Latest';
import { useState, useEffect } from 'react';

const Main = (props) => {
  //Latest상품 데이터 저장
  const [latest, setLatest] = useState([]);

  //Latest상품 데이터 받아오기
  useEffect(()=>{
    fetch(`https://raw.githubusercontent.com/sonxxx/scent-json/master/data/latest.json`)
      .then(res => res.json())
      .then(res => {
        setLatest(res);
      });
  },[]);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.carousel__wrap}>
          <Carousel />
        </div>
        <div className={styles.main__content}>
          <Best best={props.best} setBest={props.setBest} bestData={props.bestData} visible={props.visible} setVisible={props.setVisible}/>
        </div>

        <div>
          <Latest latest={latest} setLatest={setLatest}/>
        </div>
      </div>
    </div>
  )
}

export default Main;