import {Card, CardGroup, Container, ButtonGroup, Button, Row} from "react-bootstrap";
import React, {useState, useEffect} from "react";
import PostCards from "../PostCards";



export default function UserOverview() {

    const sortMethod =  {
        NEW:"New",
        TOP:"Top"
    }

    const [sorting, setSorting] = useState(sortMethod.NEW);


    return(
        <Container >
            <Container className={"p-3 bg-body"}>
                <Button className={"me-3"} onClick={() => {setSorting(sortMethod.NEW)}}>New</Button>
                <Button  className={"me-3"} onClick={() => {setSorting(sortMethod.TOP)}}>Top</Button>
            </Container>

            {/* display all posts and comments here */}
            {sorting === sortMethod.NEW ?
                (<>
                </>)
                :
                (<></>)
            }
        </Container>
    );
}