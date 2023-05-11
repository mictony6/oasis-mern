import { useContext } from "react";
import {Container} from "react-bootstrap";
import {useParams} from "react-router-dom";
import UserContext from "../UserContext";
import SetAvailability from "../components/SetAvailability";

export default function Therapist() {

    const { user } = useContext(UserContext);

    return(
        <Container>
            Therapist Page
            <SetAvailability/>
        </Container>
    );
}