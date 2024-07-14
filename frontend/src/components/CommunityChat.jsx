import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CommunityChat = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/community/${id}/messages`)
      .then(response => response.json())
      .then(data => {
        setMessages(data);
      })
      .catch(error => console.error('Error fetching messages:', error));
  }, [id]);

  const handleSendMessage = () => {
    fetch(`http://localhost:5000/community/${id}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: newMessage, user_id: 1 }),  // ユーザーIDは仮に1を設定
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Message sent successfully') {
          setMessages([...messages, { content: newMessage, user_id: 1 }]);
          setNewMessage('');
        } else {
          console.error('Failed to send message:', data.message);
        }
      })
      .catch(error => console.error('Error sending message:', error));
  };

  return (
    <div>
      <h2>チャット</h2>
      <div>
        {messages.map((message, index) => (
          <p key={index}>{message.content}</p>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>送信</button>
    </div>
  );
};

export default CommunityChat;
