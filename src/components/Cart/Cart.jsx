import React, { useEffect, useState } from 'react';
import './cart.css';
import { LuPlus, LuMinus } from 'react-icons/lu';
import axios from 'axios';

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [allChecked, setAllChecked] = useState(true);

  useEffect(() => {
    // 사용자별 장바구니 데이터를 서버에서 가져오기
    axios
      .get('https://aiccback.gunu110.com/api/get-basket', {
        withCredentials: true, // 쿠키 포함 요청
      })
      .then((response) => {
        const data = response.data;
        console.log('Fetched data:', data); // 데이터를 콘솔에 출력하여 확인
        if (Array.isArray(data)) {
          // 각 제품에 기본 수량(quantity)을 설정
          const updatedProducts = data.map((product) => ({
            ...product,
            quantity: 1, // 기본 수량을 1로 설정
            checked: true, // 기본 체크 상태
          }));
          setProducts(updatedProducts); // 서버에서 가져온 데이터가 배열이면 설정
          setAllChecked(updatedProducts.every((product) => product.checked));
        } else {
          setProducts([]); // 데이터가 배열이 아닌 경우 빈 배열로 설정
        }
      })
      .catch((error) => {
        console.error('Error fetching basket data:', error);
        setProducts([]); // 오류가 발생한 경우에도 안전하게 빈 배열로 설정
      });
  }, []);

  const handleCheckboxChange = (id) => {
    const updatedProducts = products.map((product) =>
      product.productid === id
        ? { ...product, checked: !product.checked }
        : product
    );
    setProducts(updatedProducts);
    setAllChecked(updatedProducts.every((product) => product.checked));
  };

  const handleAllCheckboxChange = () => {
    const newAllCheckedStatus = !allChecked;
    const updatedProducts = products.map((product) => ({
      ...product,
      checked: newAllCheckedStatus,
    }));
    setProducts(updatedProducts);
    setAllChecked(newAllCheckedStatus);
  };

  const handleIncreaseQuantity = (id) => {
    const updatedProducts = products.map((product) =>
      product.productid === id
        ? { ...product, quantity: product.quantity + 1 }
        : product
    );
    setProducts(updatedProducts);
  };

  const handleDecreaseQuantity = (id) => {
    const updatedProducts = products.map((product) =>
      product.productid === id && product.quantity > 1
        ? { ...product, quantity: product.quantity - 1 }
        : product
    );
    setProducts(updatedProducts);
  };

  const calculateTotalPrice = () => {
    return products.reduce((total, product) => {
      const priceString = product?.productprice || '0';
      const price = parseFloat(priceString.replace(/,/g, ''));
      return total + (product.checked ? price * product.quantity : 0);
    }, 0);
  };

  const handleDeleteProduct = (productid) => {
    // 서버에 삭제 요청 보내기
    axios
      .post(
        'https://aiccback.gunu110.com/api/remove-from-basket',
        { productid },
        { withCredentials: true }
      )
      .then((response) => {
        // 서버에서 삭제가 성공하면, 로컬 상태에서 해당 제품 제거
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.productid !== productid)
        );
        alert(response.data.message);
      })
      .catch((error) => {
        console.error('Error deleting product from cart:', error);
      });
  };

  const handleDeleteSelectedProducts = () => {
    const selectedProductIds = products
      .filter((product) => product.checked)
      .map((product) => product.productid);

    if (selectedProductIds.length === 0) return;

    axios
      .post(
        'https://aiccback.gunu110.com/api/select-remove-from-basket',
        { productids: selectedProductIds },
        { withCredentials: true }
      )
      .then((response) => {
        alert(response.data.message);
        setProducts((prevProducts) =>
          prevProducts.filter(
            (product) => !selectedProductIds.includes(product.productid)
          )
        );
      })
      .catch((error) => {
        console.error('Error deleting products from cart:', error);
      });
  };

  const handleOrderProduct = (productid) => {
    // API 호출 대신 리디렉션
    window.location.href = '/order_completed';
  };

  const handleOrderSelected = () => {
    const selectedProducts = products.filter((product) => product.checked);
    if (selectedProducts.length === 0) {
      alert('선택된 상품이 없습니다.');
      return;
    }
    // API 호출 대신 리디렉션
    window.location.href = '/order_completed';
  };

  const handleOrderAll = () => {
    if (products.length === 0) {
      alert('장바구니에 담긴 상품이 없습니다.');
      return;
    }
    // API 호출 대신 리디렉션
    window.location.href = '/order_completed';
  };

  return (
    <>
      <div>
        <h1
          className="text-[48px] mt-[140px] pl-[80px]"
          style={{ fontWeight: '600' }}
        >
          MY CART
        </h1>
      </div>
      <div className="cart-container">
        <div className="cart-top">
          <table className="cart-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={allChecked}
                    onChange={handleAllCheckboxChange}
                    disabled={products.length === 0} // 상품이 없을 때 체크박스 비활성화
                  />
                </th>
                <th>상품명</th>
                <th>수량 변경</th>
                <th>결제금액</th>
                <th>선택</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty-cart-message">
                    장바구니에 담긴 상품이 없습니다.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.productid}>
                    <td className="checkbox-td">
                      <input
                        type="checkbox"
                        checked={product.checked}
                        onChange={() => handleCheckboxChange(product.productid)}
                      />
                    </td>
                    <td className="product-info">
                      <img
                        src={`https://aiccback.gunu110.com/img/${product.productimage}`}
                        alt={product.productname}
                      />
                      <span>{product.productname}</span>
                    </td>
                    <td>
                      <div className="quantity-td">
                        <input
                          type="number"
                          value={product.quantity}
                          min="1"
                          readOnly
                        />
                        <LuPlus
                          className="plus-icon"
                          onClick={() =>
                            handleIncreaseQuantity(product.productid)
                          }
                        />
                        <LuMinus
                          className="minus-icon"
                          onClick={() =>
                            handleDecreaseQuantity(product.productid)
                          }
                        />
                      </div>
                    </td>
                    <td className="price-td">
                      KRW {product.productprice?.toLocaleString()}
                    </td>
                    <td>
                      <div className="option-td">
                        <button
                          className="cart-order"
                          onClick={() => handleOrderProduct(product.productid)}
                        >
                          주문하기
                        </button>
                        <button
                          className="cart-delete"
                          onClick={() => handleDeleteProduct(product.productid)}
                        >
                          삭제하기
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {products.length > 0 && (
            <div className="cart-total">
              <div className="cart-caution">
                <p>* 장바구니에 담긴 상품은 최대 90일간 유지됩니다.</p>
                <p>* ELORIA의 회원이라면, 무조건 배송비 무료입니다.</p>
              </div>
              <div className="c-total-price">
                <p className="c-text">TOTAL:</p>
                <p className="c-number">
                  KRW {calculateTotalPrice().toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="cart-buttons">
          <button
            className="delete-selected"
            onClick={handleDeleteSelectedProducts}
          >
            선택상품 삭제
          </button>
          <div className="order-buttons">
            <button className="order-selected" onClick={handleOrderSelected}>
              선택상품 주문
            </button>
            <button className="order-all" onClick={handleOrderAll}>
              전체상품 주문
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
