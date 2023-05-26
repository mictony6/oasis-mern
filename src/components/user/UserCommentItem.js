import { Container, ListGroup } from "react-bootstrap";

const UserCommentItem = () => {
    return ( 
        <>
            <ListGroup.Item className={"p-3 pb-0"}>
                <div className="text-decoration-none mt-1">
                        <Container className="py-0">
                            <div className="d-flex align-items-center">
                                <i className="bi bi-chat pe-3"></i>
                                <span><p>@mictony commented on <span className="fw-bold">Post title</span></p></span>

                            </div>
                        </Container>
                </div>
            </ListGroup.Item>
        </>
     );
}
 
export default UserCommentItem;