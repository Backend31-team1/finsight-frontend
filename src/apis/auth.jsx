import axios from 'axios';
import { SERVER_URL } from '../constants/config';

//회원가입
export const signup = async (formData) => {
  try {
    const response = await axios.post(`${SERVER_URL}/auth/signup`, formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

//이메일 인증 요청
export const requestEmailVerification = async (email) => {
  try {
    // 회원가입 POST 요청으로 인증 메일 발송
    const response = await axios.post(`${SERVER_URL}/auth/signup`, { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

//이메일 인증
export const verifyEmail = async (email, code) => {
  try {
    const response = await axios.get(`${SERVER_URL}/auth/signup/verify`, {
      params: { email, code }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}; 