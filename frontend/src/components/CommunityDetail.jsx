import React,{useEffect,useState} from 'react'
import {useParams,useNavigate} from 'react-router-dom'

const CommunityDetail = () =>{
  const{id} = useParams();
  const[community,setCommunity] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/community/${id}`)
    .then(response => {
      if(!response.ok){
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Fetched community data:',data)//デバッグ用ログ
      setCommunity(data);
    })
    .catch(error => console.error('Error fetching community:',error));
  },[id]);
  

  const handleJoinCommunity = () =>{
    fetch(`http://localhost:5000/join_community`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({community_id: id,user_id:1}),
    })
    .then(response => response.json())
    .then(data =>{
      console.log('Join community response:',data);//デバッグ用ログ
      if(data.message === 'Joined successfully'){
        navigate(`/community/${id}/chat`);
      }else{
        console.error('Failed to join community:',data.message);
      }
    })
    .catch(error => console.error('Error joining community:',error));
  };

  if(!community) return <p>Loading...</p>;

  return(
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.avatar}></div>
        <span>{community.username}さん</span>
      </div>
      <h2 style={styles.title}>{community.name}</h2>
      <div style={styles.descriptionBox}>
        <p style={styles.description}>{community.description}</p>
      </div>
      <div style={styles.buttonContainer}>
        <button onClick={() => navigate(-1)} style={styles.backButton}>戻る</button>
        <button onClick={handleJoinCommunity} style={styles.joinButton}>参加</button>
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
  descriptionBox: {
    width: '60%',
    padding: '20px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    marginBottom: '20px',
    textAlign: 'center',
  },
  description: {
    fontSize: '16px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: '300px',
  },
  backButton: {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
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