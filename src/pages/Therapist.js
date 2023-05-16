import { useContext } from "react";
import {Col, Container, Row} from "react-bootstrap";
import {useParams} from "react-router-dom";
import UserContext from "../UserContext";
import AddSlots from "../components/AddSlots";
import AppNavbar from "../components/AppNavbar";
import AppointmentList from "../components/AppointmentList";

export default function Therapist() {

    const { user } = useContext(UserContext);

    return(
        <Container fluid>
            <Row>
                <Col lg={2}><AppNavbar /></Col>
                <Col>
                    <p className={'fg-primary fw-bold display-6'}>welcome, dr. mcstuffins</p>
                    <AppointmentList/>
                    <AddSlots/>

                </Col>
                <Col lg={3}></Col>
            </Row>
        </Container>
    );
}