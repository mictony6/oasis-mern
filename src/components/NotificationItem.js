import { ListGroupItem, Image, Button, Dropdown, Row } from "react-bootstrap";
import placeholder from "../static/images/profile_pic_placeholder.svg";
import { Link } from "react-router-dom";
import { confirmContact } from "../functions/contactFunctions";
import { declineContact } from "../functions/contactFunctions";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import UserContext from "../UserContext";

const NotificationItem = ({notificationProp}) => {
    const { user } = useContext(UserContext)

    const { user_id, triggered_by, notification_id, user_username, triggered_by_username, type, created, marked_read, post_id, comment_id, contact_id } = notificationProp

    const [status, setStatus] = useState("PENDING")
    const [new_type, setNewType] = useState(type)

    const texts = [
        {
            type: 'like',
            text: `@${triggered_by_username} liked your post!`
        },
        {
            type: 'comment',
            text: `@${triggered_by_username} commented on your post.`
        },
        {
            type: 'contact_request',
            text: `@${triggered_by_username} has requested to add you as a contact`
        },
        {
            type: 'contact_confirmed_user',
            text: `@${triggered_by_username} has requested to add you as a contact.`
        },
        {
            type: 'contact_confirmed_triggered_by',
            text: `@${user_username} has accepted your contact request.`
        },
        {
            type: 'booking',
            text: `@${triggered_by_username} has booked a session with you.`
        },
        {
            type: 'confirmation',
            text: `@${triggered_by_username} has requested to add you as a contact`
        },
        {
            type: 'slots',
            text: `@${triggered_by_username} has requested to add you as a contact`
        },
    ]

    function notificationText(notifType){
        const notif = texts.find(text => text.type === notifType)
        return notif.text
    }

    function confirm(e){
        e.preventDefault()
        
        setStatus(confirmContact(contact_id, notification_id, triggered_by))
        setNewType('contact_confirmed')
    }

    function decline(e){
        e.preventDefault()
        
        setStatus(declineContact(contact_id, notification_id))
        setNewType('contact_declined')
    }

    useEffect(() => {

    })

    return (
        <>
        {new_type === 'contact_request' &&
        <ListGroupItem className="p-3">
            <div className="d-flex flex-row flex-nowrap align-items-center ">
                <span><Image src={placeholder} className={"img-fluid pe-3"}/></span>
                <span>
                    <div className="d-flex flex-row w-100 align-items-center justify-content-between">
                        <h6>{notificationText(new_type)}</h6>
                        <Dropdown >
                            <Button className="border-0 post-options" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                                <i className="bi bi-three-dots"></i> 
                            </Button>
                            <ul className="dropdown-menu" >
                                <Dropdown.Item>View profile</Dropdown.Item>
                                <Dropdown.Item>Block user</Dropdown.Item>
                            </ul>
                        </Dropdown>
                    </div>
                    <div>
                        <Button className = 'mx-2' onClick={confirm}>Confirm</Button>
                        <Button className = 'mx-2 deny-button' onClick={decline}>Decline</Button>
                    </div>
                </span>
            </div>
        </ListGroupItem>}
        {new_type === 'contact_confirmed_user' &&
        <ListGroupItem className="p-3">
            <div className="d-flex flex-row flex-nowrap align-items-center ">
                <span><Image src={placeholder} className={"img-fluid pe-3"}/></span>
                <span>
                    <small className="text-muted"><em>{notificationText(new_type)}</em></small>
                    <h6> Request confirmed. </h6>
                </span>     
            </div>
        </ListGroupItem>}
        {new_type === 'contact_confirmed_triggered_by' &&
        <ListGroupItem className="p-3">
            <div className="d-flex flex-row flex-nowrap align-items-center ">
                <span><Image src={placeholder} className={"img-fluid pe-3"}/></span>
                <span>
                    <h6> {notificationText(new_type)} </h6>
                </span>
            </div>
        </ListGroupItem>}
        {(new_type === 'contact_declined' && user_id === user.id) &&
        <ListGroupItem className="p-3">
            <div className="d-flex flex-row flex-nowrap align-items-center ">
                <span><Image src={placeholder} className={"img-fluid pe-3"}/></span>
                <span>
                    <small className="text-muted"><em>{notificationText("contact_request")}</em></small>
                    <h6> Request declined. </h6>
                </span>
            </div>
        </ListGroupItem>}
        </> 
    );
}

export default NotificationItem;