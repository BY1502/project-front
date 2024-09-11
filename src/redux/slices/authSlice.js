import { createSlice } from '@reduxjs/toolkit'; // 1. slice 생성
import Cookies from 'js-cookie';

const initialState = {
  authData: Cookies.get('authData')
    ? JSON.parse(Cookies.get('authData')) //Cookies.get을 해서 authData가 있으면 바로 파싱
    : null, //없으면 null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      //update 상태값 변경
      state.authData = action.payload.authData;
      Cookies.set('authData', JSON.stringify(action.payload.authData), {
        expires: 1, //1일 동안 쿠키 저장 (쿠키의 유효기간)
      });
    },
    logout: (state) => {
      //상태값 비움
      state.authData = null;
      Cookies.remove('authData');
    },
  },
}); // slice 생성

export const { login, logout } = authSlice.actions;
export default authSlice.reducer; // 4. export 된 함수들을 store에 등록
