import React from "react";
import "./Weekly.css";
import Weekly1 from "../Weekly_image_sample/top.jpg";
import Weekly2 from "../Weekly_image_sample/weeklyimg_ring1.jpg";
import Weekly3 from "../Weekly_image_sample/weeklyimg_neklace.jpg";
import Weekly4 from "../Weekly_image_sample/right.jpg";
import B from "../Weekly_image_sample/img-b.png";
import I from "../Weekly_image_sample/img-i.png";

const WeeklySection = () => {
  return (
    <section className="weekly-container">
      <div class="section section-top">
        <div class="section-left">
          <h1>WEEKLY BEST</h1>
          <h5>금주 베스트 셀러 상품</h5>
        </div>
        <div class="section-right">
          <img class="section-right-img" src={Weekly1} alt="베스트 상품" />
        </div>
      </div>

      <div class="weekly">
        <div className="weekly-b">
          <img src={B} alt="" />
        </div>
        <div className="weekly-i">
          <img src={I} alt="" />
        </div>
        <div className="section-weekly">
          <div class="best-item best-left">
            <img class="best-img" src={Weekly2} alt="상품 1" />
            <h3>MUTE Stroke Cuff</h3>
            <p class="description">볼드하지만 심플한 디자인</p>
            <p class="price">KRW 235,000</p>
          </div>
          <div class="best-item best-center">
            <img class="best-img" src={Weekly3} alt="상품 2" />
            <h3>SEASONS Black Chain Necklace</h3>
            <p class="description">슬림한 블랙체인의 데일리 목걸이</p>
            <p class="price">KRW 81,000</p>
          </div>
          <div class="best-item best-right">
            <img class="best-img" src={Weekly4} alt="상품 3" />
            <h3>Braid Hoop Earrings</h3>
            <p class="description">통통하게 볼륨있는 꼬임, 후프 이어링</p>
            <p class="price">KRW 101,000</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeeklySection;
