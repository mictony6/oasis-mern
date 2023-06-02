import {Button, ButtonGroup, Col, Dropdown, Image, ListGroupItem, Row} from "react-bootstrap";
import { Link} from "react-router-dom";
import user_placeholder from '../static/images/profile_pic_placeholder.svg'
import placeholder from '../static/images/profile1.svg';
import message_icon from "../static/images/message.svg";
import {useContext, useState} from "react";
import UserContext from "../UserContext";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import DropdownItem from "react-bootstrap/DropdownItem";
import person_add from "../static/images/person/person-add.svg";

export default function ContactItem({contactProp, active, pageView, options=false}) {

    const { user } = useContext(UserContext)
    const {username, contact_id, contact_person_id, status, requested_by, blocked_by } = contactProp
    const active_user = active
    const showOptions = options

    const colors = [
        {
            status: 'ACTIVE',
            color: 'bg-primary'
        },
        {
            status: 'PENDING',
            color: 'bg-warning'
        },
        {
            status: 'BLOCKED',
            color: 'text-bg-danger'
        },
    ]

    function getColor(status){
        const contactStatus = colors.find(item => item.status === status)
        return contactStatus.color
    }

    const [hover, setHover] = useState(false)

    const classes = "p-2 border border-1 mt-1 rounded-2  d-flex flex-row flex-nowrap justify-content-between ";
    return(
        <Link to={"/user/"+contact_person_id} className={"text-decoration-none"}>
            <div  role="link"
                  onMouseOver={()=>{setHover(true)}}
                  onMouseOut={()=>{setHover(false)}}
                  className={classes + (hover ? "bg-white border-primary align-items-center" : "bg-light align-items-center") + (active_user === username ? "highlight-chat":"")}>
                <Image src={placeholder} style={{width:32   , height:"auto"}}/>
                <div >@{username}</div>
                <div className={"mx-2"}></div>
                <div className={` px-3 rounded-pill ${getColor(status)}`}> {status}</div>
                {status === 'ACTIVE' &&
                <Link to={`/chats/${contact_id}`}> <Image src={message_icon} className={'img-fluid  '}></Image></Link>}
                {showOptions ?
                    <>
                        <ButtonGroup>
                            <Button>Remove</Button>
                            <Button>Block</Button>
                        </ButtonGroup>
                    </>
                    :
                    <></>
                }
            </div>

        </Link>
    );

}