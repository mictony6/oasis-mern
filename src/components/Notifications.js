import { useState } from "react";
import { Dropdown, Row, Col, ListGroup, Button } from "react-bootstrap";
import NotificationItem from "./NotificationItem";

export default function Notifications() {

    const [hasUnread, setHasUnread] = useState(true)

    return (
        <Dropdown className="w-100 ">                
            <div className="d-flex flex-row justify-content-end">
                <div >
                    <Dropdown.Toggle  type="button" className=" border-0 post-options " data-bs-toggle="dropdown" aria-expanded="false" >
                        {hasUnread ? <i className="bi bi-bell-fill"></i> : <i className="bi bi-bell"></i>}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="  w-100 m-0 p-2" >
                        <Dropdown.Header><h6>notifications</h6></Dropdown.Header>
                        <Dropdown.Divider />
                        <ListGroup className='overflow-auto notif-panel'>
                            <NotificationItem/>
                            <NotificationItem/>
                            <NotificationItem/>
                            <NotificationItem/>

                        </ListGroup>    
                    </Dropdown.Menu>
                </div>
            </div>

        </Dropdown>
    )
}