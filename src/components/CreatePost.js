
import '../index.css';
import { useState } from 'react';
import { Container, Card, Col, Row, Dropdown, Form, FormControl, Button, Image } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive'
import placeholder from '../static/images/profile.svg'

export default function CreatePost() {
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    })

    const isLandscape = useMediaQuery({ query: '(orientation: landscape)' })

    const [show, setShow] = useState(false);

    const showDropdown = (e) => {
        setShow(true);
    }
    const hideDropdown = e => {
        setShow(false);
    }

    return (
        <Container fluid>
            {/* <Row className='d-flex'>
                <Col md={10} sm={8} className='d-flex justify-content-center align-items-center'>
                    <input
                        className='fake-input'
                        placeholder="What are you thinkin'?"
                    />
                </Col>
                <Col md={1} sm={2} className='d-flex justify-content-center align-items-center'>
                    <button className='new-post-button'>+</button>
                </Col>
                <Col md={1} sm={2} className='d-flex justify-content-center align-items-center flex-column'
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
            </Row> */}

            <Container fluid className="d-flex flex-row my-4 justify-content-between  ">
                <div className='rounded-4 d-flex flex-row p-2 shadow-focus w-100' >
                    <FormControl placeholder={"Whats on your mind?"} className='border-0 w-100 shadow-none'></FormControl>
                    <Button className=" rounded px-4 bg-primary border-0 " >+</Button>
                </div>
                <Dropdown className='d-flex justify-content-center align-items-center flex-column'
                onMouseEnter={showDropdown}
                onMouseLeave={hideDropdown}>
                    <Image src={placeholder} className="mx-2 w-auto "></Image>

                    <Dropdown.Menu show={show}
                        className='profile-dropdown'
                    >
                        <Dropdown.Item href="profile">Profile</Dropdown.Item>
                        <Dropdown.Item href="settings">Settings</Dropdown.Item>
                        <Dropdown.Item href="logout">Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Container>



        </Container>
    )
}