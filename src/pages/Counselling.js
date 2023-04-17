import '../index.css';
import {Col, Container, Form, FormLabel, FormSelect, ListGroup, ListGroupItem, Row} from 'react-bootstrap';
import AppNavbar from '../components/AppNavbar';
import TheraphistCard from "../components/TheraphistCard";

export default function Counselling() {
    return (
        <Container fluid>
            <Row className='d-flex flex-row'>
                <Col lg={2} className=''>
                    <AppNavbar/>
                </Col>
                <Col>
                    <h3>connect with our therapists</h3>
                    <Row className={'w-100 my-4'}>
                        <Col className={'d-flex flex-row align-items-center'}>
                            <FormLabel htmlFor={'sort-type'} className={'col-2'} >sort by</FormLabel>
                            <FormSelect aria-label={'sort-type'}>
                                <option >online consultations</option>
                                <option selected={true}> other option</option>
                            </FormSelect>
                        </Col>
                        <Col className={'d-flex flex-row align-items-center'}>
                            <FormLabel htmlFor={'sort-type'} className={'col-4'}>available dates</FormLabel>
                            <FormSelect aria-label={'sort-type'}>
                                <option >this week</option>
                                <option selected={true}>this month</option>
                            </FormSelect>
                        </Col>


                   </Row>

                    <ListGroup>
                        <TheraphistCard/>
                    </ListGroup>
                </Col>
                <Col lg={2}>Third col.</Col>
            </Row>
        </Container>
    );
}
