import React, { useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import './joininfo.css';

function JoinInfo() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [contact, setContact] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate(); //navigate 함수 초기화

  const location = useLocation();
  const param = new URLSearchParams(location.search);
  const email = param.get('email');

  const validate = () => {
    const newErrors = {};

    if (!password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    if (!contact) {
      newErrors.contact = '연락처를 입력해주세요.';
    } else if (!/^\d{10,11}$/.test(contact)) {
      newErrors.contact =
        '유효한 연락처를 입력해주세요. (10자리 또는 11자리 숫자로만 입력)';
    }

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      // 오류가 있는 경우 제출 중단
      return;
    }

    const formData = {
      password,
      contact,
      email,
    };

    axios
      .post('https://aiccback.gunu110.com/auth/googleinfo', formData)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          navigate('/login');
        } else {
          alert('회원가입에 실패했습니다.');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="join-wrapper">
      <h2 className="join-title">JOIN</h2>
      <div className="join-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          {/* <div className="join-group">
            <label>닉네임</label>
            <input
              type="text"
              value={nickname}
              placeholder="닉네임을 입력해주세요."
              onChange={(e) => setNickname(e.target.value)}
            />
            {errors.nickname && <p className="error">{errors.nickname}</p>}
          </div>

          <div className="join-group">
            <label>이메일</label>
            <input
              type="email"
              value={email}
              placeholder="로그인 시 사용할 이메일을 입력해주세요."
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div> */}

          <div className="join-group">
            <label>비밀번호</label>
            <input
              type="password"
              value={password}
              placeholder="비밀번호를 입력해주세요."
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <div className="join-group">
            <label>비밀번호 확인</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword}</p>
            )}
          </div>

          <div className="join-group">
            <label>연락처</label>
            <input
              type="text"
              value={contact}
              placeholder="'-' 없이 숫자만 입력해주세요."
              onChange={(e) => setContact(e.target.value)}
            />
            {errors.contact && <p className="error">{errors.contact}</p>}
          </div>

          <button type="submit">회원가입</button>
        </form>
      </div>
    </div>
  );
}

export default JoinInfo;
