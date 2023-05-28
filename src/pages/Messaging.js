import '../index.css';
import {
    Col,
    Container, Dropdown, Image,
    ListGroup,
    Row
} from 'react-bootstrap';
import AppNavbar from '../components/AppNavbar';
import ContactItem from "../components/ContactItem";
import { useContext, useEffect } from 'react';
import { useState } from 'react';
import MessageBox from '../components/MessageBox';
import { useParams } from 'react-router-dom';
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import DropdownItem from "react-bootstrap/DropdownItem";
import person_add from "../static/images/person/person-add.svg";
import person_remove from "../static/images/person/person-dash.svg";
import x_circle from "../static/images/x-circle.svg";
import { addContact, blockContact, removeContact, unblockContact } from '../functions/contactFunctions';
import UserContext from '../UserContext';


export default function Messaging() {
    const contact_id = useParams()

    const { user } = useContext(UserContext)

    const [contacts, setContacts] = useState([])
    const [activeContact, setActiveContact] = useState("")
    const [status, setStatus] = useState("INACTIVE")
    const [blocked_by, setBlockedBy] = useState(null)

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
                <ContactItem key={contact.contact_id} contactProp= {contact} active = {activeContact.username}/>            
            )
            }))
        })

        fetch(`http://localhost:4000/contact/viewContactDetails/${contact_id.contact_id}`,
        {method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        }
        )
        .then(res => res.json())
        .then(data => {
            if(data.length !== 0) {
                setActiveContact(data[0])
                setStatus(data[0].status)
                setBlockedBy(data[0].blocked_by)
            }
        })
    }, [contacts, contact_id, activeContact])

    function add(e){
        e.preventDefault()
        setStatus(addContact(activeContact.user_id))
    }

    function remove(e){
        e.preventDefault()
        setStatus(removeContact(activeContact.user_id))
    }
    
    function block(e){     
        e.preventDefault()
        setStatus(blockContact(activeContact.user_id))
    }

    function unblock(e){
        e.preventDefault()
        setStatus(unblockContact(activeContact.user_id))
    }

    return (    
        <Container fluid>
            <Row className='d-flex flex-row'>
                <Col lg={2} className=''>
                    <AppNavbar/>
                </Col>
                <Col className='my-4 '>
                    <p className='fg-primary fw-bold display-6'>connect</p>
                    <Row>
                        <Col lg={4}>
                            <h5>active chats</h5>
                            <ListGroup id="chat-list" className={"p-2 bg-light "}>
                                {contacts}
                            </ListGroup>
                        </Col>
                        <Col  className={" px-0 me-4 pb-2 border border-2 rounded-3 bg-light"}>
                            <div className={"border-bottom shadow-sm d-flex align-items-center justify-content-center bg-secondary py-4 fw-bold  "}>
                                <Dropdown>
                                    <DropdownToggle className={"username  "}>
                                        @{activeContact.username}
                                    </DropdownToggle>
                                    <DropdownMenu  >
                                    <DropdownItem onClick={""}  className={"ps-4"}><Image src={person_add} className={"pe-3"}></Image>View Profile</DropdownItem>
                                    <Dropdown.Header>contact</Dropdown.Header>
                                    {status === 'INACTIVE' &&
                                        <DropdownItem onClick={add}  className={"ps-4"}><Image src={person_add} className={"pe-3"}></Image>Add</DropdownItem>}

                                    {status === 'ACTIVE' && <DropdownItem onClick={remove} className={"ps-4"}><Image src={person_remove} className={"pe-3"}></Image>Remove</DropdownItem>}
                                    
                                    {status !== 'BLOCKED' && <DropdownItem onClick={block} className={"ps-4"}><Image src={x_circle} className={"pe-3"}></Image>Block</DropdownItem>}

                                    {(status === 'BLOCKED' && blocked_by === user.id) && <DropdownItem onClick={unblock} className={"ps-4"}><Image src={x_circle} className={"pe-3"}></Image>Unblock</DropdownItem>}
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                            <MessageBox status={status} blocked_by={blocked_by}/>
                        </Col>
                    </Row>
                </Col>

            </Row>
        </Container>
    );
}
