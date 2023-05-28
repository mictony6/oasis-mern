import '../index.css';
import {Col, Container, Form, FormLabel, FormSelect, ListGroup, Row, Image, ListGroupItem} from 'react-bootstrap';
import AppNavbar from '../components/AppNavbar';
import TherapistCard from "../components/TherapistCard";
import ConsultationCard from "../components/ConsultationCard";
import { useState } from 'react';
import { useEffect } from 'react';

export default function Counselling() {

    const [therapists, setTherapists] = useState([])
    const [upcomingBookings, setUpcomingBookings] = useState([])
    const [pastBookings, setPastBookings] = useState([])

    useEffect(() => {
        fetch(`http://127.0.0.1:4000/therapist/viewAll`,
        {method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        }
        )
        .then(res => res.json())
        .then(data => {
            setTherapists(data.map(therapist => {
                return(
                <TherapistCard key={therapist.therapist_id} therapistProp= {therapist}/>            
            )
        }))
        })

        fetch(`http://localhost:4000/booking/retrieveConfirmedBookings`,
        {method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        }
        )
        .then(res => res.json())
        .then(data => {
            data.length !== 0 ?
            setUpcomingBookings(data.map(booking => {
                return(
                <ConsultationCard key={booking.booking_id} bookingProp= {booking}/>            
            )
            }))
            :
            setUpcomingBookings(<small><em>You have no upcoming consultations.</em></small>)
        })
        

        fetch(`http://localhost:4000/booking/retrievePastBookings`,
        {method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        }
        )
        .then(res => res.json())
        .then(data => {
            data.length !== 0 ?
            setPastBookings(data.map(booking => {
                return(
                <ConsultationCard key={booking.booking_id} bookingProp= {booking}/>            
            )
            }))
            :
            setPastBookings(<small><em> You have no recent consultations.</em></small>)         

        })
    }, [therapists])

    return (
        <Container fluid>
            <Row className='d-flex flex-row'>
                <Col lg={2} className=''>
                    <AppNavbar/>
                </Col>
                <Col className={'my-4 '}>
                    <p className={'fg-primary fw-bold display-6'}>connect with our therapists</p>
                    <Row className={'w-100 my-4'}>
                        <Col className={'d-flex flex-row align-items-center'}>
                            <FormLabel htmlFor={'sort-type'} className={'col-2'} >sort by</FormLabel>
                            <FormSelect aria-label={'sort-type'}>
                                <option >online consultations</option>
                                <option > other option</option>
                            </FormSelect>
                        </Col>
                        <Col className={'d-flex flex-row align-items-center'}>
                            <FormLabel htmlFor={'sort-type'} className={'col-4'}>available dates</FormLabel>
                            <FormSelect aria-label={'sort-type'}>
                                <option >this week</option>
                                <option >this month</option>
                            </FormSelect>
                        </Col>
            </Row>

                    <ListGroup >
                        {therapists}
                    </ListGroup>
                </Col>
                <Col lg={3} >
                    <Container fluid className={'sticky-top'}>
                        <h5 className={'fg-primary pt-4'}>upcoming consultations</h5>
                        <ListGroup className={'my-2 overflow-auto'}>
                            {upcomingBookings}
                        </ListGroup>
                        <h5 className={'fg-primary pt-4'}>recent consultations</h5>
                        <ListGroup className={'overflow-y'}>
                            {pastBookings}
                        </ListGroup>

                    </Container>
                </Col>
            </Row>
        </Container>
    );
}
