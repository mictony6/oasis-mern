import { useState } from "react";
import { Dropdown, ListGroup, Spinner, Modal, ModalHeader, ModalBody } from "react-bootstrap";
import NotificationItem from "./NotificationItem";
import { useEffect } from "react";
import { useContext } from "react";
import UserContext from "../UserContext";
import {useTranslation} from "react-i18next";

export default function Notifications() {

    const { user, setUser } = useContext(UserContext)
    const [notifications, setNotifications] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [notificationsLoading, setNotificationsLoading] = useState(true)
    const [allNotifications, setAllNotifications] = useState([])

    const [open, setOpen] = useState(false);

    const openModal = (e) => {
        setOpen(true);
    }
    const closeModal = e => {
        setOpen(false);
    }

    useEffect(() => {
        setUser({has_notifications: false})
    }, [setUser])

    function retrieveUnread(e){
        fetch(`http://127.0.0.1:4000/notifications/viewUnread`,
        {method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        }
        )
        .then(res => res.json())
        .then(data => {
            setIsLoading(false)
            if(data.length !== 0){
            setNotifications(data.map(notification => 
                {
                return <NotificationItem key = {notification.notification_id} notificationProp={notification} modal={false}/>
                }
            ))
            } else {
            setNotifications(
            <div className="d-flex text-muted py-3 justify-content-center">
                <small><em> {t('notification.empty')}</em></small>
            </div>)
            }
        })
    }

    function retrieveNotifications(e){
        setNotificationsLoading(true)

        fetch(`http://127.0.0.1:4000/notifications/viewAll`,
        {method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        }
        )
        .then(res => res.json())
        .then(data => {
            setIsLoading(false)
            if(data.length !== 0){
            setNotificationsLoading(false)
            setAllNotifications(data.map(notification => 
                {
                return <NotificationItem key = {notification.notification_id} notificationProp={notification} modal={true}/>
                }
            ))
            } else {
                setAllNotifications(
            <div className="d-flex text-muted py-3 justify-content-center">
                <small><em> You don't have any notifications. </em></small>
            </div>)
            }
        })
        openModal()
    }

    const {t, i182} = useTranslation();

    return (
        <>
        <Dropdown className="w-100 " onClick={retrieveUnread}>                
            <div className="d-flex flex-row justify-content-end">
                <div>
                    <Dropdown.Toggle  type="button" 
                    className=" border-0 post-options " data-bs-toggle="dropdown" aria-expanded="false">
                    {!user.has_notifications ? <i className="bi bi-bell"></i> : <i className="bi bi-bell-fill position-relative"> <i className="bi bi-circle-fill text-danger notif-circle"></i></i>}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="w-100 m-0 p-2">
                        <Dropdown.Header><h6>{t('notification.name').toLowerCase()}</h6></Dropdown.Header>
                        <Dropdown.Divider />
                        {isLoading ?
                            <div className={"flex-grow-1 w-100 text-center mt-3 mb-0"}>
                                <Spinner/>
                            </div>
                            :
                            <ListGroup className='overflow-auto notif-panel'>
                                {notifications}
                            </ListGroup> }
                        <Dropdown.Divider />
                        <span className="d-flex justify-content-center p-2 notif-view" onClick={retrieveNotifications}>
                            <p className="p-0 m-0">{t('notification.all')}</p>
                        </span>
                    </Dropdown.Menu>
                </div>
            </div>
        </Dropdown>

        <Modal show={open} size="lg" className="mt-auto" centered onHide={closeModal}>
            <ModalHeader><h4>Notifications</h4></ModalHeader>
                <ModalBody>
                    {notificationsLoading ?
                    <div className={"flex-grow-1 w-100 text-center mt-3 mb-0"}>
                        <Spinner/>
                    </div>
                    :
                    <ListGroup className='overflow-auto'>
                        {allNotifications}
                    </ListGroup>} 
                </ModalBody>
        </Modal>
        </>

    )
}