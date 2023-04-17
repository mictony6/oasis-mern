import {Col, Container, ListGroupItem, Row, Image} from "react-bootstrap";
import placeholder from '../static/images/profile1.svg';
import love from '../static/images/love.svg';

export default function CommentItem(){
    return(
        <ListGroupItem className={'bg-secondary border-0 border-bottom'}>
            <Row className={'d-flex flex-row align-items-center'}>
                <Col className={'col-2 d-flex flex-column align-items-center '}>
                    <Image src={placeholder}></Image>
                    <div className={'fw-bold'}>@username</div>
                    <p><small className={'text-muted '}>42 minutes ago</small></p>
                </Col>
                <Col >
                    This is a comment. HAHU. This is a comment. HAHU. This is a comment. HAHU.
                </Col>
                <Col className={'col-2 text-center'}>
                    <Image src={love} className={'img-fluid'}></Image>
                </Col>

            </Row>
        </ListGroupItem>
    );
}