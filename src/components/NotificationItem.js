import { ListGroupItem, Image, Button, Dropdown } from "react-bootstrap";
import placeholder from "../static/images/profile_pic_placeholder.svg";
import { Link } from "react-router-dom";

const NotificationItem = () => {
    return ( 
        <ListGroupItem className="p-3">
            <div className="d-flex flex-row flex-nowrap align-items-start ">
                <span><Image src={placeholder} className={"img-fluid pe-3"}/></span>
                <span>
                    <div className="d-flex flex-row w-100 align-items-center justify-content-between">
                        <h6>@user has sent you</h6>
                        <Dropdown >
                            <Button className="border-0 post-options" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                                <i class="bi bi-three-dots"></i> 
                            </Button>
                            <ul className="dropdown-menu" >
                                <Dropdown.Item>Mark as read</Dropdown.Item>
                                <Dropdown.Item>Block user</Dropdown.Item>
                            </ul>
                        </Dropdown>
                    </div>
                    <p>Hello, I am user and I am doing something with tou.</p>
                    </span>
            </div>
        </ListGroupItem>
     );
}
 
export default NotificationItem;