import React,{useState} from 'react';

const Header = ({ username, onCreateCommunity }) => {
const [isModalOpen,setIsModalOpen] = useState(false);
const [communityName,setCommunityName] = useState('');
const [description,setDescription] = useState('');

// コミュニティ作成ボタンをクリックしたときの処理
const handleCreateCommunity = () =>{
  onCreateCommunity(communityName,description);
  setCommunityName(''); // 入力フィールドをクリア
  setDescription(''); // 入力フィールドをクリア
  setIsModalOpen(false);// モーダルを閉じる
};

  return (
    <div style={styles.header}>
      <div style={styles.userInfo}>
        <div style={styles.avatar}></div>
        <span>{username}さん</span>{/* ログインユーザーのユーザ名を表示*/}
      </div>
      <button onClick={() => setIsModalOpen(true)} style={styles.createButton}>
        コミュニティを作成
      </button>
      {isModalOpen &&(
        <div style={styles.modal}>
        <div style={styles.modalContent}>
          <h2>新しいコミュニティを作成</h2>
          <input
            type="text"
            placeholder="コミュニティ名"
            value={communityName}
            onChange={(e) => setCommunityName(e.target.value)}
            style={styles.input}
          />
          <textarea
            placeholder="説明"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.textarea}
          ></textarea>
          <button onClick={handleCreateCommunity} style={styles.button}>
            作成
          </button>
          <button onClick={() => setIsModalOpen(false)} style={styles.button}>
            キャンセル
          </button>
        </div>
      </div>
      )}
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
  modal: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '5px',
    width: '400px',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
    minHeight: '100px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    margin: '10px 0',
    width: '100%',
  },};

export default Header;
