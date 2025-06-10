import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup, requestEmailVerification, verifyEmail } from '../apis/auth';
import '../css/SignupForm.css';

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    nickname: '',
    birth: ''
  });
  const [error, setError] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [verifyMsg, setVerifyMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSendVerification = async () => {
    setError('');
    setVerifyMsg('');
    setLoading(true);
    try {
      await requestEmailVerification(formData.email);
      setEmailSent(true);
      setVerifyMsg('인증 메일이 발송되었습니다. 메일을 확인해 주세요.');
    } catch (error) {
      setError(error.message || '이메일 인증 요청 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    setError('');
    setVerifyMsg('');
    setLoading(true);
    try {
      await verifyEmail(formData.email, verificationCode);
      setIsEmailVerified(true);
      setVerifyMsg('이메일 인증이 완료되었습니다!');
    } catch (error) {
      setError(error.message || '인증 코드가 올바르지 않습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEmailVerified) {
      setError('이메일 인증을 완료해 주세요.');
      return;
    }
    try {
      const response = await signup({
        ...formData,
        birth: formData.birth ? formData.birth : null
      });
      alert(response);
      navigate('/login');
    } catch (error) {
      setError(error.message || '회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>회원가입</h2>
        {error && <div className="error-message">{error}</div>}
        {verifyMsg && <div className="error-message" style={{color:'#357abd', background:'#eaf3ff'}}>{verifyMsg}</div>}
        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <div style={{display:'flex', gap:'0.5rem'}}>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isEmailVerified}
              style={{flex:1}}
            />
            <button type="button" className="signup-button" style={{width:'auto',padding:'0 1rem'}} onClick={handleSendVerification} disabled={loading || isEmailVerified}>
              {isEmailVerified ? '인증완료' : '이메일 인증'}
            </button>
          </div>
        </div>
        {emailSent && !isEmailVerified && (
          <div className="form-group">
            <label htmlFor="verificationCode">인증코드</label>
            <div style={{display:'flex', gap:'0.5rem'}}>
              <input
                type="text"
                id="verificationCode"
                name="verificationCode"
                value={verificationCode}
                onChange={e => setVerificationCode(e.target.value)}
                required
                style={{flex:1}}
              />
              <button type="button" className="signup-button" style={{width:'auto',padding:'0 1rem'}} onClick={handleVerifyCode} disabled={loading}>
                인증 확인
              </button>
            </div>
          </div>
        )}
        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="nickname">닉네임</label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="birth">생년월일</label>
          <input
            type="date"
            id="birth"
            name="birth"
            value={formData.birth}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="signup-button" disabled={!isEmailVerified || loading}>회원가입</button>
      </form>
    </div>
  );
};

export default SignupForm; 