import React, { useState } from 'react';
const Header= () => {
	
	//必要な機能はここに追加してー


  return (
	//ここにHTML的な感じで書く！
    <div style={styles.homeclass}>
        <div style={styles.icon}>
          <img src="icon.png"></img>
        </div>
        <div style={styles.username}>
          <span>user_name</span>
        </div>
        <div style={styles.button}>
          <button>コミュニティを追加</button>
        </div>
    </div>

     );
};


const styles = {
	//ここにCSSを書く！
  homeclass:{
    display: 'flex',
    background: rgb(130, 124, 124),
    alignItems: 'center',
  },

  icon:{
    display: 'flex',
    marginleft: '10px',
    width: '40px',
    height: '40px',
  },


  username:{
    display: 'flex',
    marginleft: '40px',
    fontsize: '30px',
  },

  button:{
    display: 'flex',
    marginleft: '80px',
    fontsize: '20px',
    color:aliceblue,     /*ボタンの文字のカラー*/
    backgroundcolor:coral, /*ボタンの背景のカラー*/
    borderradius: '5px',       /*ボタンの角を丸くする*/

  }
};


export default Header;