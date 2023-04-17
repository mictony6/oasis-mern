import {Col, Image, ListGroupItem, Row} from "react-bootstrap";
import placeholder from "../static/images/profile_pic_placeholder.svg";

export default function ConsultationCard(){
    return(
        <ListGroupItem className={' p-4'} >
            <Row >
                <Col className={'col-4 d-flex flex-row align-items-center justify-content-center'}>
                    <Image src={placeholder}></Image>
                </Col>
                <Col className={' '}>
                    <div className={'fw-bold'}>Dr. McStuffins</div>
                    <div >January 19, 2023</div>
                    <small className={'fg-light'}><div>10:00 am</div></small>
                    <br/>
                    <small className={'text-muted'}><div >Online Consultation</div></small>
                </Col>
            </Row>
        </ListGroupItem>
    );
}