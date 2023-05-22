import './index.css';
import { UserProvider } from './UserContext';
// import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from "react-router-dom";
import Welcome from './pages/Welcome';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home'
import { useState } from 'react';
import PostDetail from "./pages/PostDetail";
import Counselling from "./pages/Counselling";
import Logout from './pages/Logout';
import Messaging from "./pages/Messaging";
import { useEffect } from 'react';
import User from "./pages/User";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Therapist from './pages/Therapist';
import { PostProvider } from './PostContext';
import Settings from './pages/Settings';


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

  useEffect(() => {
		fetch('http://localhost:4000/user/getUserDetails',{
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		}).then(res => res.json())
		.then(data =>{
			if(typeof data[0].user_id !== "undefined"){
				setUser({
					id: data[0].user_id,
					username: data[0].username,
					email: data[0].email,
					role: data[0].role,
				});
			} else {
				setUser({
          id: null,
          username: null,
          email: null,
          role: null,
				})
			}
		})
	}, [])

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route >
                <Route exact path="/" element={<Welcome/>}/>
                <Route exact path="/register" element={<Register/>}/>
                <Route exact path="/login" element={<Login/>}/>
                <Route exact path="/home" element={<Home/>}/>
                <Route exact path="/user/:user_id" element={<User/>}/>
                <Route exact path="/therapist" element={<Therapist/>}/>
                <Route exact path="/post/:post_id" element={<PostDetail/>}/>
                <Route exact path="/counselling" element={<Counselling/>}/>
                <Route exact path="/logout" element={<Logout/>}/>
                <Route exact path="/chats/:contact_id" element={<Messaging/>}/>
                <Route exact path="/settings" element={<Settings/>}/>
            </Route>
        )
    );
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <UserProvider value={{user, setUser, unsetUser}}>
    <PostProvider>
        <RouterProvider router={router} />
    </PostProvider>
    </UserProvider>
    </LocalizationProvider>

    
  );
}

export default App;
