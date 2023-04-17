import {Card, Col, Image, ListGroupItem, Row} from "react-bootstrap";
import placeholder from '../static/images/profile_pic_placeholder.svg';

export default function TheraphistCard(){
    return (
        <ListGroupItem>
        <Row>
            <Col className={'col-4'}>
                <Image src={placeholder}></Image>

            </Col>
            <Col className={'w-100'}>

            </Col>
        </Row>
        </ListGroupItem>
    )
}