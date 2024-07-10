import React from 'react';

const Header = ({ username, onCreateCommunity }) => {
  return (
    <div style={styles.header}>
      <div style={styles.userInfo}>
        <div style={styles.avatar}></div>
        <span>{username}さん</span>
      </div>
      <button onClick={onCreateCommunity} style={styles.createButton}>コミュニティを作成</button>
    </div>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#f5f5f5',
    borderBottom: '1px solid #ccc',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#007bff',
    marginRight: '10px',
  },
  createButton: {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#ff7043',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default Header;
