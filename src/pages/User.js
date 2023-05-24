import {
    Col,
    Container,
    Row,
    Image,
    Tabs,
    Tab, Button, NavItem, Nav, ListGroup
} from 'react-bootstrap';
import { useParams} from "react-router-dom";
import AppNavbar from '../components/AppNavbar';
import placeholder from '../static/images/profile_pic_placeholder.svg';
import UserOverview from "../components/user/UserOverview";
import profile_banner from "../static/images/bg.png"
import PostMinimal from "../components/PostMinimal";


export default function User() {

    const { user_id } = useParams();

    return(
        <Container fluid>
            <Row className='d-flex flex-row'>
                <Col lg={2} className=''>
                    <AppNavbar/>
                </Col>
                <Col className={'my-4 '}>
                    <Row className={'w-100 my-4 rounded-4 bg-light'}>
                        <Tabs >
                            <Tab eventKey={"overview"} title={"Overview"}  >
                                <UserOverview/>
                            </Tab>
                            <Tab title={"Posts"} eventKey={"posts"}>
                                <ListGroup>
                                    <PostMinimal/>
                                    <PostMinimal/>
                                    <PostMinimal/>
                                    <PostMinimal/>
                                </ListGroup>
                            </Tab>
                            <Tab title={"Comments"} eventKey={"comments"}></Tab>
                            <Tab title={"Contacts"} eventKey={"contacts"}></Tab>
                            <Tab title={"Likes"} eventKey={"likes"}></Tab>
                        </Tabs>
                    </Row>
                </Col>
                <Col lg={3} >
                    {/*profile options*/}
                    <Container fluid className={"d-flex flex-column my-4 "}>
                        <div className={"bg-white border border-1 rounded-4 px-2 py-3 position-relative"}>
                            <Container>
                                <div className={"profile-banner overflow-hidden "}>
                                    <label>
                                    <Image src={profile_banner} className={"w-100 h-auto"}/>
                                    </label>
                                </div>
                                <Container fluid className={"position-relative text-center"}>
                                    <Image src={placeholder} className={"profile-pic"}/>
                                </Container>
                                <h5 className={"text-center py-1"}>@Mic Tony</h5>
                                <p className={"text-center "}><small >user/mictony - 3yrs</small></p>
                                <Button className={"d-flex align-items-center justify-content-between w-100 border-0"}>
                                    <i className={"bi bi-pen"}></i>
                                    Edit Profile
                                    <div></div>

                                </Button>
                                <Container fluid className={"my-1"}></Container>
                                <Container fluid className={"d-flex flex-row flex-wrap p-1 "}>
                                    <div className={"mb-2 flex-grow-1"}>
                                        <h6>Likes</h6>
                                        <div className={"d-flex aligns-items-center mt-1"}>
                                            <i className={"bi bi-hearts me-1"}></i>
                                            <span><small>100</small></span>
                                        </div>
                                    </div>
                                    <div className={"mb-2 flex-grow-1"}>
                                        <h6>User Day</h6>
                                        <div className={"d-flex aligns-items-center mt-1"}>
                                            <i className={"bi bi-calendar-event me-1"}></i>
                                            <span><small>July 4, 2002</small></span>

                                        </div>
                                    </div>
                                </Container>
                                <Nav>
                                    <NavItem className={"d-flex"}>
                                        <Button as={"li"} className={" d-flex align-items-center px-2 py-1 me-2"} >
                                            <i className={"bi bi-plus"}></i>
                                            Add social link
                                        </Button>
                                    </NavItem>
                                </Nav>
                                    <Button className={"w-100 mt-2"}>New Post</Button>
                            </Container>
                        </div>
                    </Container>


                    {/*bio*/}
                    <Container fluid className={"d-flex flex-column my-4"}>
                        <div className={"bg-light border border-1 rounded-4 px-2 py-3"}>
                            <Container className={"pt-0 d-flex"}>
                                <div className={"pt-3"}>
                                    <h6>Bio</h6>
                                </div>
                            </Container>
                            <Container>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis sagittis magna. Nullam in leo et eros interdum bibendum. Integer est risus, semper a quam.
                                </p>
                            </Container>
                        </div>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}