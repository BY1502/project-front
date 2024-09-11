import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './joininfo.css';
import axios from 'axios';

function JoinInfo() {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [contact, setContact] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate(); //navigate 함수 초기화

  const validate = () => {
    //폼의 입력 값들이 유효한지 검사, 유효성 검사 결과를 담은 객체 반환
    const newErrors = {};

    if (!nickname) {
      newErrors.nickname = '닉네임을 입력해주세요.';
    }

    if (!email) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = '유효한 이메일 주소를 입력해주세요.';
    }

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
    event.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
    const newErrors = validate();

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      // 오류가 있는 경우 제출 중단
      return;
    }

    const formData = {
      nickname,
      email,
      password,
      contact,
    };

    axios
      .post('https://aiccback.gunu110.com/signup', formData)
      .then((res) => {
        if (res.status === 201) {
          alert('회원가입 성공 ! 로그인 페이지로 이동합니다. ');
          navigate('/login');
        } else {
          alert('회원가입에 실패했습니다.');
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

  return (
    <div className="join-wrapper">
      <h2 className="join-title">JOIN</h2>
      <div className="join-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="join-group">
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
          </div>

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
