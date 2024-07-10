import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

const Home = () => {
  const [username, setUsername] = useState('UserName');  // 実際のユーザー名を設定
  const [communities, setCommunities] = useState([]);  // 所属コミュニティのリスト

  const handleCreateCommunity = () => {
    // コミュニティ作成処理をここに追加
    console.log('Create Community button clicked');
  };

  return (
    <div style={styles.container}>
      <Header username={username} onCreateCommunity={handleCreateCommunity} />
      <div style={styles.content}>
        <Sidebar />
        <MainContent communities={communities} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  content: {
    display: 'flex',
    flex: 1,
  },
};

export default Home;
