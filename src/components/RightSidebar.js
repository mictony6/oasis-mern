import { Container, ListGroup,} from 'react-bootstrap';
import ContactItem from "./ContactItem";
import BlogPreviewCard from "./BlogPreviewCard";


export default function RightSidebar() {
    return (
            <Container fluid className={'sticky-top scrollable'}>
                <ListGroup className={'my-4 '}>
                    <h5>contacts</h5>
                    <ContactItem/>
                    <ContactItem/>
                    <ContactItem/>
                </ListGroup>
                <ListGroup  >
                    <BlogPreviewCard/>
                </ListGroup>

            </Container>
    )
}