import React from "react";
import "./completed.css";
import gifticon from "../Weekly_image_sample/gift-2-line.svg";

const Completed = () => {
  return (
    <div className="completed-container">
      <div className="completed-wrapper">
        <div className="icon-gift">
          <img src={gifticon} alt="아이콘" />
        </div>
        <div className="completed-text">
          <p>상품 주문이 완료되었습니다.</p>
          <div className="completed-textsub">
            <p>
              상품 배송 준비중입니다. <br />
              상품 배송까지 최대 3일이 소요됩니다. <br />
              결제 내역은 'MY PAGE'에서 확인이 가능합니다. <br /> <br />
              주문해주셔서 감사합니다.
            </p>
          </div>
        </div>
        <div className="completed-button">
          <button onClick={() => (window.location.href = "/")}>GO HOME</button>
        </div>
      </div>
    </div>
  );
};

export default Completed;
