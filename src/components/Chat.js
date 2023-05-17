import {Col, Container, Image, ListGroupItem, Row} from "react-bootstrap";
import placeholder from "../static/images/profile_pic_placeholder.svg";
import ContactItem from "./ContactItem";
import {useState} from "react";
import { useContext } from "react";
import UserContext from "../UserContext";
import { useEffect } from "react";
import dayjs from "dayjs";

export default function Chat({chatProp}){

    const { user } = useContext(UserContext)
    const { content, message_date, sender_id } = chatProp
    
    const isUser = sender_id === user.id

    const relativeTime = require('dayjs/plugin/relativeTime')
    dayjs.extend(relativeTime)

    const time = dayjs(message_date).format(`hh:mm A`)
    const date = dayjs(message_date).format(`DD MMM YYYY`)
    const relative = dayjs(message_date).fromNow()

    // if chat is from current user then set isUser to true
    // idk bout variable name hahu kaw lang set nang
    return(
        <ListGroupItem className={"border-0"}>
            {isUser && <Row className={" d-flex align-items-center   flex-row-reverse justify-content-end "}>
                <Col md={2} className={"text-center"}><Image src={placeholder} className={"img-fluid"}></Image></Col>
                <Col md={8} className={"text-end d-flex flex-column align-items-end justify-content-end"}>
                    <Row className="d-flex">
                        <p className="p-2 border border-1 rounded-5 fit-content m-0"> {content} </p>
                    </Row>
                    <Row className="d-flex">
                        <p small className="text-muted message-date">{time}, {date} ({relative})</p>
                    </Row>
                </Col>
                <Col md={2} className="text-end">
                </Col>

            </Row>}
            {!isUser && <Row className={" d-flex align-items-center   "}>
                <Col md={2} className={"text-center"}><Image src={placeholder} className={"img-fluid"}></Image></Col>
                <Col md={8} className={"text-end d-flex flex-column align-items-start justify-content-end"}>
                    <Row className="d-flex">
                        <p className="p-2 border border-1 rounded-5 fit-content m-0"> {content} </p>
                    </Row>
                    <Row className="d-flex">
                        <p small className="text-muted message-date">{time}, {date} ({relative})</p>
                    </Row>
                </Col>
                <Col lg={2}></Col>
            </Row>}
        </ListGroupItem>
        )
};
