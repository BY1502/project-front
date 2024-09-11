import React from "react";
import Insta from "./SlideImage/insta.svg";
import KaKao from "./SlideImage/kakao.svg";
import Face from "./SlideImage/face.svg";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-wrapper">
        <div className="footer-logo">
          <span>
            <a href="/" className="logo-text">
              ELORIA
            </a>
          </span>
        </div>

        <div className="footer-nav">
          <p>
            <a href="#">이용약관</a>
          </p>
          <p>
            <a href="#">개인정보처리방침</a>
          </p>
          <p>
            <a href="#">윤리경영신고</a>
          </p>
          <p>
            <a href="#">고객만족팀123-1234-5678</a>
          </p>
        </div>

        <div className="footer-low">
          <div className="footer-info">
            <p>사업자등록번호: 000-00-00000</p>
            <p>통신판매고용번호: 제00-서울-0000</p>
            <p>가산디지털2로 144 현대테라타워 가산DK A동 20층 2013~2018호</p>
          </div>
          <div className="footer-sns">
            <div className="footer-icons">
              <a href="#">
                <img src={Insta} alt="인스타그램" className="small-icon" />
              </a>
              <a href="#">
                <img src={KaKao} alt="카카오톡" className="small-icon" />
              </a>
              <a href="#">
                <img src={Face} alt="페이스북" className="small-icon" />
              </a>
            </div>
            <span class="footer-copy">
              COPYRIGHT &copy; 2024 Aicc5Team Co. ALL RIGHT RESERVED
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
