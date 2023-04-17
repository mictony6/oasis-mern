import '../index.css';
import AppNavbar from "../components/AppNavbar";
import RightSidebar from "../components/RightSidebar";
import {Col, Container, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import { useParams } from 'react-router-dom'
import {useEffect, useState} from "react";
import PostCards from "../components/PostCards";
import CommentItem from "../components/CommentItem";

export default function PostDetail() {
    const [postID, setPostId] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        //get user
         //set user
        setPostId(id)
    }, [id])
    return (
        <Container fluid>
            <Row className='d-flex flex-row'>
                <Col lg={2} className=''>
                    <AppNavbar />
                </Col>
                <Col>
                    {/* TODO: Replace expand with minimize*/}

                    <PostCards/>

                    {/*Comment section*/}
                    <ListGroup className={'rounded-4 '}>
                        <CommentItem/>
                        <CommentItem/>
                        <CommentItem/>
                    </ListGroup>

                </Col>
                <Col lg={3} className='p-0 m-0'>
                    <RightSidebar />
                </Col>
            </Row>
        </Container>
    );
}