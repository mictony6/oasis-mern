import { Container, ListGroup, } from 'react-bootstrap';
import ContactItem from "./ContactItem";


export default function RightSidebar() {
    return (
            <Container fluid className={'sticky-top'}>

                <ListGroup className={'py-3  '}>
                    <ContactItem/>
                    <ContactItem/>
                    <ContactItem/>
                </ListGroup>

            </Container>
    )
}