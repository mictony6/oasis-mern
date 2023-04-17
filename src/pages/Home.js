
import '../index.css';
import { useState } from 'react';
import { Row, Col, Container,  Offcanvas, Form } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive'
import AppNavbar from '../components/AppNavbar';
import toggle from '../static/images/hamburger-menu.svg'
import PostCards from '../components/PostCards';
import CreatePost from '../components/CreatePost';

import RightSidebar from '../components/RightSidebar';
import { useEffect } from 'react';


export default function Home() {
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    })

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch("http://localhost:4000/post/viewAll",
        {method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        }
        )
        .then(res => res.json())
        .then(data => {
            setPosts(data.map(post => {
                return(
                <PostCards key={post.post_id} postProp= {post} minimize={true}/>            
            )
        }))
    })
    })
    return (
        isDesktopOrLaptop ?
            <Container fluid>
                <Row className='d-flex flex-row'>
                    <Col lg={2} className=''>
                        <AppNavbar/>
                    </Col>
                    <Col className='d-flex flex-column my-4 '>
                        <CreatePost />
                        <Row className='d-flex flex-row align-items-center px-4'>
                            <Col xs={2} className=''>
                                <label htmlFor='sort-type'>Sort by:</label>
                            </Col>
                            <Col xs={10} className='d-flex flex-row'>
                                <Form.Select aria-label="sort-type" name='' id='sort-type' className="border rounded-3" defaultValue={"1"}>
                                    <option value="1">Recent</option>
                                    <option value="2">Top</option>
                                </Form.Select>
                            </Col>
                        </Row>
                        {posts}
                    </Col>
                    <Col lg={3} className='p-0 m-0 '>
                        <RightSidebar />
                    </Col>
                </Row>
            </Container>
            :
            <Container fluid>
                {/* Navbar toggler for mobile */}
                <img
                    src={toggle}
                    alt="menu"
                    className='nav-toggle mt-4 ms-2'
                    onClick={handleShow}
                />
                <Container fluid>
                    <Row className='d-flex flex-row'>
                        <Col lg={2} className=''>
                            <AppNavbar />
                        </Col>
                        <Col className='d-flex flex-column'>
                            {/* TODO: Make CreatePost component responsive*/}

                            <CreatePost />
                            <Row className='d-flex flex-row align-items-center px-4'>
                                <Col xs={2} className=''>
                                    <label for='sort-type'>Sort by:</label>
                                </Col>
                                <Col xs={10} className='d-flex flex-row'>
                                    <Form.Select aria-label="sort-type" name='' id='sort-type' className="border rounded-3
                                    defaultValue='1">
                                        <option value="1">Recent</option>
                                        <option value="2">Top</option>
                                    </Form.Select>
                                </Col>
                            </Row>
                            <PostCards />
                            <PostCards />
                            <PostCards />
                            <PostCards />
                            <PostCards />
                            <PostCards />
                        </Col>
                        <Col lg={2} className=''>
                            <RightSidebar />
                        </Col>
                    </Row>
                </Container>
                :
                <Container fluid>
                    {/* Navbar toggler for mobile */}
                    <img
                        src={toggle}
                        alt="menu"
                        className='nav-toggle mt-4 ms-2'
                        onClick={handleShow}
                    />



                    {/* Navbar */}
                    <Offcanvas show={show} onHide={handleClose}>
                        <Offcanvas.Header closeButton className='justify-content-end' />
                        <AppNavbar />
                    </Offcanvas>
                </Container>
                )
                {/* Navbar */}
                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton className='justify-content-end' />
                    <AppNavbar />
                </Offcanvas>
                <CreatePost />
            </Container>
    )
}