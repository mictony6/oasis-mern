import {Row, Col, Container, ListGroup, Button, Collapse, Form, Modal} from "react-bootstrap";
import AppNavbar from "../components/AppNavbar";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import { useEffect } from "react";
import Swal from "sweetalert2";

function UserManagementItem({userProp}) {

    const {username, user_id, role, prefix, first_name, last_name, suffix, field, description, online, in_person, fb_link, twt_link, li_link} = userProp

    const [new_first_name, setNewFirstName] = useState(first_name)
    const [new_last_name, setNewLastName] = useState(last_name)
    const [new_prefix, setNewPrefix] = useState(prefix)
    const [new_suffix, setNewSuffix] = useState(suffix)
    const [new_field, setNewField] =useState(field)
    const [new_description, setNewDescription] = useState(description)
    const [new_online, setNewOnline] = useState(online)
    const [new_in_person, setNewInPerson] = useState(in_person)
    const [new_fb_link, setNewFBLink] = useState(fb_link)
    const [new_twt_link, setNewTwtLink] = useState(twt_link)
    const [new_li_link, setNewLiLink] = useState(li_link)

    const [isValidFB, setValidFB] = useState(false)
    const [isValidTwt, setValidTwt] = useState(false)
    const [isValidLi, setValidLi] = useState(false)

    const [value, setValue] = useState(role)
    const [new_role, setNewRole] = useState(role)

    const [showRoles, setShowRoles] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const [active, setActive] = useState(false)

    function handleSubmit() {
        if(value === 'Therapist') {
            fetch(`http://localhost:4000/admin/toTherapist/${user_id}`, {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    first_name: new_first_name,
                    last_name: new_last_name,
                    prefix: new_prefix,
                    suffix: new_suffix,
                    field: new_field,
                    description: new_description,
                    online: new_online,
                    in_person: new_in_person,
                    fb_link: new_fb_link,
                    twt_link: new_twt_link,
                    li_link: new_li_link
                })
                }).then(res => res.json())
                .then(data => {
                    data ?
                    Swal.fire({
                        title: "Role successfully modified!",
                        icon: "success",
                        iconColor: '#3A3530',
                        color: '#3A3530',
                        confirmButtonText: "OK",
                        buttonsStyling: false,
                        customClass: {
                            confirmButton: 'button2'
                        }
                    }).then(setNewRole(value)).then(setShowRoles(false))
                    :
                    Swal.fire({
                        title: "Oh No!",
                        icon: "error",
                        text: "Something went wrong :( Please try again!",
                        iconColor: '#3A3530',
                        color: '#3A3530',
                        confirmButtonText: "OK",
                        buttonsStyling: false,
                        customClass: {
                            confirmButton: 'button2'
                        }
                })
            })
        } else {
            fetch(`http://localhost:4000/admin/updateRole/${user_id}`, {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    role: value
                })
                }).then(res => res.json())
                .then(data => {
                    data ?
                    Swal.fire({
                        title: "Role successfully modified!",
                        icon: "success",
                        iconColor: '#3A3530',
                        color: '#3A3530',
                        confirmButtonText: "OK",
                        buttonsStyling: false,
                        customClass: {
                            confirmButton: 'button2'
                        }
                    }).then(setNewRole(value)).then(setShowRoles(false))
                    :
                    Swal.fire({
                        title: "Oh No!",
                        icon: "error",
                        text: "Something went wrong :( Please try again!",
                        iconColor: '#3A3530',
                        color: '#3A3530',
                        confirmButtonText: "OK",
                        buttonsStyling: false,
                        customClass: {
                            confirmButton: 'button2'
                        }
                })
            })
        }
    }

    useEffect(() => {
        const fb_valid = /^(https?:\/\/)?(www\.)?facebook\.com\/[a-zA-Z0-9(.?)?]/
        const twt_valid = /^(https?:\/\/)?(www\.)?twitter\.com\/[a-zA-Z0-9_]{1,15}$/
        const li_valid = /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company)\/[a-zA-Z0-9_-]+\/?$/


        if (value === 'Therapist') {

            if(new_fb_link){new_fb_link.match(fb_valid) ? setValidFB(true) : setValidFB(false)}
            if(new_twt_link){new_twt_link.match(twt_valid) ? setValidTwt(true) : setValidTwt(false)}
            if(new_li_link){new_li_link.match(li_valid) ? setValidLi(true) : setValidLi(false)}

            (first_name !== new_first_name || last_name !== new_last_name || prefix !== new_prefix || suffix !== new_suffix || field !== new_field || description !== new_description || online !== new_online || in_person !== new_in_person || fb_link !== new_fb_link || twt_link !== new_twt_link || li_link !== new_li_link) && ((!new_fb_link || isValidFB) && (!new_twt_link || isValidTwt) && (!new_li_link || isValidLi)) ? setActive(true) : setActive(false)
            
        } else if (value === new_role) {
            setActive(false) 
        } else {
            setActive(true)
        }

    }, [value, new_role, new_fb_link, new_twt_link, new_li_link, isValidFB, isValidTwt, isValidLi, first_name, new_first_name, last_name, new_last_name, prefix, new_prefix, suffix, new_suffix, field, new_field, description, new_description, online, new_online, in_person, new_in_person, fb_link, twt_link, li_link])


    return <ListGroup.Item className={"rounded-1 mb-2 align-items-center "}>
        <Row className={"mt-3 text-bg-white "}>
            <Col lg={2} className={"fw-bold"}>@{username}</Col>
            <Col lg={2}><span className={"px-2 rounded-pill text-bg-primary"}>{new_role}</span></Col>
            <Col>
                <Button onClick={()=>{setShowRoles(true)}} className={"me-2"}>Modify Role</Button>
                <Modal show={showRoles} onHide={()=>{setShowRoles(false)}} centered size={value === 'Therapist' ? 'lg' : 'md'}>
                    <Modal.Header>Choose a Role</Modal.Header>
                    <Modal.Body className="">
                        <Form.Control as="select" className={"mb-2"} 
                        onChange={e => setValue(e.target.value)}
                        value={value}>
                            <option value='Admin'>Admin</option>
                            <option value='User'>User</option>
                            <option value='Therapist'>Therapist</option>
                        </Form.Control>
                        {value==='Therapist' &&
                        <Container fluid className="d-flex flex-column px-4 my-4">
                        <Row className="justify-content-center text-center mb-2">
                            <h5>Modify Therapist Details</h5>
                        </Row>
                        <Row>
                            <Col>
                            <h6>Therapist Information</h6>
                                <Row>
                                <Col>
                                    <div className='rounded-4 d-flex flex-column p-2 shadow-focus w-100' >
                                        <Form.Label htmlFor='prefix'>Prefix</Form.Label>
                                        <Form.Control
                                            id='prefix'
                                            placeholder="Dr. / Atty. / etc."
                                            className='border-1 shadow-none'
                                            value={new_prefix}
                                            onChange = {e => setNewPrefix(e.target.value)}
                                        />
                                    </div>
                                </Col>
                                <Col>
                                    <div className='rounded-4 d-flex flex-column p-2 shadow-focus w-100' >
                                        <Form.Label htmlFor='suffix'>Suffix</Form.Label>
                                        <Form.Control
                                            id='suffix'
                                            placeholder="Jr. / Sr. / etc."
                                            className='border-1 shadow-none'
                                            value={new_suffix}
                                            onChange = {e => setNewSuffix(e.target.value)}
                                        />
                                    </div>
                                </Col>
                                </Row>
                                <div className='rounded-4 d-flex flex-column p-2 shadow-focus w-100' >
                                        <Form.Label htmlFor='first_name'>First Name</Form.Label>
                                        <Form.Control
                                            id='first_name'
                                            placeholder="Juana"
                                            className='border-1 shadow-none'
                                            value={new_first_name}
                                            onChange = {e => setNewFirstName(e.target.value)}
                                        />
                                </div>
                                <div className='rounded-4 d-flex flex-column p-2 shadow-focus w-100' >
                                        <Form.Label htmlFor='last_name'>Last Name</Form.Label>
                                        <Form.Control
                                            id='last_name'
                                            placeholder="Dela Cruz"
                                            className='border-1 shadow-none'
                                            value={new_last_name}
                                            onChange = {e => setNewLastName(e.target.value)}
                                        />
                                </div>
                                <div className='rounded-4 d-flex flex-column p-2 shadow-focus w-100' >
                                        <Form.Label htmlFor='field'>Field</Form.Label>
                                        <Form.Control
                                            id='field'
                                            placeholder="Pyschology, Public Health, etc."
                                            className='border-1 shadow-none'
                                            value={new_field}
                                            onChange = {e => setNewField(e.target.value)}
                                        />
                                </div>
                                <div className='rounded-4 d-flex flex-column p-2 shadow-focus w-100' >
                                <Form.Label htmlFor='li-link'>Description</Form.Label>
                                <Form.Control
                                id='description'
                                as='textarea'
                                placeholder='Dr. Juana Dela Cruz is a ...'
                                onChange = {e => setNewDescription(e.target.value)}
                                value={new_description}
                                />
                            </div>

                            </Col>
                            <Col>
                            <h6>Social Links</h6>
                            <div className='rounded-4 d-flex flex-column p-2 shadow-focus w-100' >
                                <Form.Label htmlFor='fb-link'>Facebook</Form.Label>
                                <Form.Control
                                    id='fb-link'
                                    placeholder="www.facebook.com/juandelacruz"
                                    className='border-1 shadow-none'
                                    value={new_fb_link}
                                    onChange = {e => setNewFBLink(e.target.value)}
                                />
                                {(new_fb_link && !isValidFB) && <Form.Text className='error-msg'>Please enter a valid Facebook link.</Form.Text>}
                            </div>
                            <div className='rounded-4 d-flex flex-column p-2 shadow-focus w-100' >
                                <Form.Label htmlFor='twt-link'>Twitter</Form.Label>
                                <Form.Control
                                    id='twt-link'
                                    placeholder="www.twitter.com/juandelacruz"
                                    className='border-1 shadow-none'
                                    value={new_twt_link}
                                    onChange = {e => setNewTwtLink(e.target.value)}
                                />
                                {(new_twt_link && !isValidTwt) && <Form.Text className='error-msg'>Please enter a valid Twitter link.</Form.Text>}
                            </div>
                            <div className='rounded-4 d-flex flex-column p-2 shadow-focus w-100' >
                                <Form.Label htmlFor='li-link'>LinkedIn</Form.Label>
                                <Form.Control
                                    id='li-link'
                                    placeholder="www.linkedin.com/in/juandelacruz"
                                    className='border-1 shadow-none'
                                    value={new_li_link}
                                    onChange = {e => setNewLiLink(e.target.value)}
                                />
                                {(new_li_link && !isValidLi) && <Form.Text className='error-msg'>Please enter a valid LinkedIn link.</Form.Text>}
                            </div>
                            <h6 className="py-2">Type of Consultation</h6>
                            <div className='rounded-4 d-flex flex-column p-2 shadow-focus w-100' >
                                <Form.Check
                                    type='checkbox'
                                    id='online'
                                    className='border-1 shadow-none'
                                    onChange = {e => setNewOnline(e.target.checked)}
                                    label = 'Online Consultation'
                                    checked = {new_online}
                                />
                            </div>
                            <div className='rounded-4 d-flex flex-column p-2 shadow-focus w-100' >
                                <Form.Check
                                    type='checkbox'
                                    id='online'
                                    className='border-1 shadow-none'
                                    onChange = {e => setNewInPerson(e.target.checked)}
                                    label = 'In-person Consultation'
                                    checked = {new_in_person}
                                />
                            </div>

                            </Col>
                        </Row>
                    </Container>
                }
                    <div className="text-center">
                        <Button className={"me-2 bg-primary"} disabled={!active} onClick={handleSubmit}>Save</Button>
                        <Button onClick={()=>{setShowRoles(false)}}>Cancel</Button>
                    </div> 
                    </Modal.Body>
                </Modal>
                <Button onClick={()=>{setShowConfirmation(true)}} className={"text-bg-danger me-2"}>Remove User</Button>
                <Modal show={showConfirmation} onHide={()=>{setShowConfirmation(false)}} >
                    <Modal.Header>Remove User</Modal.Header>
                    <Modal.Body>
                        <p>This will remove the user completely from the system. Proceed?</p>
                        <Button className={"me-2 text-bg-warning"}>Confirm</Button>
                        <Button onClick={()=>{setShowConfirmation(false)}}>Cancel</Button>
                    </Modal.Body>
                </Modal>

            </Col>
        </Row>

    </ListGroup.Item>;
}

function PostManagementItem() {

    const [showPostDelete, setShowPostDelete] = useState(false);
    return <ListGroup.Item className={"rounded-1 mb-2 align-items-center "}>
        <Row className={"mt-3 text-bg-white "}>
            <Col lg={3} className={"fw-bold"}>Title of Post</Col>
            <Col lg={2}><small>@username</small></Col>
            <Col lg={2}><span className={"px-2 rounded-pill text-bg-primary"}>March 10</span></Col>
            <Col lg={1}><span className={"px-2 rounded-pill text-bg-info"}>No</span></Col>
            <Col>
                <Button className={"me-2"}>View</Button>
                <Button onClick={()=>{setShowPostDelete(true)}} className={"text-bg-danger"}>Delete</Button>
                <Modal show={showPostDelete} onHide={()=>{setShowPostDelete(false)}} >
                    <Modal.Header>Delete Post</Modal.Header>
                    <Modal.Body>
                        <p>This will remove the post completely from the system. Proceed?</p>
                        <Button className={"me-2 text-bg-warning"}>Confirm</Button>
                        <Button onClick={()=>{setShowPostDelete(false)}}>Cancel</Button>
                    </Modal.Body>
                </Modal>
            </Col>
        </Row>

    </ListGroup.Item>;
}

export default function Admin() {

    const [users, setUsers] = useState([])
    const [keyword, setKeyword] = useState('')
    
    const [showUsers, setShowUsers] = useState(false)
    const [showPosts, setShowPosts] = useState(false)

    useEffect(() => {
        console.log(keyword)
        fetch(`http://localhost:4000/admin/getUsers/${keyword !== '' ? keyword : 'empty'}`,
        {method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        }
        )
        .then(res => res.json())
        .then(data => {
            setUsers(data.map(user => {
                return <UserManagementItem key={user.user_id} userProp= {user} />            
            }))
    })
    }, [keyword])

    return (
        <>
            <Container fluid>
                <Row className='d-flex flex-row'>
                    <Col lg={2} className=''>
                        <AppNavbar/>
                    </Col>


                    <Col lg={10}>
                        <Container className={"text-bg-light rounded-2 px-2 py-3 my-4"}>
                            <div className={"d-flex flex-row flex-nowrap justify-content-between"}>
                                <Link to={""} onClick={()=>{setShowUsers(!showUsers)}}>
                                    <h5 >
                                        User Management
                                        {showUsers ? <i className="bi bi-caret-up-fill"></i> : <i className="bi bi-caret-right-fill"></i>}
                                    </h5>
                                </Link>
                                <Form className={"d-flex flex-row flex-nowrap mb-4"} >
                                    <Form.Control 
                                    placeholder={"search by username"}
                                    onChange={e => setKeyword(e.target.value)}
                                    />
                                </Form>
                            </div>
                            <Collapse in={showUsers}>
                                <ListGroup>
                                    <Row className={"px-3"}>
                                        <Col lg={2}>Username</Col>
                                        <Col lg={2}>Role</Col>
                                        <Col>Actions</Col>
                                    </Row>
                                    {users}
                                </ListGroup>
                            </Collapse>
                        </Container>
                        <Container className={"text-bg-light rounded-2 px-2 py-3 my-4"}>


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