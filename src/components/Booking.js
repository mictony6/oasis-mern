import {Button, ButtonGroup, Col, Container, Dropdown, Image, ListGroupItem, Row} from "react-bootstrap";
import placeholder from "../static/images/profile1.svg";
import ContactItem from "./ContactItem";
import {useState} from "react";
import { useContext } from "react";
import UserContext from "../UserContext";
import { useEffect } from "react";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import DropdownItem from "react-bootstrap/DropdownItem";
import person_add from "../static/images/person/person-add.svg";
import person_remove from "../static/images/person/person-dash.svg";
import x_circle from "../static/images/x-circle.svg";
import {Link} from "react-router-dom";

export default function Booking({bookingProp}){


    const { user } = useContext(UserContext)
    const { username, availability, booking_id, user_id, date, time} = bookingProp

    const [confirmation, setConfirmation] = useState(false)
    const [contactId, setContactId] = useState(null)
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
            if(data[0].confirmation){
                setContactId(data[0].contact_id)
                setConfirmation(true)
            } else {
                setConfirmation(false)
            }
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
            },
            body: JSON.stringify({
                contact_person_id: user_id
            })
            }).then(res => res.json())
            .then(data => {
                if(data) {
                setContactId(data.contact_id)
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
                } else {
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
                })}
        })
    }

    function deny(e){
        e.preventDefault()

        fetch(`http://localhost:4000/booking/denyBooking/${booking_id}`, {
            method : 'PATCH',
            headers : {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                contact_person_id: user_id
            })
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
                    <Col sm={1} className="d-flex align-items-center">

                        <Image src={placeholder} className={"img-fluid slot-img"}></Image>
                    </Col>
                    <Col className="px-4">

                        <Row>
                            <Dropdown>
                                <DropdownToggle className={"border-start border-2 rounded-0 username"}>{username}</DropdownToggle>
                                <DropdownMenu  >
                                    <DropdownItem as={Link} to={`/user/${user_id}`} className={"ps-4"}><i
                                        className="bi bi-person-fill pe-3"></i>View Profile</DropdownItem>
                                    <DropdownItem className={"ps-4"} onClick={()=>{}}><i className={"bi bi-person-add pe-3"}></i>Add</DropdownItem>
                                    <DropdownItem onClick={()=>{}} className={"ps-4"}><i className="bi bi-x-circle pe-3"></i>Block</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </Row>
                    </Col>
                </Col>
                <Col sm={2} className="d-flex align-items-center">
                    <small className="text-muted"> {humanizedDate} ({humanizedTime}) </small>
                </Col>
                <Col sm={2} className="d-flex align-items-center justify-content-start" >
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
                {!denied &&
                <Col sm={2} className={"d-flex align-items-center justify-content-end"}>
                    <Link as={"button"} to={"/chats/"+contactId} className={"btn ms-3 border"}><i className={"bi bi-chat-dots-fill text-white"}></i></Link>
                </Col>}
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
