import {Button, Container, Image, ListGroup} from "react-bootstrap";
import placeholder from "../../static/images/profile_pic_placeholder.svg";
import {Link} from "react-router-dom";

export default function UserPostItem(){
    return(
        <ListGroup.Item className={"p-3 pb-0"}>
            <Link to={""} className={"text-decoration-none"}>
            <div className={"d-flex align-items-center"}>
                <div className={"pe-3 ps-2 text-center"}>
                    <Button className={"bg-light"}><i className={"bi bi-heart"}></i></Button>
                    <span>3</span>
                </div>
                <div >
                    <Image src={placeholder}></Image>
                </div>
                <Container className={"d-flex flex-column"}>
                    <h6>Lengthy post topic/title.</h6>
                    <p className={"text-muted"}><small>Posted by @MicTony <i className={"bi bi-dot"}></i> 2 months ago</small></p>
                    <Container fluid >
                        <div className={"d-flex flex-grow-1 py-2 align-items-baseline"}>
                            <Button className={"me-2 bg-light"}><i className={"bi bi-arrows-angle-expand "}></i></Button>
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