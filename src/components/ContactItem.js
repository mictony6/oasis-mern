import {Button, ButtonGroup, Col, Container, Dropdown, Image, ListGroupItem, Row} from "react-bootstrap";
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

export default function ContactItem({contactProp, active, pageView}) {

    const { user } = useContext(UserContext)
    const {username, contact_id, contact_person_id, status, requested_by, blocked_by } = contactProp
    const active_user = active

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

    const classes = `d-flex flex-row py-2 border border-1 mt-1 rounded-2 flex-grow-1 ${active_user === username ? 'highlight-chat' : 'bg-light'}
    ${hover ? "bg-white border-primary align-items-center" : "align-items-center"}`;
    return(
        <Container>
        <Row 
            onMouseOver={()=>{setHover(true)}}
            onMouseOut={()=>{setHover(false)}}
            className={classes}
            >
            <Col xs={2}>
                <Link to={"/user/"+contact_person_id}>
                    <Image src={placeholder} style={{width:32   , height:"auto"}}/>
                </Link>
            </Col>
            <Col xs={5}>
                @{username}
            </Col>
            {pageView && <Col>
                <div className={` px-3 rounded-pill ${getColor(status)}`}> {status}</div>
            </Col>}
            {status === 'ACTIVE' &&
            <Col as={Link} to={`/chats/${contact_id}`} className='text-end'> 
                <Image src={message_icon} className={'img-fluid'}></Image>
            </Col>}
            {pageView &&
                <ButtonGroup>
                    <Button>Remove</Button>
                    <Button>Block</Button>
                </ButtonGroup>
            }
        </Row>
        </Container>
    );

}