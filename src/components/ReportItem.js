import { Col, ListGroup, Row } from "react-bootstrap";

const ReportItem = ({reportProp}) => {

    const { flag_id, username, subject, type, details } = reportProp

    return (
        <ListGroup.Item>
            <Row>
                <Col sm={3}>{flag_id}</Col>
                <Col sm={2}>{type}</Col>
                <Col sm={2}>@{username}</Col>
                <Col className='text-end me-5'>{details}</Col>
            </Row>
        </ListGroup.Item>
        
    )
}

export default ReportItem;