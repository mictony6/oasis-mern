import './index.css';
import { UserProvider } from './UserContext';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Welcome from './pages/Welcome';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home'
import { useState } from 'react';


function App() {

  const [user, setUser] = useState({
    id: null,
    username: null,
    email: null,
    role: null,
	});

  const unsetUser = () => {
		localStorage.clear();
	};

  return (
    <UserProvider value={{user, setUser, unsetUser}}>
    <Router>
      <Routes>
        <Route exact path="/" element={<Welcome/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/home" element={<Home/>}/>
      </Routes>
    </Router>
    </UserProvider>

    
  );
}

export default App;
