import React from 'react'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Login from './components/Login'
import Home from './components/Home';

const App = () =>{
  return(
    <Router>
      <Routes>
        <Route path='/login' Component={Login}/>
        <Route path='/home' Component={Home} />
        <Route path='/' Component={Login} />
      </Routes>
    </Router>
  );
}

export default App