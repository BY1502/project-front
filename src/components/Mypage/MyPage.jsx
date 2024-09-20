import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './mypage.css';
import { useSelector } from 'react-redux';

function Mypage() {
  const [userInfo, setUserInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    nickname: '',
    email: '',
    contact: '',
  });

  const authData = useSelector((state) => state.auth.authData);

  useEffect(() => {
    if (!authData || !authData.email) {
      console.error('로그인이 필요합니다.');
      return;
    }

    axios
      .get(
        `https://aiccback.gunu110.com/api/mypage/getUserInfo?email=${authData.email}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setUserInfo(res.data);
        setFormData({
          nickname: res.data.nickname,
          email: res.data.email,
          contact: res.data.contact,
        });
      })
      .catch((err) => {
        console.error('Error fetching user info:', err);
      });
  }, [authData]);

  // handleInputChange 함수 추가
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // handleDelete 함수 추가
  const handleDelete = () => {
    setIsModalOpen(true);
  };

  // handleCancelDelete 함수 추가
  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setPassword('');
    setError('');
  };

  // 탈퇴 요청 함수
  const handleConfirmDelete = () => {
    if (!authData || !authData.email) {
      console.error('로그인이 필요합니다.');
      return;
    }

    axios
      .post(
        `https://aiccback.gunu110.com/api/mypage/checkPassword?email=${authData.email}`,
        { password },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status === 200) {
          return axios.delete(
            `https://aiccback.gunu110.com/api/mypage/delete?email=${authData.email}`,
            { withCredentials: true }
          );
        } else {
          setError('비밀번호가 일치하지 않습니다.');
        }
      })
      .then((res) => {
        if (res && res.status === 200) {
          alert('회원 탈퇴가 완료되었습니다.');
          window.location.href = '/';
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          setError('비밀번호가 일치하지 않습니다.');
        } else {
          console.error('Error:', err);
          setError('서버 오류가 발생했습니다.');
        }
      });
  };

  if (!userInfo) {
    return <p>로딩 중...</p>;
  }

  return (
    <div className="mypage-wrapper">
      <h2 className="mypage-title">MY PAGE</h2>
      <div className="mypage-container">
        <div className="mypage-form">
          <label htmlFor="nickname">닉네임</label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            value={formData.nickname}
            onChange={handleInputChange} // handleInputChange 함수 연결
          />
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange} // handleInputChange 함수 연결
            disabled
          />
          <label htmlFor="contact">연락처</label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleInputChange} // handleInputChange 함수 연결
          />
        </div>
        <div className="button-group">
          <button className="edit-button">수정하기</button>
          <button className="delete-button" onClick={handleDelete}>
            {' '}
            {/* handleDelete 함수 연결 */}
            탈퇴하기
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>정말 탈퇴하시겠습니까?</h3>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
            />
            {error && <p className="error">{error}</p>}
            <button onClick={handleConfirmDelete}>확인</button>
            <button className="cancel" onClick={handleCancelDelete}>
              {' '}
              {/* handleCancelDelete 함수 연결 */}
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Mypage;
