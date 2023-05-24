import { Card, CardGroup, Col, Container, Image, Row } from "react-bootstrap";
import AppNavbar from "../components/AppNavbar";
import image1 from "../static/images/blog_thumbnail.png";

const About = () => {
    return ( 
        <Container fluid>
            <Row className='d-flex flex-row '>
                    <Col lg={2} >
                        <AppNavbar/>
                    </Col>
                    <Col>
                        <Container fluid>
                            <Container className="d-flex flex-row p-4 ">
                                <span>
                                    <h4>who we are</h4>
                                    <p>oasis is a safe space for women in colleges and universities to come together—an oasis for their thoughts, experiences, and sufferings to be validated and given support.</p>
                                </span>
                                <span>
                                    <Image className="img-fluid " src={image1}/>
                                </span>
                            </Container>

                            <Container className="d-flex flex-column p-4 ">
                                <p>oasis will provide an avenue for women to</p>
                                <Row className={"flex-nowrap overflow-scroll   "}>
                                    <Card><Card.Body>sdsdsdsds</Card.Body></Card>
                                    <Card><Card.Body>sdsdsdsds</Card.Body></Card>
                                    <Card><Card.Body>sdsdsdsds</Card.Body></Card>
                                    <Card><Card.Body>sdsdsdsds</Card.Body></Card>
                                </Row>
                            </Container>

                            <Container className="d-flex flex-row-reverse p-4 ">
                                <span>
                                    <h4>mission</h4>
                                    <p>To provide a safe haven for women and young girls in schools and universities to seek refuge in, where they can form a community with shared experiences, all while being provided with proper access to help with their mental, emotional, and psychological needs.</p>
                                </span>
                                <span>
                                    <Image className="img-fluid " src={image1}/>
                                </span>
                            </Container>

                            <Container className="d-flex flex-row p-4">
                                <span>
                                    <h4>vision</h4>
                                    <p>To be a catalyst of change in pushing for a VAW-free society and act as a frontline service provider for struggling female students who experienced forms of abuse in universities and schools nationwide.</p>
                                </span>
                                <span>
                                    <Image className="img-fluid" src={image1}/>
                                </span>
                            </Container>
                        </Container>
                    </Col>
            </Row>

        </Container>
     );
}
 
export default About;