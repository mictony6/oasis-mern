import { Col, Image, ListGroupItem, Row} from "react-bootstrap";
import { Link} from "react-router-dom";
import user_placeholder from '../static/images/profile_pic_placeholder.svg'
import placeholder from '../static/images/profile1.svg';
import message_icon from "../static/images/message.svg";
import { useContext } from "react";
import UserContext from "../UserContext";

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

    return(
        <ListGroupItem className={active_user === username ? "highlight-chat":""}>
            <Row className={'d-flex flex-row align-items-center '}>
                <Col className={' px-1 col-2'}>
                    <Link to={`/user/${contact_person_id}`}><Image src={placeholder} className={'img-fluid'}></Image></Link>
                </Col>
                <Col className={'fw-bold px-3 '}>
                    @{username}
                </Col>
                <Col><span className={`px-3 rounded-pill ${getColor(status)}`}>{status}</span></Col>
                <Col  className={'col-2'}>
                    {status === 'ACTIVE' && 
                    <Link to={`/chats/${contact_id}`}> <Image src={message_icon} className={'img-fluid  '}></Image></Link>}
                </Col>
            </Row>
        </ListGroupItem>
    );

}