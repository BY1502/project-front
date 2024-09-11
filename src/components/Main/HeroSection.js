import React, { useRef, useState, useEffect } from "react";
import Slide1 from "../SlideImage/Slide1.jpg";
import Slide2 from "../SlideImage/Slide5.jpg";
import Slide3 from "../SlideImage/Slide41.jpg";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import required Swiper modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./herosection.css";

const HeroSection = () => {
  const swiperRef = useRef(null);
  const [hoverSide, setHoverSide] = useState("");

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.navigation.update();
    }
  }, []);

  const handleMouseEnter = (side) => {
    setHoverSide(side);
  };

  const handleMouseLeave = () => {
    setHoverSide("");
  };

  return (
    <div
      className={`swiper-container ${
        hoverSide === "left"
          ? "hover-left"
          : hoverSide === "right"
          ? "hover-right"
          : ""
      }`}
      onMouseMove={(e) => {
        const { clientX } = e;
        const { offsetWidth, offsetLeft } = e.currentTarget;
        const center = offsetWidth / 2;

        if (clientX < center + offsetLeft) {
          setHoverSide("left");
        } else {
          setHoverSide("right");
        }
      }}
      onMouseLeave={handleMouseLeave}
    >
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        speed={300}
        loop={true}
        navigation={true}
        pagination={{
          dynamicBullets: true,
        }}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={Slide1} alt="img1" />
          <div className="slide-content">
            <div className="slogan-container">
              <h2 className="slogan-kr">
                나만의 무드로 일상을 물들이다, ELORIA
              </h2>
              <h2 className="slogan-en-top">Color Your Day</h2>
              <h2 className="slogan-en-bottom">with Your Unique Mood</h2>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={Slide2} alt="img2" />
          <div className="slide-content">
            <h2 className="season special1">Fall Season </h2>
            <h2 className="season special2">Special Mood</h2>
            <button className="special-btn">VIEW MORE</button>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={Slide3} alt="img3" />
          <div className="slide-content">
            <div className="p-container">
              <h2 className="p-name">SQUARE TANZ R. II</h2>
              <p className="P-desc">
                6개의 작은 스퀘어 스톤이 세팅되어 있는 링입니다. 유광과 무광
                텍스처 선택이 가능하며, 의미 있는 문구를 새길 수 있는 각인
                서비스가 준비되어 있습니다. <br />
                나만의 아이템으로 나만의 특별한 날을 각인시켜 보세요. <br />
              </p>
              <button className="view-more">BUY NOW</button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HeroSection;
