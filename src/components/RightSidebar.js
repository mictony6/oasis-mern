import {  Container,  ListGroup, Spinner, } from 'react-bootstrap';
import ContactItem from "./ContactItem";
import BlogPreviewCard from "./BlogPreviewCard";
import { useEffect } from 'react';
import { useState } from 'react';
import Notifications from './Notifications';


export default function RightSidebar() {

    const [contacts, setContacts] = useState([])

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
                <ContactItem key={contact.contact_id} contactProp= {contact} highlight={false} pageView={false}/>
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



                    <div className={" fw-bold h6"}><i className="bi bi-person-fill pe-2"></i>contacts</div>

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
                <div className="my-4 w-100 border border-1 border-bottom"></div>
                
                <ListGroup  >
                    <BlogPreviewCard/>
                </ListGroup>

            </Container>
    )
}