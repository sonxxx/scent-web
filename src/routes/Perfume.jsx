import Section from '../components/Section';
import { useState, useEffect } from 'react';

const Perfume = ({ productList }) => {
  const [itemList, setItemList] = useState([]);

  useEffect(()=>{
    fetch(`https://raw.githubusercontent.com/sonxxx/scent-json/master/data/perfume.json`)
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

export default Perfume;