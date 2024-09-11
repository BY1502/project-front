import React from "react";
import "./About.css";
import AboutImg from "../Weekly_image_sample/about3.jpg";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-wrapper">
        <div className="about-title">
          <p>ABOUT US</p>
        </div>

        <div className="about-img-wrapper">
          <div className="about-img">
            <img src={AboutImg} alt="대표 이미지" />
          </div>
          <div>
            <div className="logo-text">
              <p>ELORIA</p>
            </div>
            <div className="about-text">
              <p>
                Eloria는 당신의 일상을 더욱 빛나게 해줄 특별한 액세서리를
                선보입니다.
                <br />
                우리는 단순한 장식품을 넘어, <br />
                각자의 개성과 스타일을 표현할 수 있는 독창적이고 세련된 디자인을
                추구합니다.
                <br />
                Eloria의 모든 제품은 세심한 디자인 과정과 엄선된 고품질 재료를
                바탕으로 제작되어, <br />
                시간이 흘러도 변하지 않는 아름다움을 약속합니다.
                <br />
                Eloria의 액세서리는 단순히 패션 아이템이 아닌, 당신의 이야기를
                담아내는 특별한 매개체입니다.
                <br /> 매일의 순간을 더욱 빛나게 하고, <br />
                일상 속에서 나만의 무드를 표현할 수 있는 특별한 아이템을 통해
                자신만의 스타일을 완성해보세요.
                <br />
                우리는 당신의 개성과 감성을 존중하며, 매일을 특별하게 만들어줄
                수 있는 제품을 제공하기 위해 최선을 다합니다.
                <br /> 당신의 패션에 영감을 불어넣고, 일상 속에서 작은 행복을
                느낄 수 있는 특별한 경험을 Eloria에서 만나보세요.
                <br />
                Eloria는 단순히 액세서리를 판매하는 브랜드가 아닌, <br />
                당신의 삶을 더 빛나게 할 수 있는 특별한 파트너가 되기를
                희망합니다. <br />
                Eloria와 함께라면, 매일의 패션이 새로운 즐거움이 될 것입니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
