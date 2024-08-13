import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [user_id, setUserId] = useState(''); 
  const [password, setPassword] = useState(''); 
  const navigate = useNavigate();

  // ログインボタンを押したときの処理
  const handleLogin = () => {
    fetch('http://localhost:5000/login',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({user_id,password}),
    })
    .then(response => response.json())
    .then(data =>{
      if(data.message === 'Login successful'){
        console.log('Login successful',data.user);
        navigate('/home');
      }else{
        console.error('Login failed');
      }
    })
    .catch(error => {
      console.log('Error',error)
    });
  };
// 新規登録ボタンを押したときの処理
  const handleRegister = () => {
    navigate('/register');
    console.log('Navigate to register page');
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <div style={styles.inputGroup}>
        <label>User ID</label>
        <input
          type="text"
          value={user_id}
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
    backgroundImage: 'url("/images/タイトル背景.png")',
    backgroundSize: 'cover',
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
