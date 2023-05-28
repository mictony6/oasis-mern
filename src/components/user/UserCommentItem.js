import { Container, ListGroup } from "react-bootstrap";

const UserCommentItem = () => {
    return ( 
        <>
            <ListGroup.Item className={"p-3 pb-0"}>
                <div className="text-decoration-none mt-1">
                        <Container className="py-0 my-0">
                            <div className="d-flex flex-wrap">
                                <i className="bi bi-chat pe-3"></i>
                                <div className={""}><p>@mictony <span className="text-muted"> commented on {'<Post title>'}</span></p></div>
                                <Container className={"d-flex w-100 p-2 mb-1"}>
                                    <div className={"pe-2 border-start"}></div>
                                    <div className={"pe-2 border-start"}></div>
                                    <div>
                                        <div><span className={"fw-bold"}>username</span> 16 likes | 15 hours ago | <i >edited 3 mins ago </i> </div>
                                        <div>
                                            I think that this problem syhould be resolved immediately.
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