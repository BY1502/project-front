import React, { useEffect } from "react";
import $ from "jquery"; // jQuery 임포트

import Celeb1 from "../Weekly_image_sample/celeb11.jpg";
import Celeb2 from "../Weekly_image_sample/celeb2.jpg";
import Celeb3 from "../Weekly_image_sample/celeb3.jpg";
import Celeb4 from "../Weekly_image_sample/celeb4.jpg";
import "./Celeb.css";

const CelebSection = () => {
  useEffect(() => {
    // jQuery를 사용하여 .celeb-img에 마우스 효과 추가
    $(".celeb-img").hover(
      function () {
        $(this).addClass("hover");
      },
      function () {
        $(this).removeClass("hover");
      }
    );
  }, []);

  return (
    <section>
      <div className="celeb-section">
        <div className="title">
          <h1>CELEB'S PICK</h1>
          <p>
            <strong>‘IT’</strong> Items chosen by Celeb
          </p>
        </div>
      </div>

      <div className="celeb-images">
        <div className="celeb-img 1">
          <img src={Celeb1} alt="사진1"></img>
          <div className="celeb-dsc">
            <h2>Hoop Earrings 14k</h2>
            <p className="text">
              팬던트들이 반복적으로 배열되어 있는 드롭형 이어링
            </p>
            <p className="celeb-price">KRW 60,000</p>
            <button className="celeb-btn">View Item</button>
          </div>
        </div>
        <div className="celeb-img 2">
          <img src={Celeb3} alt="사진2"></img>
          <div className="celeb-dsc">
            <h2>SEASONS Croissant Necklace and Earrings Set</h2>
            <p className="text">
              슬림한 스네이크 체인의 중앙에 크로와상 팬던트가 더해진 목걸이와
              쁘띠한 사이즈의 크로와상 귀걸이가 함께 구성된 고급스럽고 세련된
              세트입니다
            </p>
            <p className="celeb-price">KRW 156,400</p>
            <button className="celeb-btn">View Item</button>
          </div>
        </div>
        <div className="celeb-img 3">
          <img src={Celeb2} alt="사진3"></img>
          <div className="celeb-dsc">
            <h2>[GRAY Collection] Baguette Stone Cuff</h2>
            <p className="text">
              길쭉한 바게트 큐빅을 가로로 발물림하여 세팅한 심플하고 고급스러운
              커프형 팔찌입니다
            </p>
            <p className="celeb-price">KRW 132,000</p>
            <button className="celeb-btn">View Item</button>
          </div>
        </div>
        <div className="celeb-img 4">
          <img src={Celeb4} alt="사진4"></img>
          <div className="celeb-dsc">
            <h2>MUTE Hook Line Earrings</h2>
            <p className="text">
              얇은 선의 흐름을 아름답게 표현한 유니크한 디자인의 귀걸이입니다
            </p>
            <p className="celeb-price">KRW 91,200</p>
            <button className="celeb-btn">View Item</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CelebSection;
