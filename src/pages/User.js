import {Col, Container, Form, FormLabel, FormSelect, ListGroup, Row, Image, ListGroupItem} from 'react-bootstrap';
import {useParams} from "react-router-dom";
import '../index.css';
import AppNavbar from '../components/AppNavbar';
import ConsultationCard from "../components/ConsultationCard";
import { useState } from 'react';
import { useEffect } from 'react';


export default function User() {

    const { user_id } = useParams();

    return(
        <Container fluid>
            <Row className='d-flex flex-row'>
                <Col lg={2} className=''>
                    <AppNavbar/>
                </Col>
                <Col className={'my-4 '}>
                    <Row className={'w-100 my-4'}>
                        <Col className={'d-flex flex-row align-items-center'}>

                        </Col>
                        <Col className={'d-flex flex-row align-items-center'}>

                        </Col>
            </Row>
                </Col>
                <Col lg={3} >
                    <Container fluid className={'sticky-top'}>
                        <h5 className={'fg-primary pt-4'}>Other contacts</h5>
                        <ListGroup className={'my-2 overflow-auto'}>
                            <ConsultationCard/>
                            <ConsultationCard/>
                            <ConsultationCard/>
                        </ListGroup>

                    </Container>
                </Col>
            </Row>
        </Container>
    );
}