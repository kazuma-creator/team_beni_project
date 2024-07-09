import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  // 状態管理
  const [username, setUsername] = useState('');
  const [user_id, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // 登録ボタンをクリックしたときの処理
  const handleRegister = () => {
    const data = {username,user_id,password};
    fetch('http://localhost:5000/register', {
      method: 'POST',
      // リクエストヘッダーの設定
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
      // 登録が成功した場合に、ログインページに遷移
        if (data.message === 'User registered successfully') {
          console.log('Registration successful');
          navigate('/login');
        } else {
          console.error('Registration failed');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div style={styles.container}>
      <h2>新規登録</h2>
      <div style={styles.inputGroup}>
        <label>Username</label>
        {/*ユーザー名*/}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
      </div>
      <div style={styles.inputGroup}>
        <label>User ID</label>
        {/*ユーザーID*/}
        <input
          type="text"
          value={user_id}
          onChange={(e) => setUserId(e.target.value)}
          style={styles.input}
        />
      </div>
      <div style={styles.inputGroup}>
        <label>Password</label>
        {/*パスワード*/}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
      </div>
      <button onClick={handleRegister} style={styles.button}>
        新規登録
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    boxSizing: 'border-box',
  },
  inputGroup: {
    margin: '10px 0',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '300px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginTop: '5px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    margin: '10px 0',
    width: '100%',
    maxWidth: '320px',
  },
};

export default Register;
