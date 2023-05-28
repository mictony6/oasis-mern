import {Button, Container, Image, ListGroup} from "react-bootstrap";
import placeholder from "../../static/images/profile_pic_placeholder.svg";
import {Link, useLocation, useNavigate} from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../UserContext";
import dayjs from "dayjs";

export default function UserPostItem({postProp}){

    const { user } = useContext(UserContext)

    const { post_id, subject, content, date_posted, user_id, username } = postProp

    const [love, setLove] = useState(false)
    const [count, setCount] = useState("")

    const relativeTime = require('dayjs/plugin/relativeTime')
    dayjs.extend(relativeTime)

    const time = dayjs(date_posted).fromNow()

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

    }, [post_id, count, love, user_id, user.id, subject, content])

    return(
        <ListGroup.Item className={"p-3 pb-0"}>
            <Link to={""} className={"text-decoration-none"}>
            <div className={"d-flex align-items-center"}>
                <div className={"pe-3 ps-2 text-center"}>
                    <Button className={"bg-light"}><i className={"bi bi-heart"}></i></Button>
                    <span>{count}</span>
                </div>
                <div >
                    <Image src={placeholder}></Image>
                </div>
                <Container className={"d-flex flex-column"}>
                    <h6>{subject}</h6>
                    <p className={"text-muted"}><small>Posted by @{username} <i className={"bi bi-dot"}></i>{time}</small></p>
                    <Container fluid >
                        <div className={"d-flex flex-grow-1 py-2 align-items-baseline"}>
                            <Link to={`/post/${post_id}`}><i className={"bi bi-arrows-angle-expand "}></i></Link>
                            <Button className={"me-2 bg-light"}><i className={"bi bi-pencil "}></i> Edit</Button>
                            <Button className={"me-2 bg-light"}><i className={"bi bi-trash "}></i> Delete</Button>

                            <div className={"flex-grow-1"}></div>
                        </div>
                    </Container>
                </Container>

            </div>
            </Link>
        </ListGroup.Item>
    );
}