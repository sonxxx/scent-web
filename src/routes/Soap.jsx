import { useState, useEffect } from 'react';
import Section from '../components/Section';

const Soap = ({ productList }) => {
  //받아온 데이터 값 저장
  const [itemList, setItemList] = useState([]);
  
  //데이터 받아오는 함수
  useEffect(()=>{
    fetch(`https://raw.githubusercontent.com/sonxxx/scent-json/master/data/soap.json`)
      .then(res => res.json())
      .then(res => {
        setItemList(res);
      });
  },[]);
  
  productList(itemList);

  return (
    <Section itemList={itemList} setItemList={setItemList}/>
  )
}

export default Soap;