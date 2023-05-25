import {Button, ButtonGroup, Col, Container, Image, ListGroupItem, Row} from "react-bootstrap";
import placeholder from "../static/images/profile_pic_placeholder.svg";
import ContactItem from "./ContactItem";
import {useState} from "react";
import { useContext } from "react";
import UserContext from "../UserContext";
import { useEffect } from "react";
import dayjs from "dayjs";
import Swal from "sweetalert2";

export default function Booking({bookingProp}){


    const { user } = useContext(UserContext)
    const { username, availability, booking_id, user_id, date, time} = bookingProp

    const [confirmation, setConfirmation] = useState(false)
    const [denied, setDenied] = useState(false)


    let [humanizedDate, setHumanizedDate] = useState('')
    let [humanizedTime, setHumanizedTime] = useState('')

    useEffect(() => {
        setHumanizedDate(dayjs(new Date(date)).format('MMMM DD'))
        setHumanizedTime(dayjs(time, 'HH:mm:ss').format('hh:mm A'))

        fetch(`http://localhost:4000/booking/getDetails/${booking_id}`,
        {method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        })
        .then(res => res.json())
        .then(data => {
            data[0].confirmation ? setConfirmation(true) : setConfirmation(false)
            data[0].denied ? setDenied(true) : setDenied(false)
        })

    }, [booking_id, date, time])

    function confirm(e){
        e.preventDefault()

        fetch(`http://localhost:4000/booking/confirmBooking/${booking_id}`, {
            method : 'PATCH',
            headers : {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
            }).then(res => res.json())
            .then(data => {
                data ? 
                Swal.fire({
                    title: "Appointment confirmed!",
                    icon: "success",
                    text: "You can now reach out to each other.",
                    iconColor: '#3A3530',
                    color: '#3A3530',
                    confirmButtonText: "OK",
                    buttonsStyling: false,
                    customClass: {
                        confirmButton: 'button2'
                    }
                }).then(setConfirmation(true))
                :
                Swal.fire({
                    title: "Oh No!",
                    icon: "error",
                    text: "Something went wrong :( Please try again!",
                    iconColor: '#3A3530',
                    color: '#3A3530',
                    confirmButtonText: "OK",
                    buttonsStyling: false,
                    customClass: {
                        confirmButton: 'button2'
                    }
                })
        })
    }

    function deny(e){
        e.preventDefault()

        fetch(`http://localhost:4000/booking/denyBooking/${booking_id}`, {
            method : 'PATCH',
            headers : {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
            }).then(res => res.json())
            .then(data => {
                data ? 
                Swal.fire({
                    title: "Appointment denied.",
                    icon: "success",
                    text: "We understand that you have your reasons for declining.",
                    iconColor: '#3A3530',
                    color: '#3A3530',
                    confirmButtonText: "OK",
                    buttonsStyling: false,
                    customClass: {
                        confirmButton: 'button2'
                    }
                }).then(setDenied(true))
                :
                Swal.fire({
                    title: "Oh No!",
                    icon: "error",
                    text: "Something went wrong :( Please try again!",
                    iconColor: '#3A3530',
                    color: '#3A3530',
                    confirmButtonText: "OK",
                    buttonsStyling: false,
                    customClass: {
                        confirmButton: 'button2'
                    }
                })
        })
    }


    return(
        <ListGroupItem className={"border-0 my-1"}>
        <Container>
            {!availability ? 
            <Row>
                <Col sm={6} className="d-flex align-items-center">
                    <Col sm={2} className="d-flex align-items-center">
                        <Image src={placeholder}></Image>
                    </Col>
                    <Col className="px-4">
                        <Row>
                            <small className="text-muted"><em>username</em></small>
                        </Row>
                        <Row>
                            <h4>{username}</h4>
                        </Row>
                    </Col>
                </Col>
                <Col sm={2} className="d-flex align-items-center">
                    <small className="text-muted"> {humanizedDate} ({humanizedTime}) </small> 
                </Col>
                <Col sm={4} className="d-flex align-items-center justify-content-end" >
                    {confirmation ? 
                        <small className="text-muted"><em>confirmed</em></small>
                        :
                        null
                    }
                    {denied ? <small className="text-muted"><em>denied</em></small> : null}
                    {!confirmation && !denied ?
                        <ButtonGroup>
                            <Button className="deny-button" onClick={deny}>Deny</Button>
                            <Button onClick={confirm}>Confirm</Button>
                        </ButtonGroup>
                        :
                        null
                    }
                </Col>
            </Row>
            :
            <Row>
                <Col sm={6} className="d-flex align-items-center">
                    <small className="text-muted">There are no bookings for this slot.</small>
                </Col>
                <Col sm={2} className="d-flex align-items-center">
                    <small className="text-muted"> {humanizedDate} ({humanizedTime}) </small>                 </Col>
                <Col sm={4} className="d-flex align-items-center justify-content-end">
                </Col>
            </Row>
            }
        </Container>
        </ListGroupItem>
        )
};
