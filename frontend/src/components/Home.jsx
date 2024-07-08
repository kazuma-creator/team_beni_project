// src/components/Home.jsx
import React from 'react';

const Home = () => {
  return (
    <div style={styles.container}>
      <h1>Welcome to the Home Page</h1>
      <p>This is the home page of your application.</p>
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
    backgroundColor: '#f0f0f0',
    padding: '20px',
    boxSizing: 'border-box',
  },
};

export default Home;
