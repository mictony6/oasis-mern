import { Collapse, Container,  ListGroup, Spinner, } from 'react-bootstrap';
import ContactItem from "./ContactItem";
import BlogPreviewCard from "./BlogPreviewCard";
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Notifications from './Notifications';


export default function RightSidebar() {

    const [contacts, setContacts] = useState([])
    const [showContacts, setShowContacts] = useState(false)

    const [isLoading, setIsLoading] = useState(true)
    
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
            setIsLoading(false)
            setContacts(data.map(contact => {
                return(
                contact.status === 'ACTIVE' ? 
                <ContactItem key={contact.contact_id} contactProp= {contact} highlight={false}/>
                :
                null       
            )
        }))
        })
    }, [contacts])

    return (
            <Container fluid className='sticky-top vh-100 overflow-auto'>
                <div className="mt-4"></div>
                <Notifications/>
                <Link
                    to={''}
                    onClick={() => {setShowContacts(!showContacts)}}
                    aria-controls="contact-list"
                    aria-expanded={showContacts}
                >
                <h6 >contacts {showContacts ? <i className="bi bi-caret-up-fill"></i> : <i className="bi bi-caret-right-fill"></i>}</h6>
                </Link>

                <Collapse in={showContacts} >
                    <div id="contact-list">
                    {isLoading ?
                    <div className={"flex-grow-1 w-100 text-center mt-3 mb-0"}>
                        <Spinner/>
                    </div>
                    :
                    <ListGroup className='d-flex flex-column contacts overflow-auto' >
                        {contacts}
                    </ListGroup>}
                    </div>
                </Collapse>
                <div className="mt-4"></div>
                
                <ListGroup  >
                    <BlogPreviewCard/>
                </ListGroup>

            </Container>
    )
}