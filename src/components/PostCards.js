
import '../index.css';
import { useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive'
import placeholder from '../static/images/profile_pic_placeholder.svg'
import heart from '../static/images/love.svg'
import activeHeart from '../static/images/love-active.svg'
import expand from '../static/images/expand.svg'
import TextareaAutosize from 'react-textarea-autosize';
import {Link} from "react-router-dom";


export default function PostCards() {
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    })

    const isLandscape = useMediaQuery({ query: '(orientation: landscape)' })

    const [love, setLove] = useState(false)

    const handleUnlove = () => setLove(false);
    const handleLove = () => setLove(true);

    return (
        <Container fluid>
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
                        @username
                    </Row>
                    <Row className='d-flex justify-content-center post-date-time'>
                        Date Time
                    </Row>
                    {love ? <Row className='d-flex justify-content-center mt-auto pb-1' onClick={handleUnlove}>
                        <img
                            src={activeHeart}
                            alt="Unlove a post"
                            className='post-heart'
                        />
                    </Row>
                        :
                        <Row className='d-flex justify-content-center mt-auto pb-1' onClick={handleLove}>
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
                        <p className='post-title'>Subject</p>
                    </Row>
                    <Row className='d-flex justify-content-flex-start mt-0 pt-0 ms-2 post-content-text-container'>
                        <p className='post-content-text'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ultrices ut mi nec cursus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis quis ipsum vel urna pretium luctus venenatis quis justo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod varius felis. Phasellus at nisi purus. In euismod neque at aliquam ultricies.
                            <br /><br />
                            Mauris sagittis porttitor massa sit amet auctor. Curabitur a euismod elit, quis faucibus justo. Aenean cursus dui quam, non venenatis elit rutrum egestas. Sed nec leo lacinia elit eleifend elementum. Vestibulum quis sem id metus blandit faucibus a eget neque. Morbi auctor tempus suscipit. Proin mi quam, tempus eu volutpat in, commodo eget massa. Sed sit amet nunc pretium, tristique ligula id, interdum justo.
                        </p>
                    </Row>
                    <Row className='d-flex justify-content-flex-start mt-auto pt-0 ms-2 post-content-text-container'>
                        <TextareaAutosize
                            className='comment-box'
                            placeholder='What are your thoughts?'
                        />
                    </Row>
                </Col>
                <Col xs={1} className='post-content-col d-flex flex-column align-items-center'>
                    <Row className='ms-3'>
                        {/* TODO: make postID connect to backend*/}
                       <Link to={"/post/someID"} className='expand-button'> <img
                            src={expand}
                            alt="Expand post"

                        />
                       </Link>
                    </Row>
                    <Row className='ms-2 mt-auto'>
                        <button className='comment-button'>
                            Reply
                        </button>
                    </Row>
                </Col>
            </Container>
        </Container>
    )
}