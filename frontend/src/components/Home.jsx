import React, { useEffect, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

const Home = () => {
  const [username, setUsername] = useState('UserName');  // 実際のユーザー名を設定
  const [communities, setCommunities] = useState([]);  // 所属コミュニティのリスト
  const userId = 1; // ログインしたユーザーのIDを設定

  useEffect(() => {
    // ユーザー情報を取得してusernameを設定する
    fetch('http://localhost:5000/user_info')
      .then(response => response.json())
      .then(data => {
        if (data.username) {
          setUsername(data.username);// ユーザー名をstateに設定
        }
      })
      .catch(error => console.error('Error fetching user info:', error));


    //所属コミュニティを取得して、communitiesを設定
    fetch(`http://localhost:5000/get_communities/${userId}`)
      .then(response => response.json())
      .then(data => {
        if (data.communities) {
          setCommunities(data.communities);// コミュニティリストをstateに設定
        }
      })
      .catch(error => console.error('Error fetching communities:', error));
  }, [userId]);// userIdが変わると再実行される

  // コミュニティ作成処理
  const handleCreateCommunity = (formData) => {
    fetch('http://localhost:5000/create_community', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Community created successfully') {
          setCommunities([...communities, { 
            name: formData.get('name'), 
            description: formData.get('description'),
            icon_url: formData.get('icon') ? URL.createObjectURL(formData.get('icon')) : null
          }]);// コミュニティリストを更新
        } else {
          console.error('Community creation failed:', data.message);
        }
      })
      .catch(error => console.error('Error creating community:', error));
  };

  return (
    <div style={styles.container}>
      <Header username={username} onCreateCommunity={handleCreateCommunity} />{/* Headerにusernameを渡す*/}
      <div style={styles.content}>
        <Sidebar />
        <MainContent communities={communities} />{/**MainContentにcommunitiesを渡す */}
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
