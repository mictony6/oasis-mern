import '../index.css';
import {
    Col,
    Container, Dropdown, Image,
    ListGroup,
    Row
} from 'react-bootstrap';
import AppNavbar from '../components/AppNavbar';
import ContactItem from "../components/ContactItem";
import { useEffect } from 'react';
import { useState } from 'react';
import MessageBox from '../components/MessageBox';
import { useParams } from 'react-router-dom';
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import DropdownItem from "react-bootstrap/DropdownItem";
import add from "../static/images/person/person-add.svg";
import remove from "../static/images/person/person-dash.svg";
import x_circle from "../static/images/x-circle.svg";


export default function Messaging() {
    const contact_id = useParams()
    const username = "username";

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
                        <Col lg={4}>
                            <h5>active now</h5>
                            <ListGroup className={"p-2"}>
                                {contacts}
                            </ListGroup>
                        </Col>
                        <Col  className={" px-0 me-4 pb-2 border border-2 rounded-3"}>
                            <p className={"border-bottom border-1 d-flex align-items-center justify-content-center bg-secondary py-4 fw-bold  "}>

                                <Dropdown>

                                    <DropdownToggle className={"username  "}>
                                        @{username}

                                    </DropdownToggle>
                                    <DropdownMenu  >
                                        <DropdownItem href="/addContact/:contact_person_id"  className={"ps-4"}><Image src={add} className={"pe-3"}></Image>Add</DropdownItem>
                                        <DropdownItem href="#/action-2" className={"ps-4"}><Image src={remove} className={"pe-3"}></Image>Remove</DropdownItem>
                                        <DropdownItem href="#/action-2" className={"ps-4"}><Image src={x_circle} className={"pe-3"}></Image>Block</DropdownItem>

                                    </DropdownMenu>

                                </Dropdown>
                            </p>

                            <MessageBox />

                        </Col>
                    </Row>
                </Col>

            </Row>
        </Container>
    );
}
