import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './mypage.css';

function Mypage() {
  const [userInfo, setUserInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    nickname: '',
    email: '',
    contact: '',
  });

  useEffect(() => {
    // 유저 정보를 가져오는 API 호출
    axios
      .get('https://aiccback.gunu110.com/api/mypage/getUserInfo', {
        withCredentials: true,
      })
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
        // if (err.response && err.response.status === 401) {
        //   alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
        //   window.location.href = '/login';
        // }
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    // 비밀번호 확인 요청
    axios
      .post(
        'https://aiccback.gunu110.com/api/mypage/checkPassword',
        { password },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status === 200) {
          // 비밀번호 확인 성공 후 탈퇴 요청
          return axios.delete(
            'https://aiccback.gunu110.com/api/mypage/delete',
            {
              withCredentials: true,
            }
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

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setPassword('');
    setError('');
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
            onChange={handleInputChange}
          />
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled
          />
          <label htmlFor="contact">연락처</label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleInputChange}
          />
        </div>
        <div className="button-group">
          <button className="edit-button">수정하기</button>
          <button className="delete-button" onClick={handleDelete}>
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
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Mypage;
