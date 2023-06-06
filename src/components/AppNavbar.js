import {Link, NavLink,} from 'react-router-dom';
import {Navbar, Nav, Row, Col, Button, ListGroup, Modal, Container, Image} from 'react-bootstrap';
import logo from '../static/images/logo.png'
import telephone from '../static/images/telephone.svg'
import { useMediaQuery } from 'react-responsive';
import {useState} from "react";
import HotlineItem from "./HotlineItem";
import { useContext } from 'react';
import UserContext from '../UserContext';

export default function AppNavbar() {
	const { user } = useContext(UserContext)

	const [hotlinesShow, setHotlinesShow]= useState(false);

	const isDesktopOrLaptop = useMediaQuery({
		query: '(min-width: 1224px)'
	})

	return (
		<Navbar className="m-0 d-flex flex-column sticky-top vh-100 overflow-auto   ">
			{isDesktopOrLaptop && <Row>
				<Navbar.Brand as={Link} to="/home" className='d-flex flex-column align-items-center justify-content-center  text-decoration-none'>
					<Row className='title '>
						<Col className='p-0'>
							<img src={logo}
								alt="oasis logo"
								className="logo"
							/>
						</Col>
						<Col className='p-0'>
							<p className='logo-title '>oasis</p>
						</Col>
					</Row>
					<div className='mb-1'></div>
					<Row className='tagline '>
						you are safe here
					</Row>
				</Navbar.Brand>
			</Row>}
			<Nav className={"d-flex flex-column bg-light p-2 rounded-4 "}>
				<NavLink to={'/home'} className='nav-links' >Community</NavLink>
				{user.role === 'User' && <NavLink to={'/counselling'} className='nav-links'>Look for Support</NavLink>}
				{user.role === 'Therapist' && <NavLink to={'/therapist'} className='nav-links'>Appointments</NavLink>}
				{user.role === 'Admin' && <NavLink to={'/admin'} className='nav-links'>Admin</NavLink>}
				{/*<NavLink to={'/blogs'} className='nav-links'>Blog</NavLink>*/}
				<NavLink to={'/about'} className='nav-links'>About Us</NavLink>
				{!isDesktopOrLaptop && <Nav.Item className='nav-links '>
					VAWC Hotlines
				</Nav.Item>
				}
			</Nav>
			<div className='mt-2'></div>
			<Col className={"d-flex flex-column bg-light rounded-4 p-4 align-items-center gradient "}>
				<Image src={telephone} className={"img-fluid ms-5"}></Image>
				<h6 className={"fw-bold "}>24/7 Helpline</h6>
				<p><small>Always to help you.</small></p>
				<Button onClick={()=> setHotlinesShow(true)} className='contact-button'>Hotlines</Button>
				<Modal show={hotlinesShow} onHide={() => setHotlinesShow(false)}>
					<Modal.Header closeButton>
						<h3>VAWC Hotlines</h3>
					</Modal.Header>
					<Modal.Body>
						<ListGroup className={'overflow-auto  	'} >
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
			</Col>
			
			
			

		</Navbar>
	)
};

