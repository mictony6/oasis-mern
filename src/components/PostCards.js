
import '../index.css';
import { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive'
import placeholder from '../static/images/profile_pic_placeholder.svg'
import heart from '../static/images/love.svg'
import activeHeart from '../static/images/love-active.svg'
import expand from '../static/images/expand.svg'
import back from '../static/images/back.svg'
import TextareaAutosize from 'react-textarea-autosize';
import {Link} from "react-router-dom";
import Swal from 'sweetalert2'

export default function PostCards({postProp, minimize}) {
    
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    })

    const hdate = require('human-date')

    const isLandscape = useMediaQuery({ query: '(orientation: landscape)' })

    const [love, setLove] = useState(false)
    const [comment, setComment] = useState("")
    const [active, setActive] = useState(false)
    
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

        comment !== '' ? setActive(true) : setActive(false)
    }, [post_id, comment])

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

    return (
        <Container fluid className='pt-4'>
            <Container className=' d-flex flex-row my-1 p-3 rounded-5 bg-secondary'>
                <Col xs={2} className='post-content-col d-flex flex-column'>
                    <Row className='d-flex justify-content-center mt-2'>
                        <img
                            src={placeholder}
                            alt='profile'
                            className='post-profile-img'
                        />
                    </Row>
                    <Row className='d-flex justify-content-center post-username pt-2'>
                        @{username}
                    </Row>
                    <Row className='d-flex justify-content-center post-date-time'>
                        {time}
                    </Row>
                    {love ? <Row className='d-flex justify-content-center mt-auto pb-1' onClick={unlikePost}>
                        <img
                            src={activeHeart}
                            alt="Unlove a post"
                            className='post-heart'
                        />
                    </Row>
                        :
                        <Row className='d-flex justify-content-center mt-auto pb-1' onClick={likePost}>
                            <img
                                src={heart}
                                alt="Love a post"
                                className='post-heart'
                            />
                        </Row>
                    }
                </Col>
                <Col xs={9} className='post-content-col d-flex flex-column'>
                    <Row className='d-flex justify-content-flex-start mt-2 ms-2'>
                        <p className='post-title'>{subject}</p>
                    </Row>
                    <Row className='d-flex justify-content-flex-start mt-0 pt-0 ms-2 post-content-text-container'>
                        <p className='post-content-text'>
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
                <Col xs={1} className='post-content-col d-flex flex-column align-items-center'>
                    <Row className='ms-3'>
                        {/* TODO: make postID connect to backend*/}
                        {minimize ?
                        <Link to={`/post/${post_id}`} className='expand-button'> <img
                            src={expand}
                            alt="Expand post"
                        />
                        </Link>
                        :
                        <Link to={`/home`} className='back-button'> <img
                            src={back}
                            alt="Minimize post"
                        />
                        </Link>
                    }
                    </Row>
                    <Row className='ms-2 mt-auto'>
                        <button className='comment-button' onClick={reply} disabled={!active}>
                            Reply
                        </button>
                    </Row>
                </Col>
            </Container>
        </Container>
    )
}