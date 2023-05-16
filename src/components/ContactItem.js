import { Col, Image, ListGroupItem, Row} from "react-bootstrap";
import { Link} from "react-router-dom";
import placeholder from "../static/images/profile_pic_placeholder.svg";
import call_icon from "../static/images/call.svg";
import message_icon from "../static/images/message.svg";

export default function ContactItem({contactProp, active}) {

    const {username, contact_id} = contactProp
    const active_user = active

    return(
        <ListGroupItem className={active_user === username ? "highlight-chat":""}>
            <Row className={'d-flex flex-row align-items-center '}>
                <Col className={' px-1 col-2'}>
                    <Link to={'#profile_link'}><Image src={placeholder} className={'img-fluid  '}></Image></Link>
                </Col>
                <Col className={'fw-bold px-3 '}>
                    @{username}
                </Col>
                <Col  className={'col-2'}>
                    <Link to={'#call_link'}><Image src={call_icon} className={'img-fluid  '}></Image></Link>
                </Col>
                <Col  className={'col-2'}>
                    <Link to={`/chats/${contact_id}`}> <Image src={message_icon} className={'img-fluid  '}></Image></Link>
                </Col>
            </Row>
        </ListGroupItem>
    );

}