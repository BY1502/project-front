import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { navItems, LoginItems, LogoutItems } from '../constants/data';
import './navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
// import { logout } from "../redux/slices/authSlice";

const Navbar = () => {
  const authData = useSelector((state) => state.auth.authData);
  // console.log(authData);

  const navigate = useNavigate();

  const [isDark, setIsDark] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    if (!isHomePage) {
      return; // 메인 페이지가 아닌 경우 스크롤 이벤트를 설정하지 않음
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsDark(scrollY > 600); //높이 수정 가능
    };

    window.addEventListener('scroll', handleScroll);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate('/');
  };

  const handleCartClick = (e) => {
    if (!authData) {
      e.preventDefault(); // 링크 기본 동작 막기

      // 경고 창 띄우기
      const userConfirmed = window.confirm(
        '로그인 시 사용할 수 있는 페이지입니다. 로그인하시겠습니까?'
      );

      if (userConfirmed) {
        navigate('/login');
      }
      // '아니오'를 선택하면 아무런 동작을 하지 않음
    }
  };

  return (
    <nav className={isHomePage ? 'home-nav' : 'other-nav'}>
      <div className="nav_container">
        <div className="nav_wrapper">
          <ul className="nav_left">
            {navItems.map((item, idx) => (
              <li
                key={idx}
                className={
                  isHomePage ? (isDark ? 'dark-hover' : 'light-hover') : ''
                }
              >
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
          <div
            className={`nav_logo ${
              isHomePage ? (isDark ? 'dark' : 'light') : 'default'
            }`}
          >
            <span>
              <a href="/" className="logo-text">
                ELORIA
              </a>
            </span>
          </div>
          <ul className="nav_right">
            {authData
              ? LoginItems.map((item, idx) => (
                  <li
                    key={idx}
                    className={
                      isHomePage ? (isDark ? 'dark-hover' : 'light-hover') : ''
                    }
                  >
                    <Link
                      to={item.to}
                      onClick={item.index === 0 ? handleLogout : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))
              : LogoutItems.map((item, idx) => (
                  <li
                    key={idx}
                    className={
                      isHomePage ? (isDark ? 'dark-hover' : 'light-hover') : ''
                    }
                  >
                    <Link
                      to={item.to}
                      onClick={item.label === 'CART' ? handleCartClick : null}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
