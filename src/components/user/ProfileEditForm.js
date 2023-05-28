import {Container, Form, ModalBody} from "react-bootstrap";

export default function ProfileEditForm(){
    return(
        <>
            <ModalBody>
                <h5>Edit Profile</h5>
                <div className={"border-bottom w-100"}></div>
                <Container>
                    <Form>
                        <Form.Group>
                        <Form.Label >username</Form.Label>
                        <Form.Control></Form.Control>
                        </Form.Group>
                    </Form>
                </Container>

            </ModalBody>
        </>
    );
}