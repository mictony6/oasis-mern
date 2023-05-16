import {
    Button, ButtonGroup, Col,
    Container,
    ListGroup,
    ListGroupItem,
    Nav,
    NavItem, Row,
    Tab,
    TabContent,
    TabPane,
    Tabs
} from "react-bootstrap";
import {useState} from "react";


export default function AppointmentList(){
    const [key, setKey] = useState('day');
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

      </>
    );
}