import styles from './Section.module.css';
import { useState } from 'react';
import Pagination from './Pagination';
import { Link } from 'react-router-dom';

const Section = ({itemList, setItemList}) => {
  //보여질 페이지
  let [page, setPage] = useState(1);
  //페이지당 제한 할 게시글 수 (8개)
  let [postPerPage, setPostPerPage] = useState(8);
  //정렬
  let [sort, setSort] = useState();

  // pagination(한 페이지에 보여줄 상품 갯수, 첫 번째 인덱스, 마지막 인덱스)
  const lastIndex = page * postPerPage;
  const firstIndex = lastIndex - postPerPage;
  const showingPost = (itemList) => {
    let showingPost = 0;
    showingPost = itemList.slice(firstIndex, lastIndex);
    return showingPost;
  };

  //이름, 가격순 정렬
  function nameSort() {
    let newList = [...itemList];
    newList.sort(function(a, b){
      if(a.name < b.name) return -1;
      if(a.name > b.name) return 1;
      return 0;
    });
    setItemList(newList);
  }

  function lowPriceSort() {
    let newList = [...itemList];
    newList.sort(function(a, b){
      return a.price - b.price;
    })
    setItemList(newList);
  }

  function highPriceSort() {
    let newList = [...itemList];
    newList.sort(function(a, b){
      return b.price - a.price;
    })
    setItemList(newList);
  }


  return (
    <section className={styles.section}>
      <div className={styles.container}>
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
              showingPost(itemList).map((itemList)=>{
                return (
                  <li key={itemList.id}>
                    <Link to={`/detail/${itemList.id}`} state={{itemList: itemList}}>
                      <div className={styles.item}>
                        <div className={styles.item__img}>
                          <img src={itemList.image}/>
                        </div>
                        <p>{itemList.category}</p>
                        <p>{itemList.name}</p>
                        <p>{itemList.price} KRW</p>
                      </div>
                    </Link>
                  </li>
                )
              })
            }
          </ul>
        </div>
        <div className={styles.page__wrap}>
            <Pagination page={page} setPage={setPage} postPerPage={postPerPage} totalPost={itemList.length} />
        </div>
      </div>
    </section>
  )
}

export default Section;