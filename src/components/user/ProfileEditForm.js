import {Container, Form, ModalBody, Row, Col, Button} from "react-bootstrap";
import TextareaAutosize from "react-textarea-autosize";

export default function ProfileEditForm(){
    return(
        <>
            <ModalBody>
                <h5>Edit Profile</h5>
                <div className={"border-bottom w-100"}></div>
                <Container>
                    <Form className="m-2 mb-0">
                        <Row className="g-3 mb-2">
                            <Col className="col-4"><Form.Label >username</Form.Label></Col>
                            <Col ><Form.Control value="mictony"/></Col>
                        </Row>

                        <Row className="g-3 mb-2">
                            <Col className="col-4"><Form.Label>profile picture</Form.Label></Col>
                            <Col ><Form.Control type="file"/></Col>
                        </Row>

                        <Row className="g-3 mb-2">
                            <Col className="col-4"><Form.Label>email</Form.Label></Col>
                            <Col ><Form.Control type="text" readOnly value="mbitoon@up.edu.ph" /></Col>
                        </Row>

                            <Row className="g-3 mb-2">
                                <Col className="col-4"><Form.Label>bio</Form.Label></Col>
                                <Col >
                                <TextareaAutosize  maxLength={160} className={"form-control"} rows={3} placeholder={"Tell us about yourself"}></TextareaAutosize>
                                </Col>
                            </Row>
                        <div className="d-flex align-items-base justify-content-end mb-2">
                            <Button >Save</Button>
                            <Button className="ms-4">Cancel</Button>
                        </div> 
                    </Form>
                </Container>

            </ModalBody>
        </>
    );
}