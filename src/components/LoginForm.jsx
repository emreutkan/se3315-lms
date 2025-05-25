import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { login as apiLogin, register as apiRegister } from '../api/auth';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        // Handle login
        const { data } = await apiLogin(username, password);
        login(data.access_token);
      } else {
        // Handle registration
        const { data } = await apiRegister(username, password, email, 'user');
        // After successful registration, either log them in automatically
        // or show a success message
        alert('Kayıt başarılı! Şimdi giriş yapabilirsiniz.');
        setIsLogin(true); // Switch back to login mode
      }
    } catch (err) {
      setError(isLogin
        ? 'Geçersiz kullanıcı adı veya şifre.'
        : 'Kayıt sırasında bir hata oluştu.'
      );
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>{isLogin ? 'Giriş Yap' : 'Kayıt Ol'}</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label>Kullanıcı Adı:</label>
          <input value={username} onChange={e => setUsername(e.target.value)} required/>
        </div>
        {!isLogin && (
          <div className="form-group">
            <label>E-posta:</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required={!isLogin}
            />
          </div>
        )}
        <div className="form-group">
          <label>Şifre:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required/>
        </div>
        <button className="submit-btn">{isLogin ? 'Giriş Yap' : 'Kayıt Ol'}</button>
        <p className="toggle-form">
          {isLogin ? 'Hesabınız yok mu?' : 'Zaten hesabınız var mı?'}
          <button type="button" className="toggle-btn" onClick={()=>{setIsLogin(!isLogin); setError('');}}>
            {isLogin ? 'Kayıt Ol' : 'Giriş Yap'}
          </button>
        </p>
      </form>
    </div>
  );
}

