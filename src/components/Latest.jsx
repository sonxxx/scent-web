import styles from './Latest.module.css';
import { Link } from 'react-router-dom';

const Latest = (props) => {
  return (
    <div>
      <section className={styles.section}>
        <div className={styles.container}>
          <h3>New Arrivals</h3>
          
          <div className={styles.item__wrap}>
              { 
                props.latest.map((item,index)=>{
                  return (
                    <div key={item[index].id} className={styles.item__box}>
                      <h4>{props.latest[index][index].category}</h4>

                      <ul>
                        {
                          props.latest[index].map((item,index)=>{
                            return (
                              <li key={item.id}>
                                <Link to={`/detail/${index}`} state={{itemList: item}}>
                                  <div className={styles.item}>
                                    <div className={styles.item__img}>
                                      <img src={item.image}/>
                                    </div>
                                    
                                    <div className={styles.item__text}>
                                      <p>{item.category}</p>
                                      <h5>{item.name}</h5>
                                      <p>{item.price}</p>
                                    </div>
                                  </div>
                                </Link>
                              </li>
                            )
                          })
                        }
                      </ul>
                    </div>
                  )
                })
              }
          </div>
        </div>
      </section>
    </div>
  )
}

export default Latest;