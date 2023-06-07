import {Button, ButtonGroup, Col, Container, Dropdown, Image, ListGroupItem, Row} from "react-bootstrap";
import { Link} from "react-router-dom";
import User_f from "../static/images/nonuser_f.svg";
import User_m from "../static/images/nonuser_m.svg";
import placeholder_f from "../static/images/user_placeholder_f.svg";
import placeholder_m from "../static/images/user_placeholder_m.svg";
import Therapist_f from "../static/images/dr_placeholder_f.svg";
import Therapist_m from "../static/images/dr_placeholder_m.svg";
import Admin_f from "../static/images/admin_placeholder_f.svg";
import Admin_m from "../static/images/admin_placeholder_m.svg";
import Others from "../static/images/other_placeholder.svg";
import message_icon from "../static/images/message.svg";
import {useContext, useEffect, useState} from "react";
import UserContext from "../UserContext";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import DropdownItem from "react-bootstrap/DropdownItem";
import person_add from "../static/images/person/person-add.svg";
import { addContact, blockContact, cancelContact, confirmContact, declineContact, removeContact, unblockContact } from "../functions/contactFunctions";

export default function ContactItem({contactProp, active, pageView}) {

    const { user } = useContext(UserContext)
    const {username, role, gender, contact_id, user_id, status, requested_by, blocked_by, prefix, last_name, suffix, message_count} = contactProp
    
    const [new_status, setNewStatus] = useState(status)
    // const [message_count, setMessageCount] = useState(0)

    // contact functions
    function add(e){
        e.preventDefault()
        setNewStatus(addContact(user_id))
    }

    function remove(e){
        e.preventDefault()
        setNewStatus(removeContact(user_id))
    }
    
    function block(e){
        setNewStatus(blockContact(user_id))
    }

    function cancel(e){
        setNewStatus(cancelContact(user_id))
    }

    function unblock(e){
        e.preventDefault()
        setNewStatus(unblockContact(user_id))
    }

    function confirm(e){
        e.preventDefault()
        
        setNewStatus(confirmContact(user_id))
    }

    function decline(e){
        e.preventDefault()
        
        setNewStatus(declineContact(user_id))
    }

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

    const classes = `d-flex flex-row py-2 border border-1 mt-1 rounded-2 flex-grow-1 ${active === username ? 'highlight-chat' : 'bg-light'}
    ${hover ? "bg-white border-secondary text-secondary align-items-center" : "align-items-center"}`;

    useEffect(() => {
    }, [contact_id, new_status, setNewStatus, message_count])

       // Create a mapping object for role and gender combinations
       const imageMap = {
        "User_male": User_m,
        "User_female": User_f,
        "Therapist_male": Therapist_m,
        "Therapist_female": Therapist_f,
        "Admin_male": Admin_m,
        "Admin_female": Admin_f,
        "User_non-binary": Others,
        "Therapist_non-binary": Others,
        "Admin_non-binary": Others,
        "User_others": Others,
        "Admin_others": Others,
        "Therapist_others": Others
    };
    
    // Assuming `role` and `gender` are defined variables
    const imageName = `${role}_${gender}`;

    return(
        <Container as={Link} to={`/chats/${contact_id}`} className='text-decoration-none'>
        <Row 
            onMouseOver={()=>{setHover(true)}}
            onMouseOut={()=>{setHover(false)}}
            className={classes}
            >
            <Col xs={2} onClick={e => e.stopPropagation()}>
                <Link to={"/user/"+user_id}>
                    <Image src={imageMap[imageName]} style={{width:32   , height:"auto"}}/>
                </Link>
            </Col>
            <Col xs={pageView ? 4 : 5}>
                {role !== 'Therapist' ? `@${username}` : `${prefix ? prefix : ''} ${last_name} ${suffix ? suffix : ''}`}
            </Col>
            {(!pageView && message_count !== 0) &&
                <Col xs={2} className='text-center'>
                    <div className={`px-2 rounded-pill text-bg-danger`}> {message_count}</div>
                </Col>  
            }
            {pageView && <Col xs={2}>
                <div className={`px-3 text-center rounded-pill ${getColor(status)}`}> {status}</div>
            </Col>}
            {new_status === 'ACTIVE' &&
            <Col className='text-end'> 
                <Image src={message_icon} className={'img-fluid'}></Image>
            </Col>}
            {(pageView && new_status === 'ACTIVE') && <Col className='text-end'>
                <ButtonGroup>
                    <Button className = 'bg-secondary' onClick={remove}>Remove</Button>
                    <Button className = 'text-bg-danger' onClick={block}>Block</Button>
                </ButtonGroup>
            </Col>}
            {(pageView && new_status === 'BLOCKED') && <Col className='text-end'>
                <ButtonGroup>
                    <Button className = 'bg-secondary' onClick={unblock}>Unblock</Button>
                </ButtonGroup>
            </Col>}
            {(pageView && new_status === 'PENDING') && <Col className='text-end'>
                <ButtonGroup>
                    <Button onClick={confirm}>Confirm</Button>
                    <Button className = 'deny-button' onClick={decline}>Decline</Button>                
                </ButtonGroup>
            </Col>}
        </Row>
        </Container>
    );

}