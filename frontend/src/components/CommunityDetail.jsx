import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CommunityDetail = () => {
  const { id } = useParams();
  const [community, setCommunity] = useState(null);
  const [isMember, setIsMember] = useState(false); // 追加
  const navigate = useNavigate();

  useEffect(() => {
    // コミュニティ情報の取得
    fetch(`http://localhost:5000/community/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched community data:', data); // デバッグ用ログ
        setCommunity(data);
      })
      .catch(error => console.error('Error fetching community:', error));
    
    // ユーザーがコミュニティのメンバーであるかを確認
    fetch('http://localhost:5000/is_member', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ community_id: id, user_id: 1 }), // 仮のユーザーIDを使用
    })
      .then(response => response.json())
      .then(data => {
        setIsMember(data.is_member);
      })
      .catch(error => console.error('Error checking membership:', error));
  }, [id]);

  const handleJoinCommunity = () => {
    fetch('http://localhost:5000/join_community', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ community_id: id, user_id: 1 }), // 仮のユーザーIDを使用
    })
      .then(response => response.json())
      .then(data => {
        console.log('Join community response:', data); // デバッグ用ログ
        if (data.message === 'Joined successfully') {
          setIsMember(true); // メンバーとしてマーク
        } else {
          console.error('Failed to join community:', data.message);
        }
      })
      .catch(error => console.error('Error joining community:', error));
  };

  if (!community) return <p>Loading...</p>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.avatar}></div>
        <span>usernameさん</span>
      </div>
      <div style={styles.iconContainer}>
        <div style={styles.communityIcon}>コミュニティアイコン</div>
      </div>
      <h2 style={styles.title}>{community.name}</h2>
      {isMember ? ( // 追加: メンバーかどうかを確認
        <div style={styles.buttonContainer}>
          <button onClick={() => navigate(-1)} style={styles.button}>戻る</button>
          <button onClick={() => navigate(`/community/${id}/members`)} style={styles.button}>メンバー</button>
          <button onClick={() => navigate(`/community/${id}/chat`)} style={styles.button}>チャット</button>
        </div>
      ) : (
        <button onClick={handleJoinCommunity} style={styles.joinButton}>参加</button>
      )}
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
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  avatar: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#007bff',
    marginRight: '10px',
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  communityIcon: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    border: '2px solid #007bff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: '600px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#ff7043',
    color: '#fff',
    cursor: 'pointer',
  },
  joinButton: {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#ff7043',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default CommunityDetail;
