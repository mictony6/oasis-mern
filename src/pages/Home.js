
import '../index.css';
import { useState } from 'react';
import { Row, Col, Container, Card, Offcanvas } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive'
import AppNavbar from '../components/AppNavbar';
import toggle from '../static/images/hamburger-menu.svg'
import PostCards from '../components/PostCards';

export default function Home() {
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    })

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        isDesktopOrLaptop ?
        <Container fluid>
            <Row className='d-flex flex-row'>
                <Col lg={2} className='nav-col'>
                    <AppNavbar/>
                </Col>
                <Col lg={{offset: 2, size: 8}} className='home-col d-flex flex-column'>
                    <PostCards/>
                    <PostCards/>
                    <PostCards/>
                    <PostCards/>
                    <PostCards/>
                    <PostCards/>
                </Col>
                <Col  lg={2} className='home-col'>
                    Third col
                </Col>
            </Row>
        </Container>
        :
        <Container fluid>
            {/* Navbar toggler for mobile */}
            <img 
            src = {toggle}
			alt = "menu"
            className = 'nav-toggle mt-4 ms-2'
            onClick={handleShow}
			/>


            {/* Navbar */}
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton className = 'justify-content-end'/>
                <AppNavbar/>
            </Offcanvas>
        </Container>
        )
}