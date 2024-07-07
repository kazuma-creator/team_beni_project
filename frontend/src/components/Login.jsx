import React, { useState } from 'react';

const Login = () => {
  const [userId, setUserId] = useState('');  // useStateの使用
  const [password, setPassword] = useState('');  // useStateの使用

  const handleLogin = () => {
    // ログイン処理をここに追加
    console.log('Logging in with', userId, password);
  };

  const handleRegister = () => {
    // 新規登録処理をここに追加
    console.log('Navigate to register page');
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <div style={styles.inputGroup}>
        <label>User ID</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={styles.input}
        />
      </div>
      <div style={styles.inputGroup}>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
      </div>
      <button onClick={handleLogin} style={styles.button}>
        Login
      </button>
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
    backgroundColor: '#F2A7B7',
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

export default Login;
