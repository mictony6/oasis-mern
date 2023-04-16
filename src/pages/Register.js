
import '../index.css';
import React, { useContext,useEffect, useRef, useState } from "react";
import { Container, Form } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

export default function Register() {
    // const isDesktopOrLaptop = useMediaQuery({
    //     query: '(min-width: 1224px)'
    // })
    // const isLandscape = useMediaQuery({ query: '(orientation: landscape)' })
    // const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

        // state hooks to store the values of the input fields
    
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [verifyPassword, setVerifyPassword] = useState("")
    
    const [isValidUsername, setValidUsername] = useState(false)
    const [isValidEmail, setValidEmail] = useState(false)
    const [isValidPassword, setValidPassword] = useState(false)
    const [isVerified, setVerified] = useState(false)
    const [emailExists, setEmailExists] = useState(false)
    const [usernameExists, setUsernameExists] = useState(false)
    const [isActive, setIsActive] = useState(false)

    const location = useNavigate();

    useEffect(()=> {
        // Regex for validity
            const valid_username= /^[a-z0-9_.-]{3,15}$/
            const valid_email = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
            const valid_password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

            username.match(valid_username) ? setValidUsername(true) : setValidUsername(false)

            // check if username already exists
            fetch('http://localhost:4000/user/checkUsername', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    username: username
                })
                }).then(res => res.json())
                .then(data => {
                    data ? setUsernameExists(true) : setUsernameExists(false)
                })

            if(password.match(valid_password)) {
                setValidPassword(true)
            } else {
                setValidPassword(false)
            }

            email.match(valid_email) ? setValidEmail(true) : setValidEmail(false)

            if(email.match(valid_email)){
                setValidEmail(true)
            } else {
                setValidEmail(false)
            }

            // check if email already exists
            fetch('http://localhost:4000/user/checkEmail', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    email: email
                })
                }).then(res => res.json())
                .then(data => {
                    data ? setEmailExists(true) : setEmailExists(false)
                })

            if(password.match(valid_password)) {
                setValidPassword(true)
            } else {
                setValidPassword(false)
            }

            if(verifyPassword !== '' && password === verifyPassword) {
                setVerified(true)
            } else {
                setVerified(false)
            }            
    
            if(isValidEmail && isValidPassword && isVerified && !emailExists && !usernameExists) {
                console.log('Btn must be active')
                setIsActive(true)
            } else {
                setIsActive(false)
            } 
    
        }, [username, email, password, verifyPassword, isValidUsername, isValidEmail, isValidPassword, isVerified, emailExists, usernameExists, isActive])

    function register(e){
        
        e.preventDefault()
        fetch('http://localhost:4000/user/register', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            username : username,
            email: email,
            password : password
        })

        }).then(res => res.json())
        .then(data => {
            if(typeof data.accessToken !== "undefined"){
                localStorage.setItem('token',data.accessToken)

                Swal.fire({
                    title: "Welcome.",
                    text: "this is a safe space.",
                    color: '#3A3530',
                    confirmButtonText: "Let me in",
                    buttonsStyling: false,
                    customClass: {
                        confirmButton: 'button2'
                    }
                })

                location("/home");

            } else {
                Swal.fire({
                    title: "Oh no! Something went wrong :(",
                    icon: "error",
                    text: "Please hold on a moment...",
                    color: '#3A3530',
                    confirmButtonText: "Try again",
                    buttonsStyling: false,
                    customClass: {
                        confirmButton: 'button2'
                    }
                }) 
            }
        
        })
        setUsername(username);
        setEmail(email);
        setPassword(password);
        setVerifyPassword(verifyPassword);
    }

    return (
        <div className='pages'>
        <Container fluid className='auth-container'>
            <Form className='form-container'>
                <Form.Text>
                    <h1 className='sign-in-heading'>Sign up</h1>
                </Form.Text>
                <Form.Control type="text" placeholder="Username" className='form-text'
                onChange = {e => {
                    setUsername(e.target.value)
                }}
                />
                {(!isValidUsername && username !== '') && <Form.Text className='error-msg'>Username must be 3-15 characters long and may only contain letters, numbers, and special characters ._-</Form.Text>
                }
                {(usernameExists) && <Form.Text className='error-msg'>Username already taken. Please try another one.</Form.Text>
                }

                <Form.Control type="email" placeholder="Email Address"
                autoComplete ="true"
                className='form-text'
                onChange = {e => {
                    setEmail(e.target.value)
                }}
                />
                
                {(!isValidEmail && email !== '') && <Form.Text className='error-msg'>Please input a valid email (e.g. juan@example.com).</Form.Text>
                }
                {(emailExists) && <Form.Text className='error-msg'>An account with this email already exists!</Form.Text>
                }
                
                <Form.Control type="password" placeholder="Password"
                className='form-text'
                onChange = {e => {
                        setPassword(e.target.value)
                }}
                />
                {(!isValidPassword && password !== '') && <Form.Text className='error-msg'> Password must be at least 8 characters in length and contain at least 1 uppercase letter, 1 number, and 1 special character.</Form.Text>
                }

                <Form.Control type="password" placeholder="Confirm Password"
                className='form-text'
                onChange = {e => {
                        setVerifyPassword(e.target.value)
                }}
                />
                {(!isVerified && verifyPassword !== '') && <Form.Text className='error-msg'> Passwords must match.</Form.Text>
                }
                <Form.Text className='sign-in-text'> <a href='/login'> Already have an account? </a></Form.Text>
                                
                <button className='sign-up-button' type="submit" onClick={register} disabled={!isActive}>
                    Sign Up
                </button>
            </Form>
        </Container>
        </div>   
        )
}