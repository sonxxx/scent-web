import styles from './Carousel.module.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <FontAwesomeIcon icon={faChevronLeft} className={styles.prevBtn} onClick={onClick}/>
  )
}

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <FontAwesomeIcon icon={faChevronRight} className={styles.nextBtn} onClick={onClick}/>
  )
}

const Carousel = () => {
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    prevArrow: (
      <PrevArrow />
    ),
    nextArrow: (
      <NextArrow />
    )
  };

  
  return (
    <section className={styles.section__container}>
      <div className={styles.section__wrapper}>
        <PrevArrow />
        <NextArrow />
        <Slider {...settings} className={styles.section__carousel}>
          <img src={require('../images/slider1.jpg')} alt="" />
          <img src={require('../images/slider2.jpg')} alt="" />
          <img src={require('../images/slider3.jpg')} alt="" />
          <img src={require('../images/slider4.jpg')} alt="" />
        </Slider>
      </div>
    </section>
  )
}

export default Carousel;
