import { useState } from "react";
import { useEffect } from "react";
import { Button, Container, ListGroup } from "react-bootstrap";
import dayjs from "dayjs";
import {useTranslation} from "react-i18next";

const UserCommentItem = ({commentProp}) => {

    const { c_id, content, date_time, user_id, username, p_id } = commentProp
    const [title, setTitle] = useState(null)

    const [love, setLove] = useState(false)
    const [count, setCount] = useState("")

    const relativeTime = require('dayjs/plugin/relativeTime')
    dayjs.extend(relativeTime)

    const time = dayjs(date_time).fromNow()

    useEffect(() => {
        fetch(`http://localhost:4000/post/view/${p_id}`,
        {method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        }
        )
        .then(res => res.json())
        .then(data => {
            setTitle(data[0].subject)
        })

        fetch(`http://127.0.0.1:4000/post/comment/checkLike/${c_id}`,
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

        fetch(`http://127.0.0.1:4000/post/comment/countLikes/${c_id}`, {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            }).then(res => res.json())
            .then(data => {
                data[0].count !== 0 ? setCount(data[0].count) : setCount("")
        })
    })

    function likeComment(e) {
        e.preventDefault()

        fetch(`http://127.0.0.1:4000/post/comment/like/${c_id}`, {
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

        fetch(`http://127.0.0.1:4000/post/comment/unlike/${c_id}`, {
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

    const {t, i182} = useTranslation()

    return ( 
        <>
            <ListGroup.Item className={"p-3 pb-0"}>
                <div className="text-decoration-none mt-1">
                        <Container className="py-0 my-0">
                            <div className="d-flex flex-wrap">
                                <i className="bi bi-chat pe-3"></i>
                                <div className={""}><p>@{username} <span className="text-muted"> {t('user.comment.source')} <a href = {`/post/${p_id}`}>{title}</a></span></p></div>
                                <Container className={"d-flex w-100 p-2 mb-1"}>
                                {love ?
                                <div className={"pe-3 ps-2 text-center"} onClick={unlikeComment}>
                                    <Button className={"bg-light border-0 text-danger"}><i className={"bi bi-heart-fill"}></i></Button>
                                    <span>{count}</span>
                                </div>
                                :
                                <div className={"pe-3 ps-2 text-center"} onClick={likeComment}>
                                    <Button className={"bg-light border-0 text-secondary"}><i className={"bi bi-heart"}></i></Button>
                                    <span>{count}</span>
                                </div>
                                }
                                    <div className={"pe-2 border-start"}></div>
                                    <div className={"pe-2 border-start"}></div>
                                    <div>
                                        <div><span className={"fw-bold"}>{username}</span> {count ? count : 0} likes | {time} </div>
                                        <div>
                                            {content}
                                        </div>
                                    </div>
                                </Container>
                            </div>
                        </Container>
                </div>
            </ListGroup.Item>
        </>
    );
}
 
export default UserCommentItem;