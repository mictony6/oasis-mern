import {Col, Container, ListGroupItem, Row, Image, Button} from "react-bootstrap";
import user_placeholder from '../static/images/profile_pic_placeholder.svg'
import placeholder from '../static/images/profile1.svg';
import heart from '../static/images/love.svg'
import activeHeart from '../static/images/love-active.svg'
import { useState, useEffect, useContext } from "react";
import dayjs from "dayjs";
import UserContext from "../UserContext";

export default function CommentItem({commentProp}){

    const { user } = useContext(UserContext)
    const {comment_id, username, user_id, content, date_commented } = commentProp

    const relativeTime = require('dayjs/plugin/relativeTime')
    dayjs.extend(relativeTime)

    const time = dayjs(date_commented).fromNow()

    const [love, setLove] = useState(false)
    const [count, setCount] = useState("")
    
    useEffect(() => {
        fetch(`http://127.0.0.1:4000/post/comment/checkLike/${comment_id}`,
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

        fetch(`http://127.0.0.1:4000/post/comment/countLikes/${comment_id}`, {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            }).then(res => res.json())
            .then(data => {
                data[0].count !== 0 ? setCount(data[0].count) : setCount("")
        })

    }, [comment_id, love, count])

    function likeComment(e) {
        e.preventDefault()

        fetch(`http://127.0.0.1:4000/post/comment/like/${comment_id}`, {
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

    function unlikeComment(e) {
        e.preventDefault()

        fetch(`http://127.0.0.1:4000/post/comment/unlike/${comment_id}`, {
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

    return(
        <ListGroupItem className={'bg-light border-0 border-bottom'}>
            <Row className={'d-flex flex-row align-items-center'}>
                <Col className={'col-2 d-flex flex-column align-items-center '}>
                    <Image src={user.id === user_id ? user_placeholder : placeholder}></Image>
                    <div className={'fw-bold'}>@{username}</div>
                    <p><small className={'text-muted '}>{time}</small></p>
                </Col>
                <Col >
                    {content}
                </Col>
                <Col className={'col-2 text-center'}>
                {love ?
                    <div
                        className='d-flex flex-row justify-content-center mt-auto pb-1 align-items-center post-likes'
                        onClick={unlikeComment}>
                        <Button className={"border-0 text-danger"}><i
                            className={"bi bi-heart-fill"}></i> {count}</Button>
                    </div> :
                    <div
                        className='d-flex justify-content-center mt-auto pb-1 align-items-center post-likes'
                        onClick={likeComment}>
                        <Button className={"border-0 text-secondary"}><i
                            className={"bi bi-heart"}></i> {count}</Button>
                    </div>
                }
                </Col>
            </Row>
        </ListGroupItem>
    );
}