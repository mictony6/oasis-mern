
import '../index.css';
import { useState } from 'react';
import { Container, Card, Col, Row, Dropdown } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive'
import placeholder from '../static/images/profile.svg'

export default function CreatePost() {
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    })

    const isLandscape = useMediaQuery({ query: '(orientation: landscape)' })

    const [show, setShow] = useState(false);

    const showDropdown = (e)=>{
        setShow(true);
    }
    const hideDropdown = e => {
        setShow(false);
    }

    return (
        <Container fluid>
            <Row>
                <Col md = {10} className='d-flex justify-content-center align-items-center'>
                    <input
                        className='fake-input' 
                        placeholder="What are you thinkin'?"
                    />
                </Col>
                <Col md = {1} className='d-flex justify-content-center align-items-center'>
                    <button className='new-post-button'>+</button>
                </Col>
                <Col md = {1} className='d-flex justify-content-center align-items-center flex-column'
                onMouseEnter={showDropdown}
                onMouseLeave={hideDropdown}
                >
                
                <Dropdown>
                    <img
                        src={placeholder}
                        alt='profile'
                        className='profile-avatar'
                    />

                    <Dropdown.Menu show={show}
                    className='profile-dropdown'
                    >
                        <Dropdown.Item href="profile">Profile</Dropdown.Item>
                        <Dropdown.Item href="settings">Settings</Dropdown.Item>
                        <Dropdown.Item href="logout">Logout</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
        </Container>
        )
}