import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CommunityChat = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // メッセージの取得
    fetch(`http://localhost:5000/community/${id}/messages`)
      .then(response => response.json())
      .then(data => {
        setMessages(data);
      })
      .catch(error => console.error('Error fetching messages:', error));
  }, [id]);

  const handleSendMessage = () => {
    const userId = 1;

    fetch(`http://localhost:5000/community/${id}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: newMessage, user_id: userId }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Message sent successfully') {
          setMessages([...messages, { content: newMessage, user_id: userId,username:data.username }]);
          setNewMessage('');
        } else {
          console.error('Failed to send message:', data.message);
        }
      })
      .catch(error => console.error('Error sending message:', error));
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.avatar}></div>
        <span>usernameさん</span>
      </div>
      <h2 style={styles.title}>チャット</h2>
      <div style={styles.chatBox}>
        {messages.map((message, index) => (
          <div key={index} style={styles.message}>
            <strong>{message.username}:</strong> {message.content}
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <button onClick={() => navigate(-1)} style={styles.backButton}>戻る</button>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          style={styles.input}
          placeholder="メッセージを入力"
        />
        <button onClick={handleSendMessage} style={styles.sendButton}>送信</button>
      </div>
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
  title: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  chatBox: {
    width: '80%',
    height: '300px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    marginBottom: '20px',
    padding: '10px',
    overflowY: 'scroll',
    backgroundColor: '#fff',
  },
  message: {
    padding: '10px',
    borderBottom: '1px solid #ccc',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '80%',
  },
  backButton: {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    marginRight: '10px',
  },
  input: {
    flex: 1,
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginRight: '10px',
  },
  sendButton: {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#ff7043',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default CommunityChat;
