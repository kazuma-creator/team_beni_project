import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CommunityMembers = () => {
  const { id } = useParams();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/community/${id}/members`)
      .then(response => response.json())
      .then(data => {
        setMembers(data.members);
      })
      .catch(error => console.error('Error fetching members:', error));
  }, [id]);

  return (
    <div style={styles.container}>
      <h2>メンバー</h2>
      <ul>
        {members.map(member => (
          <li key={member.id} style={styles.memberItem}>
            {member.username}
          </li>
        ))}
      </ul>
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
  memberItem: {
    padding: '10px',
    borderBottom: '1px solid #ccc',
    marginBottom: '10px',
  },
};

export default CommunityMembers;
