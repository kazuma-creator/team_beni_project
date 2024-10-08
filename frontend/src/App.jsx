import React from 'react'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home';
import CommunityDetail from './components/CommunityDetail';
import CommunityChat from './components/CommunityChat';
import CommunityMembers from './components/CommunityMembers';
import TitleScreen  from './components/TitleScreen';

const App = () =>{
  return(
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/community/:id" element={<CommunityDetail />} />
        <Route path="/community/:id/chat" element={<CommunityChat />} />
        <Route path="/community/:id/members" element={<CommunityMembers />} />
        <Route path="/" element={<TitleScreen />} />
      </Routes>
    </Router>
  );
}

export default App