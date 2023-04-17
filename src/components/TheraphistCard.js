import {Button, Card, Col, Image, ListGroupItem, Row} from "react-bootstrap";
import placeholder from '../static/images/profile_pic_placeholder.svg';
import thumbs_up from '../static/images/thumbs_up.svg';
import fb from '../static/images/facebook.svg';
import twt from '../static/images/twitter.svg';
import lnk from '../static/images/linkedin.svg';

export default function TheraphistCard(){
    return (
        <ListGroupItem className={'border-0 bg-secondary rounded-4 my-2'}>
        <Row className={'p-4'}>
            <Col className={'col-3 d-flex flex-column align-items-center justify-content-center'}>
                <Image src={placeholder} className={'p-2 '}></Image>
                <Row>
                    <Col><Image src={fb}></Image></Col>
                    <Col><Image src={twt}></Image></Col>
                    <Col><Image src={lnk}></Image></Col>
                </Row>

            </Col>
            <Col className={'w-100 '}>
                <h4>Dr. McStuffins</h4>
                <small className={'text-muted'}><p>Area of Specialty</p></small>
                <p>is a distinguished professor of health sciences and of counseling psychology and associate dean at the Bouvé College of Health Sciences at Northeastern University and director of the Institute on Urban Health Research. Dr. Amaro's research has focused on alcohol and drug use and addiction among adolescents and adults;</p>
                <Row className={'align-items-center'}>
                    <Col>
                        <Row>
                            <Col className={'col-1'}><Image src={thumbs_up}></Image></Col>
                            <Col >Online Consultation</Col>
                        </Row>
                        <Row>
                            <Col className={'col-1'}><Image src={thumbs_up}></Image></Col>
                            <Col >In-Person Consultation</Col>
                        </Row>
                    </Col>
                    <Col className={'col-4 d-flex flex-row '}>
                        <Button className={'w-100'}>Book Now</Button>
                    </Col>
                </Row>
            </Col>
        </Row>
        </ListGroupItem>
    )
}