import React from 'react';

const Sidebar = () => {
  return (
    <div style={styles.sidebar}>
      <input type="text" placeholder="検索" style={styles.searchBox} />
      <div style={styles.communityList}>
        <p>検索結果のコミュニティ一覧</p>
        {/* 検索結果のコミュニティを表示 */}
      </div>
    </div>
  );
};

const styles = {
  sidebar: {
    padding: '20px',
    borderRight: '1px solid #ccc',
    width: '250px',
  },
  searchBox: {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
  },
  communityList: {
    padding: '10px',
    border: '1px solid #ccc',
  },
};

export default Sidebar;
