import {
    Button, ButtonGroup,  Collapse,
    Container,
    ListGroup,
    ListGroupItem,
    Tab,
    Tabs
} from "react-bootstrap";
import {useState} from "react";
import BookingForm from "./BookingForm";
import AddSlots from "./AddSlots";


export default function AppointmentList(){
    const [key, setKey] = useState('day');

    const [open, setOpen] = useState(false);
    return(
      < >
          <Container className={"d-flex align-items-center justify-content-between"}>
              <p className={"fw-bold display-6 "}><small>appointments</small></p>
              <ButtonGroup className={"d-flex flex-row align-items-center "}>
                  <Button>{"<"}</Button>
                  <Button >10 March</Button>
                  <Button>{">"}</Button>
              </ButtonGroup>



          </Container>

          <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="mb-3"
          >
              <Tab eventKey="day" title="Day">
                  <ListGroup>
                      <ListGroupItem>sdsds</ListGroupItem>
                      <ListGroupItem>sdsds</ListGroupItem>
                      <ListGroupItem>sdsds</ListGroupItem>
                      <ListGroupItem>sdsds</ListGroupItem>
                  </ListGroup>
              </Tab>
              <Tab eventKey="week" title="Week">
                  <ListGroup>
                      <ListGroupItem>dsdsd</ListGroupItem>
                      <ListGroupItem>sdssdsdsds</ListGroupItem>
                      <ListGroupItem>sdsds</ListGroupItem>
                      <ListGroupItem>sds</ListGroupItem>
                  </ListGroup>
              </Tab>
              <Tab eventKey="month" title="Month" >
                  <ListGroup>
                      <ListGroupItem>sdsd</ListGroupItem>
                      <ListGroupItem>sdsds</ListGroupItem>
                      <ListGroupItem>sds</ListGroupItem>
                      <ListGroupItem>df</ListGroupItem>
                  </ListGroup>
              </Tab>
          </Tabs>
          <div className={"my-4  bg-secondary rounded-2"}>
          <Button
              onClick={() => setOpen(!open)}
              aria-controls="add-slot-form"
              aria-expanded={open}
              className={"w-100"}
          >
              Options <i className={open ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill "}></i>
          </Button>

          <Collapse in={open}>
              <div id="add-slot-form" className={"p-5 rounded-bottom-3 "}>
                  <AddSlots/>
              </div>
          </Collapse>
          </div>


      </>
    );
}