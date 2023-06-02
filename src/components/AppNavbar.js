import {Link, NavLink,} from 'react-router-dom';
import {Navbar, Nav, Row, Col, Button, ListGroup, Modal, Container, Image} from 'react-bootstrap';
import logo from '../static/images/logo.png'
import telephone from '../static/images/telephone.svg'
import { useMediaQuery } from 'react-responsive';
import {useState} from "react";
import HotlineItem from "./HotlineItem";
import { useContext } from 'react';
import UserContext from '../UserContext';
import {useTranslation} from "react-i18next";

export default function AppNavbar() {
	const { user } = useContext(UserContext)

	const [hotlinesShow, setHotlinesShow]= useState(false);

	const isDesktopOrLaptop = useMediaQuery({
		query: '(min-width: 1224px)'
	})

	const {t, i18n} = useTranslation()

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
			{/*<Row className='d-flex flex-column nav bg-light rounded-4 border border-1 p-2'>*/}
			{/*		<NavLink to={'/home'} className='nav-links' >{t('nav.community')}</NavLink>*/}
			{/*		{user.role === 'User' && <NavLink to={'/counselling'} className='nav-links'>{t('nav.counselling')}</NavLink>}*/}
			{/*		{user.role === 'Therapist' && <NavLink to={'/therapist'} className='nav-links'>{t('nav.appointments')}</NavLink>}*/}
			{/*		/!*<NavLink to={'/blogs'} className='nav-links'>Blog</NavLink>*!/*/}
			{/*		<NavLink to={'/about'} className='nav-links'>{t('nav.about')}</NavLink>*/}
			{/*	{!isDesktopOrLaptop && <Nav.Item className='nav-links '>*/}
			{/*		VAWC Hotlines*/}
			{/*	</Nav.Item>*/}
			{/*	}*/}
			{/*</Row>*/}

			<Nav className={"d-flex flex-column bg-light p-2 rounded-4 "}>
				<NavLink to={'/home'} className='nav-links' >{t('nav.community')}</NavLink>
				{user.role === 'User' && <NavLink to={'/counselling'} className='nav-links'>{t('nav.counselling')}</NavLink>}
				{user.role === 'Therapist' && <NavLink to={'/therapist'} className='nav-links'>{t('nav.appointments')}</NavLink>}
				{/*<NavLink to={'/blogs'} className='nav-links'>Blog</NavLink>*/}
				<NavLink to={'/about'} className='nav-links'>{t('nav.about')}</NavLink>
				{!isDesktopOrLaptop && <Nav.Item className='nav-links '>
					VAWC Hotlines
				</Nav.Item>
				}
			</Nav>
			<div className='mt-2'></div>
			<Col className={"d-flex flex-column bg-light rounded-4 p-4 align-items-center gradient "}>
				<Image src={telephone} className={"img-fluid ms-5"}></Image>
				<h6 className={"fw-bold "}>{t('helpline.title')}</h6>
				<p><small>{t('helpline.text')}</small></p>
				<Button onClick={()=> setHotlinesShow(true)} className='contact-button'>{t('helpline.button')}</Button>
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

