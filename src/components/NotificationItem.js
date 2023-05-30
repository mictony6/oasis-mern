import { ListGroupItem, Image, Button, Dropdown } from "react-bootstrap";
import placeholder from "../static/images/profile_pic_placeholder.svg";
import { Link } from "react-router-dom";
import { confirmContact } from "../functions/contactFunctions";
import { declineContact } from "../functions/contactFunctions";
import { useState } from "react";
import { useContext } from "react";
import UserContext from "../UserContext";

const NotificationItem = ({notificationProp, modal}) => {

    const { user, setUser } = useContext(UserContext)

    const { user_id, triggered_by, notification_id, triggered_by_username, type, marked_read, contact_id } = notificationProp

    const [new_type, setNewType] = useState(type)
    const [readStatus, setReadStatus] = useState(marked_read)

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
            text: `@${triggered_by_username} has accepted your contact request.`
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
        
        confirmContact(contact_id, notification_id, triggered_by)
        setNewType('contact_confirmed_user')
    }

    function decline(e){
        e.preventDefault()
        
        declineContact(contact_id, notification_id)
        setNewType('contact_declined')
    }

    function markRead(e){
        e.preventDefault()

        fetch(`http://localhost:4000/notifications/markRead/${notification_id}`, {
        method : 'PATCH',
        headers : {
            'Content-Type' : 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        }).then(res => res.json())
        .then(data => {
            if(data) {
                setReadStatus(data)
                setUser({has_notifications: false})
            }
        }
        )
    }

    return (
        <>
        <ListGroupItem className={readStatus ? "p-3" : "p-3 notif-unread"} onMouseEnter={!modal ? markRead : null}>
        {new_type === 'contact_request' &&
            <div className="d-flex flex-row flex-nowrap align-items-center ">
                <span><Image src={placeholder} className={"img-fluid pe-3"}/></span>
                <span>
                    <div className="d-flex flex-row w-100 align-items-center">
                        <h6>{notificationText(new_type)}</h6>
                    </div>
                    <div className="d-flex flex-row w-100 align-items-center">
                        <Button className = 'mx-2' onClick={confirm}>Confirm</Button>
                        <Button className = 'mx-2 deny-button' onClick={decline}>Decline</Button>
                    </div>
                </span>
                <span className="d-flex flex-grow-1 justify-content-end">
                <Dropdown>
                    <Button className="border-0 post-options" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                        <i className="bi bi-three-dots"></i> 
                    </Button>
                        <ul className="dropdown-menu" >
                        <Dropdown.Item as={Link} to={`/user/${triggered_by}`}>View profile</Dropdown.Item>
                        <Dropdown.Item>Block user</Dropdown.Item>
                    </ul>
                    </Dropdown>
                </span>
            </div>}
        {new_type === 'contact_confirmed_user' &&
            <div className="d-flex flex-row flex-nowrap align-items-center ">
                <span><Image src={placeholder} className={"img-fluid pe-3"}/></span>
                <span>
                    <small className="text-muted"><em>{notificationText(new_type)}</em></small>
                    <h6> Request confirmed. </h6>
                </span>
                <span className="d-flex flex-grow-1 justify-content-end">
                <Dropdown>
                    <Button className="border-0 post-options" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                        <i className="bi bi-three-dots"></i> 
                    </Button>
                        <ul className="dropdown-menu" >
                        <Dropdown.Item as={Link} to={`/user/${triggered_by}`}>View profile</Dropdown.Item>
                        <Dropdown.Item>Block user</Dropdown.Item>
                    </ul>
                    </Dropdown>
                </span>     
            </div>}
        {new_type === 'contact_confirmed_triggered_by' &&
            <div className="d-flex flex-row flex-nowrap align-items-center ">
                <span><Image src={placeholder} className={"img-fluid pe-3"}/></span>
                <span>
                    <h6> {notificationText(new_type)} </h6>
                </span>
                <span className="d-flex flex-grow-1 justify-content-end">
                <Dropdown>
                    <Button className="border-0 post-options" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                        <i className="bi bi-three-dots"></i> 
                    </Button>
                        <ul className="dropdown-menu" >
                        <Dropdown.Item as={Link} to={`/user/${triggered_by}`}>View profile</Dropdown.Item>
                        <Dropdown.Item>Block user</Dropdown.Item>
                    </ul>
                </Dropdown>
                </span>
            </div>}
        {(new_type === 'contact_declined' && user_id === user.id) &&
            <div className="d-flex flex-row flex-nowrap align-items-center ">
                <span><Image src={placeholder} className={"img-fluid pe-3"}/></span>
                <span>
                    <small className="text-muted"><em>{notificationText("contact_request")}</em></small>
                    <h6> Request declined. </h6>
                </span>
                <span className="d-flex flex-grow-1 justify-content-end">
                <Dropdown>
                    <Button className="border-0 post-options" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                        <i className="bi bi-three-dots"></i> 
                    </Button>
                        <ul className="dropdown-menu" >
                        <Dropdown.Item as={Link} to={`/user/${triggered_by}`}>View profile</Dropdown.Item>
                        <Dropdown.Item>Block user</Dropdown.Item>
                    </ul>
                </Dropdown>
                </span>
            </div>}
        </ListGroupItem>
        </> 
    );
}

export default NotificationItem;