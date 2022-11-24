import styles from './Best.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Best = (props) => {
  //정렬 
  let [sort, setSort] = useState();

  //이름, 가격순 정렬
  function nameSort() {
    let newList = [...props.best];
    newList.sort(function(a, b){
      if(a.name < b.name) return -1;
      if(a.name > b.name) return 1;
      return 0;
    });
    props.setBest(newList);
  }

  function lowPriceSort() {
    let newList = [...props.best];
    newList.sort(function(a, b){
      return a.price - b.price;
    })
    props.setBest(newList);
  }

  function highPriceSort() {
    let newList = [...props.best];
    newList.sort(function(a, b){
      return b.price - a.price;
    })
    props.setBest(newList);
  }

  
  return (
    <div>
      <section className={styles.section}>
        <div className={styles.container}>
        <h3>BEST</h3>

          <div className={styles.item__wrap}>
            <div className={styles.sort}>
              <button onClick={()=>{nameSort(); setSort(0);}}
                className={sort == 0 ? `${styles.active}` : null }>
                  이름 순
              </button>
              <button onClick={()=>{lowPriceSort(); setSort(1);}}
                className={sort == 1 ? `${styles.active}` : null}>
                  낮은 가격 순
              </button>
              <button onClick={()=>{highPriceSort(); setSort(2);}}
                className={sort == 2 ? `${styles.active}` : null}>
                  높은 가격 순
              </button>
            </div>
            <ul>
              { 
                props.best.map((item,index)=>{
                  return (
                    <li key={item.id}>
                      <Link to={`/detail/${index}`} state={{itemList: item}}>
                        <div className={styles.item}>
                          <div className={styles.item__img}>
                            <img src={item.image}/>
                          </div>
                          <p>{item.category}</p>
                          <p>{item.name}</p>
                          <p>{item.price}</p>
                        </div>
                      </Link>
                    </li>
                  )
                })
              }
            </ul>
          </div>

          {
            props.visible === 0?
            <button className={styles.moreBtn} onClick={()=> {
              props.bestData(`https://raw.githubusercontent.com/sonxxx/scent-json/master/data/best2.json`);
              props.setVisible(1);
            }}>More</button>
            :
            null
          }
         
        </div>
      </section>
    </div>
  )
}

export default Best;