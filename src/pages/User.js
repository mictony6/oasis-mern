import {
    Col,
    Container,
    Row,
    Image,
    Tabs,
    Tab
} from 'react-bootstrap';
import {useParams} from "react-router-dom";
import AppNavbar from '../components/AppNavbar';
import placeholder from '../static/images/profile_pic_placeholder.svg';
import UserOverview from "../components/user/UserOverview";


export default function User() {

    const { user_id } = useParams();

    return(
        <Container fluid>
            <Row className='d-flex flex-row'>
                <Col lg={2} className=''>
                    <AppNavbar/>
                </Col>
                <Col className={'my-4 '}>
                    <Row className={'w-100 my-4 rounded-4 bg-light'}>
                        <Tabs >
                            <Tab eventKey={"overview"} title={"Overview"}  >
                                <UserOverview/>
                            </Tab>
                            <Tab title={"Posts"} eventKey={"comments"}></Tab>
                            <Tab title={"Comments"} eventKey={"comments"}></Tab>
                            <Tab title={"Contacts"} eventKey={"contacts"}></Tab>
                            <Tab title={"Likes"} eventKey={"likes"}></Tab>
                        </Tabs>
                    </Row>
                </Col>
                <Col lg={3} >
                    <Container fluid className={'sticky-top'}>
                        <h5 className={'fg-primary pt-4'}>@username</h5>
                        <Image src={placeholder}></Image>
                        <h6>Bio</h6>

                    </Container>
                </Col>
            </Row>
        </Container>
    );
}