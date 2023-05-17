import {Link, NavLink,} from 'react-router-dom';
import {Navbar, Nav, Row, Col, Button, ListGroup} from 'react-bootstrap';
import logo from '../static/images/logo.png'
import telephone from '../static/images/telephone.svg'
import { useMediaQuery } from 'react-responsive';
import {Modal} from "react-bootstrap";
import {useState} from "react";
import HotlineItem from "./HotlineItem";

export default function AppNavbar() {

	const [hotlinesShow, setHotlinesShow]= useState(false);

	const isDesktopOrLaptop = useMediaQuery({
		query: '(min-width: 1224px)'
	})

	return (
		<Navbar className="m-0 pe-3 d-flex flex-column sticky-top vh-100 overflow-hidden">
			{isDesktopOrLaptop && <Row>
				<Navbar.Brand as={Link} to="/home" className='d-flex flex-column align-items-center justify-content-center'>
					<Row className='title mb-1'>
						<Col className='p-0'>
							<img src={logo}
								alt="oasis logo"
								className="logo"
							/>
						</Col>
						<Col className='p-0'>
							<p className='logo-title'>oasis</p>
						</Col>
					</Row>
					<Row className='tagline'>
						you are safe here
					</Row>
				</Navbar.Brand>
			</Row>}
			<Row className='d-flex flex-column nav'>
					<NavLink to={'/home'} className='nav-links' >Community</NavLink>
					<NavLink to={'/counselling'} className='nav-links'>Look for Support</NavLink>
					<NavLink to={'/blogs'} className='nav-links'>Blog</NavLink>
					<NavLink to={'/about-us'} className='nav-links'>About Us</NavLink>
				{!isDesktopOrLaptop && <Nav.Item className='nav-links'>
					VAWC Hotlines
				</Nav.Item>
				}
			</Row>
			{isDesktopOrLaptop && <Row className='site-helpline'>
				<div className='gradient-box d-flex flex-column'>
					<img
						src={telephone}
						alt="VAW Hotlines"
						className='helpline-pic'
					/>
					<p className='helpline-title'>24/7 Helpline</p>
					<p className='helpline-subtitle'>Always to help you.</p>
					<Button onClick={()=> setHotlinesShow(true)} className='contact-button'>Contact</Button>
					<Modal open={hotlinesShow} onClose={() => setHotlinesShow(false)}>
						<Modal.Header closeButton>
							<h3>VAWC Hotlines</h3>
						</Modal.Header>
						<Modal.Body>
							<ListGroup className={'overflow-scroll  	'} >
								<HotlineItem hotlineProps={
									{
										hotlineName: "Provincial Social Welfare",
										hotlineAddress: "Capital Building",
										hotlineNumber:"(036)266-3426"
									}
								}/>
								<HotlineItem hotlineProps={
									{
										hotlineName: "Women and Children Protection",
										hotlineAddress: "Angel Salazar Memorial Hospital",
										hotlineNumber:"(036)266-3426"
									}
								}/>
								<HotlineItem hotlineProps={
									{
										hotlineName: "Provincial Social Welfare",
										hotlineAddress: "Capital Building",
										hotlineNumber:"(036)266-3426"
									}
								}/>
								<HotlineItem hotlineProps={
									{
										hotlineName: "Women and Children Protection",
										hotlineAddress: "Angel Salazar Memorial Hospital",
										hotlineNumber:"(036)266-3426"
									}
								}/>


							</ListGroup>
						</Modal.Body>
					</Modal>
				</div>
			</Row>}
		</Navbar>
	)
};

