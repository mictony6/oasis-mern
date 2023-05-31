import {Col, Container, ListGroupItem, Row, Image, Button, Dropdown} from "react-bootstrap";
import user_placeholder from '../static/images/profile_pic_placeholder.svg'
import placeholder from '../static/images/profile1.svg';
import heart from '../static/images/love.svg'
import activeHeart from '../static/images/love-active.svg'
import { useState, useEffect, useContext } from "react";
import dayjs from "dayjs";
import UserContext from "../UserContext";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import DropdownItem from "react-bootstrap/DropdownItem";
import {Link} from "react-router-dom";
import person_add from "../static/images/person/person-add.svg";
import { addContact, blockContact, removeContact } from "../functions/contactFunctions";

export default function CommentItem({commentProp}){

    const { user } = useContext(UserContext)
    const {comment_id, username, user_id, content, date_commented } = commentProp

    const relativeTime = require('dayjs/plugin/relativeTime')
    dayjs.extend(relativeTime)

    const time = dayjs(date_commented).fromNow()

    const [love, setLove] = useState(false)
    const [count, setCount] = useState("")

    const [status, setStatus] = useState("INACTIVE")

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
        body: JSON.stringify({
            comment_user_id: user_id
        })
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

    // contact functions
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

    return(
        <>
        <ListGroupItem className={"bg-transparent border-0"}>
            <div className={"bg-light rounded-4 border border-1 "}>
                <Container className={"d-flex py-4 px-3"}>
                    <div className={"d-flex flex-column align-items-center justify-content-between col-2 pe-0"}>
                        <Image src={user.id === user_id ? user_placeholder : placeholder} className={"img-fluid"}></Image>

                        <Dropdown>
                            <DropdownToggle className={"username mt-1"}>
                                @{username}
                            </DropdownToggle>

                            {user.id !== user_id ?
                                    <DropdownMenu>
                                        {/*TODO: get user_id from prop*/}
                                        <DropdownItem as={Link} to={`/user/${user_id}`} className={"ps-4"}><i
                                            className="bi bi-person-fill pe-3"></i>View Profile</DropdownItem>
                                        <Dropdown.Header>contact</Dropdown.Header>
                                        {(status === "INACTIVE") &&
                                            <DropdownItem className={"ps-4"} onClick={add}><i className={"bi bi-person-add pe-3"}></i>Add</DropdownItem>}

                                        {status === "ACTIVE" && <DropdownItem onClick={remove} className={"ps-4"}><i
                                            className={"bi bi-person-dash pe-3"}></i>Remove</DropdownItem>}

                                        {status !== "BLOCKED" &&
                                            <DropdownItem onClick={block} className={"ps-4"}><i className="bi bi-x-circle pe-3"></i>Block</DropdownItem>}

                                        <Dropdown.Header>post</Dropdown.Header>
                                        <DropdownItem onClick={""} className={"ps-4"}><i className="bi bi-flag pe-3"></i>Flag</DropdownItem>
                                    </DropdownMenu>
                                    :
                                    <DropdownMenu>
                                        {/*TODO: get user_id from prop*/}
                                        <DropdownItem as={Link} to={`/user/${user_id}`} className={"ps-4"}><Image src={person_add}                                                                         className={"pe-3"}></Image>View
                                            Profile</DropdownItem>
                                    </DropdownMenu>
                                }
                        </Dropdown>
                        <p><small className={'text-muted '}>{time}</small></p>
                    </div>

                    <div className={"d-flex flex-column align-items-start justify-content-between p-2 pe-0 flex-grow-1"}>
                        {content}
                    </div>

                    <div className={"d-flex flex-column align-items-end justify-content-between p-2 pe-0 "}>
                        <Dropdown className={"dropstart"}>
                            <Button type="button" className=" post-options border-0 " data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                <i className="bi bi-three-dots-vertical"></i>
                            </Button>
                            {user.id === user_id ?
                                <ul className="dropdown-menu">
                                    <DropdownItem  className={"ps-4"}>
                                        <i className="bi bi-pencil-square pe-3"></i>Edit
                                    </DropdownItem>
                                    <DropdownItem  className={"ps-4"}>
                                        <i className="bi bi-trash-fill pe-3"></i>Delete
                                    </DropdownItem>
                                </ul>
                                :
                                <ul className="dropdown-menu">
                                    <DropdownItem onClick={""} className={"ps-4"}>
                                        <i className="bi bi-flag pe-3"/>Report
                                    </DropdownItem>
                                </ul>
                            }
                        </Dropdown>
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

                    </div>

                </Container>
            </div>

        </ListGroupItem>
        </>
    );
}