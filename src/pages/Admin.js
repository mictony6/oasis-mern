import {Row, Col, Container, ListGroup, ButtonGroup, Button, Collapse, Form, Modal} from "react-bootstrap";
import AppNavbar from "../components/AppNavbar";
import React, {useState} from "react";
import {Link} from "react-router-dom";

function UserManagementItem() {

    const [showRoles, setShowRoles] = useState(false);
    return <ListGroup.Item className={"rounded-2 mb-2 align-items-center "}>
        <Row className={"mt-3 text-bg-white "}>
            <Col lg={2} className={"fw-bold"}>@username</Col>
            <Col lg={2}><span className={"px-2 rounded-pill text-bg-primary"}>Admin</span></Col>
            <Col>
                <Button onClick={()=>{setShowRoles(true)}} className={"me-2"}>Modify Role</Button>
                <Modal show={showRoles} onHide={()=>{setShowRoles(false)}} >
                    <Modal.Header>Choose a Role</Modal.Header>
                    <Modal.Body>
                        <Form.Control as="select" className={"mb-2"}>
                            <option>Admin</option>
                            <option>User</option>
                            <option>Therapist</option>
                        </Form.Control>
                        <Button className={"me-2"}>Save</Button>
                        <Button onClick={()=>{setShowRoles(false)}}>Cancel</Button>
                    </Modal.Body>
                </Modal>
                <Button className={"text-bg-danger me-2"}>Remove User</Button>

            </Col>
        </Row>

    </ListGroup.Item>;
}

function PostManagementItem() {
    return <ListGroup.Item className={"rounded-2 mb-2 align-items-center "}>
        <Row className={"mt-3 text-bg-white "}>
            <Col lg={3} className={"fw-bold"}>Title of Post</Col>
            <Col lg={2}><small>@username</small></Col>
            <Col lg={2}><span className={"px-2 rounded-pill text-bg-primary"}>March 10</span></Col>
            <Col lg={1}><span className={"px-2 rounded-pill text-bg-info"}>No</span></Col>
            <Col>
                <Button className={"me-2"}>View</Button>
                <Button className={"text-bg-danger"}>Delete</Button>
            </Col>
        </Row>

    </ListGroup.Item>;
}

export default function Admin() {

    const [showUsers, setShowUsers] = useState(false)
    const [showPosts, setShowPosts] = useState(false)
    return (
        <>
            <Container fluid>
                <Row className='d-flex flex-row'>
                    <Col lg={2} className=''>
                        <AppNavbar/>
                    </Col>


                    <Col lg={10}>
                        <Container className={"text-bg-light rounded-4 px-3 py-2 my-4"}>
                            <Link to={""} onClick={()=>{setShowUsers(!showUsers)}}>
                                <h5 >
                                    User Management
                                    {showUsers ? <i className="bi bi-caret-up-fill"></i> : <i className="bi bi-caret-right-fill"></i>}
                                </h5>
                            </Link>
                            <Collapse in={showUsers}>
                                <ListGroup>
                                    <Row className={"px-3"}>
                                        <Col lg={2}>Username</Col>
                                        <Col lg={2}>Role</Col>
                                        <Col>Actions</Col>
                                    </Row>
                                    <UserManagementItem/>
                                    <UserManagementItem/>
                                    <UserManagementItem/>
                                    <UserManagementItem/>
                                </ListGroup>
                            </Collapse>
                        </Container>
                        <Container className={"text-bg-light rounded-4 px-3 py-2 my-4"}>


                            <div className={"d-flex flex-row flex-nowrap justify-content-between"}>
                                <Link to={""} onClick={()=>{setShowPosts(!showPosts)}}>
                                    <h5 >
                                        Post Management
                                        {showPosts ? <i className="bi bi-caret-up-fill"></i> : <i className="bi bi-caret-right-fill"></i>}
                                    </h5>
                                </Link>
                                <Form className={"d-flex flex-row flex-nowrap mb-4"} >
                                    <Form.Control placeholder={"search by username"}/>
                                    <Button className={"mx-1"}>Search</Button>
                                </Form>
                            </div>


                            <Collapse in={showPosts}>
                                <ListGroup>
                                    <Row className={"px-3"}>
                                        <Col lg={3}>Post</Col>
                                        <Col lg={2}>Posted by</Col>
                                        <Col lg={2}>Date Posted</Col>
                                        <Col lg={1}>Reported</Col>
                                        <Col>Actions</Col>
                                    </Row>
                                    <PostManagementItem/>
                                    <PostManagementItem/>
                                    <PostManagementItem/>
                                    <PostManagementItem/>

                                </ListGroup>
                            </Collapse>
                        </Container>


                    </Col>
                </Row>
            </Container>
        </>
    );
}