import { useContext } from "react";
import {Container} from "react-bootstrap";
import {useParams} from "react-router-dom";
import UserContext from "../UserContext";
import AddSlots from "../components/AddSlots";

export default function Therapist() {

    const { user } = useContext(UserContext);

    return(
        <Container>
            Therapist Page
            <AddSlots/>
        </Container>
    );
}