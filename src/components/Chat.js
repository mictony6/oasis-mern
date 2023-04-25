import {Col, Container, Image, ListGroupItem, Row} from "react-bootstrap";
import placeholder from "../static/images/profile_pic_placeholder.svg";
import ContactItem from "./ContactItem";
import {useState} from "react";
import { useContext } from "react";
import UserContext from "../UserContext";
import { useEffect } from "react";

export default function Chat({chatProp}){

    const { user } = useContext(UserContext)
    // console.log(user) 
    // const [isUser, setIsUser] = useState(true)
    const { content, message_date, sender_id } = chatProp
    
    const isUser = sender_id === user.id

    // if chat is from current user then set isUser to true
    // idk bout variable name hahu kaw lang set nang
    return(
        <ListGroupItem className={"border-0"}>
            {isUser && <Row className={" d-flex align-items-center   flex-row-reverse justify-content-end "}>
                <Col lg={2} className={"text-center"}><Image src={placeholder} className={"img-fluid"}></Image></Col>
                <Col lg={8} className={"text-end d-flex align-items-center justify-content-end"}>
                    <p className=" p-2 border border-1 rounded-5 fit-content"> {content} </p>
                </Col>
                <Col lg={2}></Col>

            </Row>}
            {!isUser && <Row className={" d-flex align-items-center   "}>
                <Col lg={2} className={"text-center"}><Image src={placeholder} className={"img-fluid"}></Image></Col>
                <Col lg={8} className={"text-start d-flex align-items-center justify-content-start"}>
                    <p className=" p-2 border border-1 rounded-5 fit-content"> {content} </p>
                </Col>
                <Col lg={2}></Col>
            </Row>}
        </ListGroupItem>
        )
};
