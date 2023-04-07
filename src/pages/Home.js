
import '../index.css';
import { Row, Col, Container, Card } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive'
import AppNavbar from '../components/AppNavbar';

export default function Home() {
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })


    return (
        isDesktopOrLaptop ?
        <Container fluid>
            <Row className='d-flex flex-row'>
                <Col lg={2} className='nav-col'>
                    <AppNavbar/>
                </Col>
                <Col lg={7} className='home-col'>
                    Mid col
                </Col>
                <Col  lg={3} className='home-col'>
                    Third col
                </Col>
            </Row>
        </Container>
        :
        <Container fluid>
            
        </Container>
        )
}