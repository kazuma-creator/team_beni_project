import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TitleScreen = () => {

  const navigate = useNavigate();

  useEffect(()=>{
    const timer = setTimeout(()=>{
      navigate('/login');
    },5000);
    return () => clearTimeout(timer);//クリーンアップ
  },[navigate]);


  return (
    <div style={styles.container}>
      <img src="/images/タイトルロゴ.png" alt="みんなの 推し活 共有" style={styles.logo} />
      <div style={styles.spinner}></div>
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
    backgroundImage: 'url("/images/タイトル背景.png")',
    backgroundSize: 'cover',
    textAlign: 'center',
  },
  logo: {
    width: '100%',
    maxWidth: '800px',
    height: 'auto',
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '5px solid lightgray',
    borderTop: '5px solid #007bff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
};

export default TitleScreen;
