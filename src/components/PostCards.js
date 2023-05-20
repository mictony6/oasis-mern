
import '../index.css';
import { useState, useEffect, useContext } from 'react';
import {Container, Col, Row, Dropdown, Image, Button} from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive'
import user_placeholder from '../static/images/profile_pic_placeholder.svg'
import placeholder from '../static/images/profile1.svg';
import TextareaAutosize from 'react-textarea-autosize';
import {Link} from "react-router-dom";
import Swal from 'sweetalert2'
import DropdownItem from "react-bootstrap/DropdownItem";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import person_add from "../static/images/person/person-add.svg";
import person_remove from "../static/images/person/person-dash.svg";
import flag from "../static/images/flag.svg";
import x_circle from "../static/images/x-circle.svg";
import UserContext from '../UserContext';
import { addContact, blockContact, removeContact, unblockContact } from '../functions/contactFunctions';
import { PostContext } from '../PostContext';
import dayjs from 'dayjs';
import * as PropTypes from "prop-types";



export default function PostCards({postProp, minimize}) {

    const { updatePost } = useContext(PostContext);

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    })

    const isLandscape = useMediaQuery({ query: '(orientation: landscape)' })

    const [love, setLove] = useState(false)
    const [comment, setComment] = useState("")
    const [active, setActive] = useState(false)
    const [count, setCount] = useState("")
    const [status, setStatus] = useState("INACTIVE")
    const [blocked_by, setBlockedBy] = useState(null)

    const { post_id, subject, content, username, date_posted, user_id } = postProp
    const { user } = useContext(UserContext)

    const relativeTime = require('dayjs/plugin/relativeTime')
    dayjs.extend(relativeTime)

    const time = dayjs(date_posted).fromNow()

    useEffect(() => {
        if(user_id !== user.id) {
            fetch(`http://127.0.0.1:4000/contact/view/${user_id}`, {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            }).then(res => res.json())
            .then(data => {
                if(data.length !== 0) {
                    setStatus(data[0].status)
                    data[0].blocked_by !== null ? setBlockedBy(data[0].blocked_by) : setBlockedBy(null)
                }
        })
        }

        fetch(`http://127.0.0.1:4000/post/checkLike/${post_id}`,
        {method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        }
        )
        .then(res => res.json())
        .then(data => {
            data.length !== 0 ? setLove(true) : setLove(false)
        })

        fetch(`http://127.0.0.1:4000/post/countLikes/${post_id}`, {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            }).then(res => res.json())
            .then(data => {
                data[0].count !== 0 ? setCount(data[0].count) : setCount("")
        })

        comment !== '' ? setActive(true) : setActive(false)
        updatePost(post_id, { love, comment, count, user_id, blocked_by });

    }, [post_id, comment, count, love, user_id, user.id, blocked_by, status, updatePost])

    function likePost(e) {
        e.preventDefault()

        fetch(`http://127.0.0.1:4000/post/like/${post_id}`, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        }).then(res => res.json())
        .then(data => {
            data ? setLove(true) : setLove(false)
        })
    }

    function unlikePost(e) {
        e.preventDefault()

        fetch(`http://127.0.0.1:4000/post/unlike/${post_id}`, {
        method : 'DELETE',
        headers : {
            'Content-Type' : 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        }).then(res => res.json())
        .then(data => {
            data ? setLove(false) : setLove(true)
        })
    }



    function reply(e) {
        e.preventDefault()

        fetch(`http://127.0.0.1:4000/post/comment/${post_id}`, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                content: comment
            })
            }).then(res => res.json())
            .then(data => {
                data ?
                Swal.fire({
                    title: "Reply Sent!",
                    icon: "success",
                    text: "Thanks for sharing your thoughts!",
                    iconColor: '#3A3530',
                    color: '#3A3530',
                    confirmButtonText: "OK",
                    buttonsStyling: false,
                    customClass: {
                        confirmButton: 'button2'
                    }
                })
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
        setComment("");
    }

    function add(e){
        e.preventDefault()
        setStatus(addContact(user_id))
    }

    function remove(e){
        e.preventDefault()
        setStatus(removeContact(user_id))
    }
    
    function block(e){
        setStatus(blockContact(user_id))
    }

    function unblock(e){
        e.preventDefault()
        setStatus(unblockContact(user_id))
    }

    function editPost(e) {
        e.preventDefault()
    }

    function deletePost(e) {
        e.preventDefault()
    }

    return (
            <Container className={"my-3"}>
                <Col className={"bg-light rounded-4 p-3"}>
                    <Row className={"align-items-center flex-nowrap p-1"}>
                        <Col lg={2} ></Col>
                        <Col lg={8}>
                            <h5 className={"fw-bold"}>{subject}</h5>
                        </Col>
                        <Col lg={2} className={"d-flex flex-row flex-nowrap align-items-center justify-content-end "}>
                            {minimize ?
                                <Link to={`/post/${post_id}`}>
                                    <i className="bi bi-arrows-expand"></i>
                                </Link>
                                :
                                <Link to={`/home`}>
                                    <i className="bi bi-arrow-return-left"></i>
                                </Link>
                            }

                            <Dropdown className={"dropstart"}>
                                <Button type="button" className=" post-options border-0 " data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                    <i className="bi bi-three-dots-vertical"></i>
                                </Button>
                                <ul className="dropdown-menu">
                                    <Dropdown.Header>post</Dropdown.Header>
                                    <DropdownItem onClick={editPost} className={"ps-4"}>
                                        <i className="bi bi-pencil-square pe-3"></i>Edit
                                    </DropdownItem>
                                    <DropdownItem onClick={deletePost} className={"ps-4"}>
                                        <i className="bi bi-trash-fill pe-3"></i>Delete
                                    </DropdownItem>

                                </ul>
                            </Dropdown>
                        </Col>
                    </Row>
                    <Row className={" flex-nowrap  p-1"}>
                        <Col lg={2} className={"d-flex flex-column align-items-center "}>
                            <Image src={placeholder} className={"img-fluid"}></Image>
                            <Dropdown>
                                <DropdownToggle className={"username"}>
                                    @{username}
                                </DropdownToggle>

                                {user.id !== user_id ?
                                    <DropdownMenu>
                                        {/*TODO: get user_id from prop*/}
                                        <DropdownItem as={Link} to={`/user/${user_id}`} className={"ps-4"}><i
                                            className="bi bi-person-fill pe-3"></i>View Profile</DropdownItem>
                                        <Dropdown.Header>contact</Dropdown.Header>
                                        {status === "INACTIVE" &&
                                            <DropdownItem className={"ps-4"} onClick={add}><i className={"bi bi-person-add pe-3"}></i>Add</DropdownItem>}

                                        {status === "ACTIVE" && <DropdownItem onClick={remove} className={"ps-4"}><i
                                            className={"bi bi-person-remove pe-3"}></i>Remove</DropdownItem>}

                                        {status !== "BLOCKED" &&
                                            <DropdownItem onClick={block} className={"ps-4"}><i className="bi bi-x-circle pe-3"></i>Block</DropdownItem>}

                                        <Dropdown.Header>post</Dropdown.Header>
                                        <DropdownItem onClick={""} className={"ps-4"}><i className="bi bi-flag pe-3"></i>Flag</DropdownItem>
                                    </DropdownMenu>
                                    :
                                    <DropdownMenu>
                                        {/*TODO: get user_id from prop*/}
                                        <DropdownItem as={Link} to={`/user/${user_id}`} className={"ps-4"}><Image src={person_add}
                                                                                                                 className={"pe-3"}></Image>View
                                            Profile</DropdownItem>
                                    </DropdownMenu>
                                }
                            </Dropdown>
                            <p className={"text-muted"}><small>{time}</small></p>
                        </Col>
                        <Col lg={8}>

                            <p className={minimize ? 'post-content-preview' : 'post-content-text'}>
                                {content}
                            </p>
                        </Col>
                    </Row>
                    <Row className={"align-items-center flex-nowrap  p-1"}>
                        <Col lg={2}>
                            {love ?
                                <div
                                    className='d-flex flex-row justify-content-center mt-auto pb-1 align-items-center post-likes'
                                    onClick={unlikePost}>
                                    <Button className={"border-0 text-danger"}><i
                                        className={"bi bi-heart-fill"}></i> {count}</Button>
                                </div> :
                                <div
                                    className='d-flex justify-content-center mt-auto pb-1 align-items-center post-likes'
                                    onClick={likePost}>
                                    <Button className={"border-0 text-secondary"}><i
                                        className={"bi bi-heart"}></i> {count}</Button>
                                </div>
                            }
                        </Col>
                        <Col lg={8}>
                            <TextareaAutosize
                                className='comment-box'
                                placeholder='What are your thoughts?'
                                onChange={e => setComment(e.target.value)}
                                value={comment}
                            />
                        </Col>
                        <Col>
                            <Button className=' d-flex flex-row flex-nowrap p-2 rounded-5 comment-button'
                                    onClick={reply} disabled={!active}>
                                <i className={"bi bi-reply me-2"}></i>
                                Reply
                            </Button>
                        </Col>

                    </Row>
                </Col>
            </Container>
    )
}