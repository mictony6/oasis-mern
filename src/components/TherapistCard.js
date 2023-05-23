import {Button, Col, Image, ListGroupItem, Modal, ModalBody, ModalHeader, ModalTitle, Row} from "react-bootstrap";
import placeholder from '../static/images/profile_pic_placeholder.svg';
import thumbs_up from '../static/images/thumbs_up.svg';
import fb from '../static/images/facebook.svg';
import twt from '../static/images/twitter.svg';
import lnk from '../static/images/linkedin.svg';
import {useState} from "react";
import BookingForm from "./BookingForm";

export default function TherapistCard({therapistProp}){

    const {therapist_id, prefix, first_name, last_name, suffix, field, description, online, in_person, fb_link, twt_link, li_link} = therapistProp

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <ListGroupItem className={'border-0 bg-light rounded-4 border border-1 my-2'}>
        <Row className={'p-4'}>
            <Col className={'col-3 d-flex flex-column align-items-center justify-content-center'}>
                <Image src={placeholder} className={'p-2 '}></Image>
                <Row>
                    {fb_link && <Col><a href={"https://"+fb_link} target="_blank" rel="noopener noreferrer"><Image src={fb}/></a></Col>}
                    {twt_link && <Col><a href={"https://"+twt_link} target="_blank" rel="noopener noreferrer"><Image src={twt}/></a></Col>}
                    {li_link && <Col><a href={"https://"+li_link} target="_blank" rel="noopener noreferrer"><Image src={lnk}/></a></Col>}
                </Row>

            </Col>
            <Col className={'w-100 '}>
                <h4>{prefix ? prefix : ''} {first_name} {last_name} {suffix ? suffix : ''}</h4>
                <small className={'text-muted'}><p>{field}</p></small>
                <p>{description}</p>
                <Row className={'align-items-center'}>
                    <Col>
                        {online ? 
                        <Row>
                            <Col className={'col-1'}><Image src={thumbs_up}></Image></Col>
                            <Col >Online Consultation</Col>
                        </Row> : ''}
                        {in_person ?
                        <Row>
                            <Col className={'col-1'}><Image src={thumbs_up}></Image></Col>
                            <Col >In-Person Consultation</Col>
                        </Row> : ''}
                    </Col>
                    <Col className={'col-4 d-flex flex-row '}>
                        <Button className={'w-100'} onClick={handleShow}>Book Now</Button>

                        <Modal show={show} onHide={handleClose} centered size='md'>
                            <ModalTitle className="mx-3 mt-4"><h4>Book an appointment</h4></ModalTitle>
                            <ModalBody>
                                <BookingForm bookingProp={
                                    {online: online, 
                                    in_person: in_person,
                                    last_name: last_name,
                                    prefix: prefix ? prefix : '',
                                    suffix: suffix ? suffix : '', 
                                    }}/>
                            </ModalBody>
                        </Modal>
                    </Col>
                </Row>
            </Col>
        </Row>
        </ListGroupItem>
    )
}