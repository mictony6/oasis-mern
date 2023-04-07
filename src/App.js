import './index.css';
import { UserProvider } from './UserContext';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Welcome from './pages/Welcome';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home'


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Welcome/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/home" element={<Home/>}/>
      </Routes>
    </Router>
    
  );
}

export default App;
