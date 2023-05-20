import { useContext } from "react";
import {Col, Container, Row} from "react-bootstrap";
import {useParams} from "react-router-dom";
import UserContext from "../UserContext";
import AppNavbar from "../components/AppNavbar";
import AppointmentList from "../components/AppointmentList";

export default function Therapist() {

    const { user } = useContext(UserContext);

    return(
        <Container fluid>
            <Row>
                <Col lg={2}><AppNavbar /></Col>
                <Col className={"me-5 mt-4"}>
                    <p className={'fg-primary fw-bold display-6'}>welcome, dr. mcstuffins</p>
                    <AppointmentList/>

                </Col>
            </Row>
        </Container>
    );
}