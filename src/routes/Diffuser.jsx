import Section from '../components/Section';
import { useState, useEffect } from 'react';

const Diffuser = ({ productList }) => {
  const [itemList, setItemList] = useState([]);

  useEffect(()=>{
    fetch(`https://raw.githubusercontent.com/sonxxx/scent-json/master/data/diffuser.json`)
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

export default Diffuser;