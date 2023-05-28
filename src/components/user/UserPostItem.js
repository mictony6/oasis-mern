import {Button, Container, Image, ListGroup} from "react-bootstrap";
import placeholder from "../../static/images/profile_pic_placeholder.svg";
import {Link, useLocation, useNavigate} from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../UserContext";
import dayjs from "dayjs";

export default function UserPostItem({postProp}){

    const { user } = useContext(UserContext)

    const { p_id, subject, content, date_time, user_id, username } = postProp

    const [love, setLove] = useState(false)
    const [count, setCount] = useState("")

    const relativeTime = require('dayjs/plugin/relativeTime')
    dayjs.extend(relativeTime)

    const time = dayjs(date_time).fromNow()

    useEffect(() => {
        fetch(`http://localhost:4000/post/checkLike/${p_id}`,
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

        fetch(`http://localhost:4000/post/countLikes/${p_id}`, {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            }).then(res => res.json())
            .then(data => {
                data[0].count !== 0 ? setCount(data[0].count) : setCount("")
        })

        fetch(`http://localhost:4000/post/checkLike/${p_id}`,
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

        fetch(`http://localhost:4000/post/countLikes/${p_id}`, {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            }).then(res => res.json())
            .then(data => {
                data[0].count !== 0 ? setCount(data[0].count) : setCount("")
        })

    }, [p_id, count, love, user_id, user.id, subject, content])

    function likePost(e) {
        e.preventDefault()

        fetch(`http://localhost:4000/post/like/${p_id}`, {
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

        fetch(`http://localhost:4000/post/unlike/${p_id}`, {
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

    const navigate = useNavigate()

    function nav(link) {
        navigate(link)
    }

    return(
        <ListGroup.Item className={"p-3 pb-0"}>
            <Link to={`/post/${p_id}`} className={"text-decoration-none"}>
            <div className={"d-flex align-items-center"}>
                {love ?
                <div className={"pe-3 ps-2 text-center"} onClick={unlikePost}>
                    <Button className={"bg-light border-0 text-danger"}><i className={"bi bi-heart-fill"}></i></Button>
                    <span>{count}</span>
                </div>
                :
                <div className={"pe-3 ps-2 text-center"} onClick={likePost}>
                    <Button className={"bg-light border-0 text-secondary"}><i className={"bi bi-heart"}></i></Button>
                    <span>{count}</span>
                </div>
                }
                <div >
                    <Image src={placeholder}></Image>
                </div>
                <Container className={"d-flex flex-column"}>
                    <h6>{subject}</h6>
                    <p className={"text-muted"}><small>Posted by @{username} <i className={"bi bi-dot"}></i>{time}</small></p>
                    <Container fluid >
                        <div className={"d-flex flex-grow-1 py-2 align-items-baseline"}>
                            <Button className={"me-2 bg-light"} onClick={e => {nav(`/post/${p_id}`)}}><i className={"bi bi-arrows-angle-expand "}></i></Button>
                            <Button className={"me-2 bg-light"}><i className={"bi bi-chat "}></i> Comments</Button>
                            <Button className={"me-2 bg-light"}><i className={"bi bi-eye-slash "}></i> Hide</Button>

                            <div className={"flex-grow-1"}></div>
                        </div>
                    </Container>
                </Container>

            </div>
            </Link>
        </ListGroup.Item>
    );
}