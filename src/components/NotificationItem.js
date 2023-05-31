import { ListGroupItem, Image, Button, Dropdown } from "react-bootstrap";
import placeholder from "../static/images/profile_pic_placeholder.svg";
import { Link, useNavigate } from "react-router-dom";
import { confirmContact } from "../functions/contactFunctions";
import { declineContact } from "../functions/contactFunctions";
import { useState } from "react";
import { useContext } from "react";
import UserContext from "../UserContext";
import { useEffect } from "react";

const NotificationItem = ({notificationProp, modal}) => {

    const { user, setUser } = useContext(UserContext)

    const { user_id, triggered_by, notification_id, triggered_by_username, type, marked_read, contact_id, post_id, like_count, user_username, comment_id, comment_count } = notificationProp

    const [new_type, setNewType] = useState(type)
    const [readStatus, setReadStatus] = useState(marked_read)

    const [post, setPost] = useState(null)
    const [comment, setComment] = useState(null)

    const texts = [
        {
            type: 'like_post',
            text: like_count > 1 ?
            `@${triggered_by_username} and ${like_count-1} others liked your post ${post ? `"${post.subject}"` : ''}`
            : `@${triggered_by_username} liked your post ${post ? `"${post.subject}"` : ''}`
        },
        {
            type: 'like_comment',
            text: like_count > 1 ?
            `@${triggered_by_username} and ${like_count-1} others liked your comment ${comment ? `"${comment.content}"` : ''} on ${user_username}'s post ${post ? `"${post.subject}"` : ''}`
            : `@${triggered_by_username} liked your comment ${comment ? `"${comment.content}"` : ''} on ${user_username}'s post ${post ? `"${post.subject}"` : ''}`
        },
        {
            type: 'comment',
            text: comment_count > 1 ?
            `@${triggered_by_username} and ${comment_count-1} others commented on your post ${post ? `"${post.subject}"` : ''}`
            : `@${triggered_by_username} commented on your post ${post ? `"${post.subject}"` : ''}`
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
        e.stopPropagation()
        
        confirmContact(triggered_by)
        setNewType('contact_confirmed_user')
    }

    function decline(e){
        e.preventDefault()
        e.stopPropagation()
        
        declineContact(triggered_by)
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

    const location = useNavigate();

    const goToLink = (type, id) => {
        location(`/${type}/${id}`)
    }

    useEffect(() => {
        if(post_id){
            fetch(`http://localhost:4000/post/view/${post_id}`,
            {method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
            }
            )
            .then(res => res.json())
            .then(data => {
                data.length !== 0 ? setPost(data[0]) : setPost(null)
            })
        }

        if(comment_id){
            fetch(`http://localhost:4000/post/comment/view/${comment_id}`,
            {method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
            }
            )
            .then(res => res.json())
            .then(data => {
                if(data.length !== 0){
                    setComment(data[0])

                    fetch(`http://localhost:4000/post/view/${data[0].post_id}`,
                    {method: 'GET',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                    }
                    )
                    .then(res => res.json())
                    .then(data => {
                        data.length !== 0 ? setPost(data[0]) : setPost(null)
                    })
                }
                
            })
        }
    })

    return (
        <>
        <ListGroupItem className={readStatus ? "notif p-3" : "p-3 notif-unread"} onMouseEnter={!modal ? markRead : null}>
        {new_type === 'contact_request' &&
            <div className="d-flex flex-row flex-nowrap align-items-center " onClick={e=> goToLink('user',triggered_by)}>
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
                <Dropdown onClick={e => e.stopPropagation()}>
                    <Button className="border-0 post-options" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                        <i className="bi bi-three-dots"></i> 
                    </Button>
                        <ul className="dropdown-menu" >
                        <Dropdown.Item onClick={e=> goToLink('user',triggered_by)}>View profile</Dropdown.Item>
                        <Dropdown.Item>Block user</Dropdown.Item>
                    </ul>
                    </Dropdown>
                </span>
            </div>}
        {new_type === 'contact_confirmed_user' &&
            <div className="d-flex flex-row flex-nowrap align-items-center " onClick={e=> goToLink('user',triggered_by)}>
                <span><Image src={placeholder} className={"img-fluid pe-3"}/></span>
                <span>
                    <small className="text-muted"><em>{notificationText(new_type)}</em></small>
                    <h6> Request confirmed. </h6>
                </span>
                <span className="d-flex flex-grow-1 justify-content-end">
                <Dropdown onClick={e => e.stopPropagation()}>
                    <Button className="border-0 post-options" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                        <i className="bi bi-three-dots"></i> 
                    </Button>
                        <ul className="dropdown-menu" >
                        <Dropdown.Item onClick={e=> goToLink('user',triggered_by)}>View profile</Dropdown.Item>
                        <Dropdown.Item>Block user</Dropdown.Item>
                    </ul>
                    </Dropdown>
                </span>     
            </div>}
        {new_type === 'contact_confirmed_triggered_by' &&
            <div className="d-flex flex-row flex-nowrap align-items-center " onClick={e=> goToLink('user',triggered_by)}>
                <span><Image src={placeholder} className={"img-fluid pe-3"}/></span>
                <span>
                    <h6> {notificationText(new_type)} </h6>
                </span>
                <span className="d-flex flex-grow-1 justify-content-end">
                <Dropdown onClick={e => e.stopPropagation()}>
                    <Button className="border-0 post-options" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                        <i className="bi bi-three-dots"></i> 
                    </Button>
                        <ul className="dropdown-menu">
                        <Dropdown.Item onClick={e=> goToLink('user',triggered_by)}>View profile</Dropdown.Item>
                        <Dropdown.Item>Block user</Dropdown.Item>
                    </ul>
                </Dropdown>
                </span>
            </div>}
        {(new_type === 'contact_declined' && user_id === user.id) &&
            <div className="d-flex flex-row flex-nowrap align-items-center " onClick={e=> goToLink('user',triggered_by)}>
                <span><Image src={placeholder} className={"img-fluid pe-3"}/></span>
                <span>
                    <small className="text-muted"><em>{notificationText("contact_request")}</em></small>
                    <h6> Request declined. </h6>
                </span>
                <span className="d-flex flex-grow-1 justify-content-end">
                <Dropdown onClick={e => e.stopPropagation()}>
                    <Button className="border-0 post-options" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                        <i className="bi bi-three-dots"></i> 
                    </Button>
                        <ul className="dropdown-menu" >
                        <Dropdown.Item onClick={e=> goToLink('user',triggered_by)}>View profile</Dropdown.Item>
                        <Dropdown.Item>Block user</Dropdown.Item>
                    </ul>
                </Dropdown>
                </span>
            </div>}
            {(new_type === 'like_post' || new_type === "comment") &&
            <div className="d-flex flex-row flex-nowrap align-items-center notif-view" onClick={e=> goToLink('post',post_id)}>
                <span><Image src={placeholder} className={"img-fluid pe-3"}/></span>
                <span>
                    <h6> {notificationText(new_type)} </h6>
                </span>
                <span className="d-flex flex-grow-1 justify-content-end">
                <Dropdown onClick={e => e.stopPropagation()}>
                    <Button className="border-0 post-options" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                        <i className="bi bi-three-dots"></i> 
                    </Button>
                        <ul className="dropdown-menu" >
                        <Dropdown.Item onClick={e=> goToLink('post',post_id)}>View profile</Dropdown.Item>
                        <Dropdown.Item>Block user</Dropdown.Item>
                    </ul>
                </Dropdown>
                </span>
            </div>}
            {(new_type === 'like_comment') &&
            <div className="d-flex flex-row flex-nowrap align-items-center notif-view" onClick={e=> goToLink('post',post_id)}>
                <span><Image src={placeholder} className={"img-fluid pe-3"}/></span>
                <span>
                    <h6> {notificationText(new_type)} </h6>
                </span>
                <span className="d-flex flex-grow-1 justify-content-end">
                <Dropdown onClick={e => e.stopPropagation()}>
                    <Button className="border-0 post-options" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                        <i className="bi bi-three-dots"></i> 
                    </Button>
                        <ul className="dropdown-menu" >
                        <Dropdown.Item onClick={e=> goToLink('post',post.post_id)}>View profile</Dropdown.Item>
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