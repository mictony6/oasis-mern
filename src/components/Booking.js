import {Col, Container, Image, ListGroupItem, Row} from "react-bootstrap";
import placeholder from "../static/images/profile_pic_placeholder.svg";
import ContactItem from "./ContactItem";
import {useState} from "react";
import { useContext } from "react";
import UserContext from "../UserContext";
import { useEffect } from "react";
import dayjs from "dayjs";

export default function Booking({bookingProp}){

    const { user } = useContext(UserContext)
    const { therapist_id, availability, confirmation, date, time} = bookingProp

    let [humanizedDate, setHumanizedDate] = useState('')
    let [humanizedTime, setHumanizedTime] = useState('')

    useEffect(() => {
        setHumanizedDate(dayjs(new Date(date)).format('MMMM DD'))
        setHumanizedTime(dayjs(time, 'HH:mm:ss').format('hh:mm A'))

    }, [date, time])



    return(
        <ListGroupItem className={"border-0 my-1"}>
        <Container>
            <Row >
                <Col sm={6}>
                <Image src={placeholder}></Image>
                </Col>
                <Col sm={2}>
                    
                </Col>
                <Col sm={4}>
                    <Row>
                        {humanizedDate} 
                    </Row>
                    <Row>
                        {humanizedTime}
                    </Row>
                </Col>
            </Row>
        </Container>
        </ListGroupItem>
        )
};
