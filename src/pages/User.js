import {Container} from "react-bootstrap";
import {useParams} from "react-router-dom";



export default function User() {

    const { user_id } = useParams();

    return(
        <Container>
            This is user {user_id}
        </Container>
    );
}