
import { useContext, useState } from 'react';
import '../index.css';
import { Container, Form } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive'
import Swal from 'sweetalert2'
import UserContext from '../UserContext'
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const {setUser} = useContext(UserContext)
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    })
    const isLandscape = useMediaQuery({ query: '(orientation: landscape)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")

    const location = useNavigate()

    function loginUser(e) {
        e.preventDefault()
        
        fetch('http://localhost:4000/user/login', {

        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            username : username,
            password : password
        })

        }).then(res => res.json())
        .then(data => {
            if(typeof data.accessToken !== "undefined"){
                localStorage.setItem('token',data.accessToken)
                retrieveUserDetails(data.accessToken)

                Swal.fire({
                    title: "Login Successful",
                    icon: "success",
                    text: "This is a safe space."
                })

                location("/home");

            } else {
                Swal.fire({
                    title: "Authentication Failed",
                    icon: "error",
                    text: "Check your credentials"
                }) 
            }
        
        })
        setUsername('');
        setPassword('');

    }

    const retrieveUserDetails = (token) =>{
        fetch('http://localhost:4000/user/getUserDetails',{
        headers : {
            Authorization: `Bearer ${token}`
        }
        }).then(res => res.json())
        .then(data => {
            if(typeof data.user_id !== "undefined"){
				setUser({
					id: data.user_id,
					username: data.username,
                    email: data.email,
					role: data.role,
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
        
    }

    return (
        <div className='pages'>
        <Container fluid className='auth-container'>
            <Form className='form-container'>
                <Form.Text>
                    <h1 className='sign-in-heading'>Sign in</h1>
                </Form.Text>
                <Form.Control type="text" placeholder="Username"
                className='form-text'
                onChange = {e => setUsername(e.target.value)}
                />
                <Form.Control type="password" placeholder="Password"
                className='form-text'
                onChange = {e => setPassword(e.target.value)}
                />
                <Form.Text className='sign-in-text'> <a href='/register'> Don't have an account yet? </a></Form.Text>
                <button className='sign-up-button' type="submit" onClick={loginUser}>
                    Sign In
                </button>
            </Form>
        </Container>
        </div>   
        )
}