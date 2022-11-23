import styles from './Pagination.module.css'
import { useState } from 'react';
import { FiChevronLeft,FiChevronRight } from 'react-icons/fi';

const Pagination = ({ totalPost, postPerPage, page, setPage}) => {
  //페이지 이전, 다음 버튼 숨김
  let [pageHidden, setPageHidden] = useState(1);
  let [pageActive, setPageActive] = useState(1);

  //게시글 갯수에 따라 필요해지는 페이지 수
  const pageNumbers = [];

  for(let i=1; i <= Math.ceil(totalPost / postPerPage); i++){
    pageNumbers.push(i);
  }

  return (
    <div className={styles.page__btnWrap}>
      <ul>
        <li>
          <button onClick={()=> {setPage(page-1); setPageHidden(pageHidden-1); setPageActive(page-1);}} className={pageHidden === 1 ? `${styles.hiddenBtn}` : null} disabled={page === 1}>
            <FiChevronLeft />
          </button>
        </li>
        {
          pageNumbers.map((num, idx)=>(
            <li key={num} >
              <button onClick={()=> {setPage(num); setPageHidden(num); setPageActive(num);}} className={pageActive === num ? `${styles.active}` : null}>
              {num}
              </button>
            </li>
          ))
        }
        <li>
          <button onClick={()=> {setPage(page+1); setPageHidden(pageHidden+1); setPageActive(page+1);}} className={pageHidden === pageNumbers.length ? `${styles.hiddenBtn}` : null} disabled={page === pageNumbers.length }>
          <FiChevronRight />
        </button>
        </li>
      </ul>
    </div>
  )
}

export default Pagination;