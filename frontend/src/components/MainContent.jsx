import React from 'react';
import {Link} from 'react-router-dom'

const MainContent = ({ communities }) => {
  return (
    <div style={styles.mainContent}>
      <h2>コミュニティ</h2>
      {communities.length > 0 ? (
        <ul>
          {communities.map((community, index) => (
            <li key={index} style={styles.communityItem}>
              <Link to={`/community/${community.id}`} style={styles.link}>
              
                <img src={community.icon_url} alt={community.name} style={styles.icon} />
                <h3>{community.name}</h3>
                <p>{community.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>参加しているコミュニティはありません</p>
      )}
    </div>
  );
};

const styles = {
  mainContent: {
    padding: '20px',
    flex: 1,
  },
  communityItem:{
    padding:'10px',
    borderBottom:'1px solid #ccc',
    marginBottom:'10px',
  },
  link:{
    textDecoration:'none',
    color:'inherit',
  },
  icon:{
    width:'50px',
    height:'50px',
    marginRight:'10px',
  },
};

export default MainContent;
