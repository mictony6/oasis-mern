import {Link, NavLink, useNavigate} from 'react-router-dom';
import {Navbar, Container, Nav, NavDropdown, Offcanvas, Row, Col} from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import logo from '../static/images/logo.png'
import telephone from '../static/images/telephone.svg'

export default function AppNavbar(){
	return (
	<Navbar className="m-0 px-3 d-flex flex-column flex-grow-1" fixed='left' expand="lg">
	<Row>
		<Navbar.Brand as={Link} to="/home" className='d-flex flex-column align-items-center justify-content-center'>
			<Row className='title mb-1'>
				<Col className='p-0'>
					<img src = {logo}
					alt = "oasis logo"
					className = "logo"
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
	</Row>
	<Row className='d-flex flex-column nav'>
		<Nav.Item className='nav-links'>
			Community
		</Nav.Item>
		<Nav.Item className='nav-links'>
			Look for Support
		</Nav.Item>
		<Nav.Item className='nav-links'>
			Blog
		</Nav.Item >
		<Nav.Item className='nav-links'>
			About Us
		</Nav.Item>
	</Row>
	<Row className='site-helpline'>
		<div className='gradient-box d-flex flex-column'>
			<img 
			src={telephone}
			alt = "VAW Hotlines"
			className='helpline-pic'
			/>
			<p className='helpline-title'>24/7 Helpline</p>
			<p className='helpline-subtitle'>Always to help you.</p>
			<button className='contact-button'>Contact</button>
		</div>
	</Row>
	</Navbar>
	)	
};

