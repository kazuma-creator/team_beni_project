import React from 'react';

const MainContent = ({ communities }) => {
  return (
    <div style={styles.mainContent}>
      <h2>コミュニティ</h2>
      {communities.length > 0 ? (
        <ul>
          {communities.map((community, index) => (
            <li key={index}>{community.name}</li>
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
};

export default MainContent;
