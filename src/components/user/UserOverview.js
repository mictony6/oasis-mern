import {Card, CardGroup, Container, ButtonGroup, Button, Row} from "react-bootstrap";
import React from "react";

export default function UserOverview() {
    return(
        <Container >
            <h6>Pinned Posts</h6>
            <CardGroup>
                <Card><Card.Body>This a card</Card.Body></Card>
                <Card><Card.Body>This a card</Card.Body></Card>
            </CardGroup>

            <Container className={"p-3 bg-body"}>
                <Button className={"me-3"}>New</Button>
                <Button  className={"me-3"}>Top</Button>
            </Container>
        </Container>
    );
}