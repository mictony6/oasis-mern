import {Card, Container, ListGroup,} from 'react-bootstrap';
import ContactItem from "./ContactItem";
import blog_header from '../static/images/blog_thumbnail.png';
import {Link} from "react-router-dom";
import BlogPreviewCard from "./BlogPreviewCard";


export default function RightSidebar() {
    return (
            <Container fluid className={'sticky-top'}>
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