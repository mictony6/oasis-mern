import '../index.css';
import {
    Col,
    Container,
    ListGroup,
    Row,
    Button, Image
} from 'react-bootstrap';
import AppNavbar from '../components/AppNavbar';
import ContactItem from "../components/ContactItem";
import placeholder from "../static/images/profile_pic_placeholder.svg";
import Chat from "../components/Chat";
import TextareaAutosize from "react-textarea-autosize";
import send from "../static/images/send.svg";


export default function Messaging() {
    return (
        <Container fluid>
            <Row className='d-flex flex-row'>
                <Col lg={2} className=''>
                    <AppNavbar/>
                </Col>
                <Col className={'my-4 '}>
                    <p className={'fg-primary fw-bold display-6'}>connect with our therapists</p>
                    <Row>
                        {/*list contact here*/}
                        <Col container lg={4}>
                            <h5>active now</h5>
                            <ListGroup className={"p-2"}>
                                {/*pass prop to remove call icon*/}
                                <ContactItem/>
                                <ContactItem/>
                                <ContactItem/>
                            </ListGroup>
                        </Col>
                        {/*active chat box here*/}
                        <Col  className={"pt-4 me-4 pb-2 border rounded-3"}>
                            <Container className={"chat-box d-flex flex-column"}>
                                <ListGroup className={"py-5"}>
                                    <Chat/>
                                    <Chat/>
                                    <Chat/>
                                    <Chat/>
                                    <Chat/>
                                    <Chat/>
                                </ListGroup>

                            </Container>
                            <Container fluid className={" d-flex flex-row flex-nowrap align-items-center justify-content-between"}>

                                <TextareaAutosize className={"w-100 rounded-3 border-1 p-2  "}></TextareaAutosize>
                                <Button className={"ms-2 rounded-5 text-center "}><Image src={send} className={"img-fluid "}></Image></Button>
                            </Container>

                        </Col>
                    </Row>

                </Col>

            </Row>
        </Container>
    );
}
