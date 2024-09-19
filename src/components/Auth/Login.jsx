import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import './login.css';
import { login } from '../../redux/slices/authSlice';

import { RiKakaoTalkFill } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';

function Login() {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // 페이지 이동을 위해 useNavigate 사용
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const validate = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '유효한 이메일 주소를 입력해주세요.';
    }

    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    }

    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.email || !formData.password) {
      alert('잘못된 입력값이 있습니다.');
      return;
    }

    const newErrors = validate();
    setErrors(newErrors);

    axios
      .post('https://aiccback.gunu110.com/login', formData, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 201) {
          console.log(res);
          const decoded = jwtDecode(res.data.token);
          console.log(decoded);
          dispatch(login({ authData: decoded }));
          alert('로그인 성공 !');
          navigate('/');
        } else {
          alert('로그인에 실패했습니다.');
        }
      })
      .catch((error) => {
        if (error.response && error.response.data.error) {
          alert(error.response.data.error); // 백엔드에서 보낸 에러 메시지
        } else {
          alert('로그인 중 오류가 발생했습니다.'); // 일반적인 에러 메시지
        }
      });
  };

  const handleSignUp = () => {
    navigate('/joininfo'); // 회원가입 페이지로 이동
  };

  const handleGoogleSignUp = () => {
    window.location.href = 'https://aiccback.gunu110.com/auth/google'; // 구글 연동 회원가입 페이지로 이동
  };

  // const handleKakaoSignUp = () => {
  //   window.location.href = 'https://aiccback.gunu110.com/oauth'; // 카카오 연동 회원가입 페이지로 이동
  // };

  return (
    <div className="login-wrapper">
      <h2 className="login-title">LOGIN</h2>
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-group">
            <input
              type="email"
              value={formData.email}
              placeholder="이메일"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="login-group">
            <input
              type="password"
              value={formData.password}
              placeholder="비밀번호"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
        </form>

        <div className="find-group">
          <p className="find-id">아이디 찾기</p>
          <div className="divider1"></div>
          <p className="find-pw">비밀번호 찾기</p>
        </div>

        <div className="button-group">
          <div>
            <button onClick={handleSubmit} className="login-button">
              로그인
            </button>
            <button onClick={handleSignUp} className="signup-button">
              회원가입
            </button>
          </div>

          <div className="or">
            <div className="divider2"></div>
            <p>OR</p>
            <div className="divider2"></div>
          </div>

          <button onClick={handleGoogleSignUp} className="google-button">
            <FcGoogle className="google-icon" />
            <p className="google-p">구글로 시작하기</p>
          </button>
          {/* <button onClick={handleKakaoSignUp} className="kakao-button">
            <RiKakaoTalkFill className="kakao-icon" />
            <p className="kakao-p">카카오로 시작하기</p> */}
          {/* </button> */}
        </div>
      </div>
    </div>
  );
}

export default Login;
