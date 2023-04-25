import '../index.css';
import {
    Col,
    Container,
    ListGroup,
    Row
} from 'react-bootstrap';
import AppNavbar from '../components/AppNavbar';
import ContactItem from "../components/ContactItem";
import { useEffect } from 'react';
import { useState } from 'react';
import MessageBox from '../components/MessageBox';
import { useParams } from 'react-router-dom';


export default function Messaging() {
    const contact_id = useParams()

    const [contacts, setContacts] = useState([])
    // const [activeContact, setActiveContact] = useState(contact_id)

    useEffect(() => {
        fetch(`http://localhost:4000/contact/viewAll`,
        {method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        }
        )
        .then(res => res.json())
        .then(data => {
            setContacts(data.map(contact => {
                return(
                <ContactItem key={contact.contact_id} contactProp= {contact} highlight = {true} active = {contact_id}/>            
            )
            }))
        })
    }, [contacts, contact_id])

    return (    
        <Container fluid>
            <Row className='d-flex flex-row'>
                <Col lg={2} className=''>
                    <AppNavbar/>
                </Col>
                <Col className='my-4'>
                    <p className='fg-primary fw-bold display-6'>connect</p>
                    <Row>
                        {/*list contact here*/}
                        <Col lg={4}>
                            <h5>active now</h5>
                            <ListGroup className={"p-2"}>
                                {contacts}
                            </ListGroup>
                        </Col>
                        {/*active chat box here*/}
                        <Col  className={"pt-4 me-4 pb-2 border rounded-3"}>
                            <MessageBox />
                        </Col>
                    </Row>
                </Col>

            </Row>
        </Container>
    );
}
