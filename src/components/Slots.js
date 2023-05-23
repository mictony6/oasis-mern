import {Col, Container, Image, ListGroupItem, Row} from "react-bootstrap";
import placeholder from "../static/images/profile_pic_placeholder.svg";
import ContactItem from "./ContactItem";
import {useState} from "react";
import { useContext } from "react";
import UserContext from "../UserContext";
import { useEffect } from "react";
import dayjs from "dayjs";

export default function Slot({slotProp}){

    const { user } = useContext(UserContext)
    const { booking_id, therapist_id, availability, confirmation, date, time} = slotProp

    let [humanizedDate, setHumanizedDate] = useState('')
    let [humanizedTime, setHumanizedTime] = useState('')

    useEffect(() => {
        setHumanizedDate(dayjs(new Date(date)).format('MMMM DD, YYYY'))
        setHumanizedTime(dayjs(time, 'HH:mm:ss').format('hh:mm A'))

    }, [date, time])


    return(
        <ListGroupItem className={"border-0 my-1"}>
        <Container>
            <Row>
            Date: {humanizedDate}
            </Row>
            <Row>
            Time: {humanizedTime}
            </Row>
            <Row>
            Available: {availability ? 'Yes' : 'No'}
            </Row>
        </Container>
        </ListGroupItem>
        )
};
