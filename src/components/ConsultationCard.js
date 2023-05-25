import {Col, Image, ListGroupItem, Row} from "react-bootstrap";
import placeholder from "../static/images/profile_pic_placeholder.svg";
import dayjs from "dayjs";

export default function ConsultationCard({bookingProp}){

    const { prefix, last_name, suffix, date, time, confirmation, denied, consultation_type } = bookingProp

    const humanizedDate = dayjs(date, 'YYYY-MM-DD').format('MMMM DD, YYYY (dddd)')
    const humanizedTime = dayjs(time, 'HH:mm:ss').format('hh:mm A')


    return(
        <ListGroupItem className={' p-4'} >
            <Row >
                <Col className={'col-4 d-flex flex-row align-items-center justify-content-center'}>
                    <Image src={placeholder}></Image>
                </Col>
                <Col className={' '}>
                    <div className={'fw-bold'}>{prefix ? prefix : null} {last_name}</div>
                    <div >{humanizedDate}</div>
                    <small className={'fg-light'}><div>{humanizedTime}</div></small>
                    <br/>
                    <small className={'text-muted'}><div >{consultation_type === 'online' ? 'Online Consultation' : 'In-person Consultation'}</div></small>
                </Col>
            </Row>
        </ListGroupItem>
    );
}