import { Container, ListGroup,} from 'react-bootstrap';
import ContactItem from "./ContactItem";
import BlogPreviewCard from "./BlogPreviewCard";
import { useEffect } from 'react';
import { useState } from 'react';


export default function RightSidebar() {

    const [contacts, setContacts] = useState([])
    
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
                <ContactItem key={contact.contact_id} contactProp= {contact} highlight={false}/>            
            )
        }))
    })
    }, [contacts])

    return (
            <Container fluid className='sticky-top scrollable'>
                <h5 className='mt-5'>contacts</h5>
                <ListGroup className='my-4 contacts'>
                    {contacts}
                </ListGroup>
                <ListGroup  >
                    <BlogPreviewCard/>
                </ListGroup>

            </Container>
    )
}