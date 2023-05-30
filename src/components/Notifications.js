import { useState } from "react";
import { Dropdown, Row, Col, ListGroup, Button } from "react-bootstrap";
import NotificationItem from "./NotificationItem";
import { useEffect } from "react";

export default function Notifications() {

    const [read, setRead] = useState(false)
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        fetch(`http://127.0.0.1:4000/notifications/viewUnread`,
        {method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        }
        )
        .then(res => res.json())
        .then(data => {
            setNotifications(data.map(notification => 
                {
                return <NotificationItem key = {notification.notification_id} notificationProp={notification}/>
                }
                ))
    })
    }, [])

    return (
        <Dropdown className="w-100 " onClick={e => setRead(true)}>                
            <div className="d-flex flex-row justify-content-end">
                <div>
                    <Dropdown.Toggle  type="button" className=" border-0 post-options " data-bs-toggle="dropdown" aria-expanded="false">
                        {read ? <i className="bi bi-bell"></i> : <i className="bi bi-bell-fill"></i>}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="  w-100 m-0 p-2">
                        <Dropdown.Header><h6>notifications</h6></Dropdown.Header>
                        <Dropdown.Divider />
                        <ListGroup className='overflow-auto notif-panel'>
                            {notifications}
                        </ListGroup>    
                    </Dropdown.Menu>
                </div>
            </div>

        </Dropdown>
    )
}