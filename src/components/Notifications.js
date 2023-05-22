import { Dropdown, Row, Col, ListGroup, Button } from "react-bootstrap";

export default function Notifications() {
    return (
        <Dropdown classname="w-100 ">                
            <Row>
                <Col></Col>
                <Col lg={2}>
                    <Button type="button" className=" border-0 post-options " data-bs-toggle="dropdown" aria-expanded="false" >
                        <i class="bi bi-bell"></i>
                    </Button>
                    <ul className="dropdown-menu w-100 m-0 p-2" >
                        <Dropdown.Header><h6>notifications</h6></Dropdown.Header>
                        <Dropdown.Divider />
                        <ListGroup className='overflow-auto notif-panel'>
                            <ListGroup.Item>ssdsdsds</ListGroup.Item>
                            <ListGroup.Item>ssdsdsds</ListGroup.Item>
                            <ListGroup.Item>ssdsdsds</ListGroup.Item>
                            <ListGroup.Item>ssdsdsds</ListGroup.Item>
                            <ListGroup.Item>ssdsdsds</ListGroup.Item>
                            <ListGroup.Item>ssdsdsds</ListGroup.Item>
                            <ListGroup.Item>ssdsdsds</ListGroup.Item>
                            <ListGroup.Item>ssdsdsds</ListGroup.Item>
                            <ListGroup.Item>ssdsdsds</ListGroup.Item>
                            <ListGroup.Item>ssdsdsds</ListGroup.Item>
                            <ListGroup.Item>ssdsdsds</ListGroup.Item>
                        
                        </ListGroup>    
                    </ul>
                </Col>
            </Row>

        </Dropdown>
    )
}