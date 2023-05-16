
import '../index.css';
import { useState, useEffect } from 'react';
import {Container, Col, Row, Dropdown, Image, Button} from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive'
import placeholder from '../static/images/profile_pic_placeholder.svg'
import heart from '../static/images/love.svg'
import activeHeart from '../static/images/love-active.svg'
import expand from '../static/images/expand.svg'
import back from '../static/images/back.svg'
import TextareaAutosize from 'react-textarea-autosize';
import {Link} from "react-router-dom";
import Swal from 'sweetalert2'
import DropdownItem from "react-bootstrap/DropdownItem";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import add from "../static/images/person/person-add.svg";
import remove from "../static/images/person/person-dash.svg";
import flag from "../static/images/flag.svg";
import x_circle from "../static/images/x-circle.svg";

export default function PostCards({postProp, minimize}) {

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    })

    const hdate = require('human-date')

    const isLandscape = useMediaQuery({ query: '(orientation: landscape)' })

    const [love, setLove] = useState(false)
    const [comment, setComment] = useState("")
    const [active, setActive] = useState(false)
    const [count, setCount] = useState("")

    const { post_id, subject, content, username, date_posted } = postProp

    const time = hdate.relativeTime(date_posted)

    useEffect(() => {
        fetch(`http://localhost:4000/post/checkLike/${post_id}`,
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

        fetch(`http://localhost:4000/post/countLikes/${post_id}`, {
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
    }, [post_id, comment, count, love])

    function likePost(e) {
        e.preventDefault()

        fetch(`http://localhost:4000/post/like/${post_id}`, {
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

        fetch(`http://localhost:4000/post/unlike/${post_id}`, {
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

        fetch(`http://localhost:4000/post/comment/${post_id}`, {
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

    function editPost(e) {
        e.preventDefault()
    }

    function deletePost(e) {
        e.preventDefault()
    }

    return (
        <Container fluid className='pt-2 pb-4'>
            <Container className=' d-flex flex-row  my-1 p-3 rounded-5 bg-secondary '>
                <Col lg={2} className='post-content-col d-flex flex-column align-items-center'>
                    <Row className='d-flex justify-content-center mt-2'>
                        <img src={placeholder} alt='profile' className='post-profile-img'/>
                    </Row>
                    <Row className='d-flex flex-nowrap  justify-content-center post-username pt-2   '>
                        <Dropdown>

                                <DropdownToggle className={"username  "}>
                                    @{username}

                                </DropdownToggle>
                                <DropdownMenu  >
                                    <Dropdown.Header>contact</Dropdown.Header>
                                    <DropdownItem href="/addContact/:contact_person_id"  className={"ps-4"}><Image src={add} className={"pe-3"}></Image>Add</DropdownItem>
                                    <DropdownItem href="#/action-2" className={"ps-4"}><Image src={remove} className={"pe-3"}></Image>Remove</DropdownItem>
                                    <DropdownItem href="#/action-2" className={"ps-4"}><Image src={x_circle} className={"pe-3"}></Image>Block</DropdownItem>
                                    <Dropdown.Header>post</Dropdown.Header>
                                    <DropdownItem href="#/action-3" className={"ps-4"}><Image src={flag} className={"pe-3"}></Image>Flag</DropdownItem>

                                </DropdownMenu>

                        </Dropdown>

                    </Row>
                    <Row className='d-flex justify-content-center post-date-time'>
                        {time}
                    </Row>

                    {/*love icon*/}
                    {love ?
                    <Row className='d-flex flex-row justify-content-center mt-auto pb-1 align-items-center post-likes' onClick={unlikePost}>
                        {/*<img src={activeHeart} alt="Unlove a post" className='post-heart'/>*/}
                        <Button className={"border-0 text-danger"}><i className={"bi bi-heart-fill"}></i> {count}</Button>
                        {/*{count}*/}
                    </Row> :
                    <Row className='d-flex justify-content-center mt-auto pb-1 align-items-center post-likes' onClick={likePost}>
                        {/*<img*/}
                        {/*    src={heart}*/}
                        {/*    alt="Love a post"*/}
                        {/*    className='post-heart'*/}
                        {/*/>*/}
                        <Button className={"border-0 text-secondary"}><i className={"bi bi-heart"}></i> {count}</Button>

                    {/*{count}*/}
                    </Row>
                    }

                </Col>
                <Col lg={9} className='post-content-col d-flex flex-column'>
                    <Row className='d-flex justify-content-flex-start mt-2 ms-2'>
                        <p className='post-title'>{subject}</p>
                    </Row>
                    <Row className='d-flex justify-content-flex-start mt-0 pt-0 ms-2 post-content-text-container-full'>
                        <p className={minimize ? 'post-content-preview' : 'post-content-text'}>
                            {content}
                        </p>
                    </Row>
                    <Row className='d-flex justify-content-flex-start mt-auto pt-0 ms-2 post-content-text-container'>
                        <TextareaAutosize
                            className='comment-box'
                            placeholder='What are your thoughts?'
                            onChange = {e => setComment(e.target.value)}
                            value={comment}
                        />
                    </Row>
                </Col>

                <Col className='post-content-col d-flex flex-column align-items-center'>
                    <div className={"d-flex flex-row flex-nowrap align-items-center"}>
                        {minimize ?
                            <Link to={`/post/${post_id}`} >
                                <i className="bi bi-arrows-expand"></i>
                        </Link>
                        :
                        <Link to={`/home`} >
                            <i className="bi bi-arrow-return-left"></i>
                        </Link>
                        }

                        <Dropdown className={"dropstart"}>
                            <Button type="button" className=" post-options border-0 " data-bs-toggle="dropdown" aria-expanded="false">
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

                    </div>

                    <Row className='ms-2 mt-auto'>

                        <Button className='comment-button p-2 rounded-5' onClick={reply} disabled={!active}>
                            Reply
                        </Button>

                    </Row>
                </Col>
            </Container>
        </Container>
    )
}