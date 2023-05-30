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
                                <Row className={"align-items-center justify-content-between"}>
                                    <Col lg={6}>
                                        <h4 className={"about-us-label"}>who we are</h4>
                                        <p>oasis is a safe space for women in colleges and universities to come together—an oasis for their thoughts, experiences, and sufferings to be validated and given support.</p>
                                    </Col>
                                    <Col>
                                        <Image className="img-fluid " src={image1}/>
                                    </Col>
                                </Row>
                            </Container>

                            <Container className="d-flex flex-column p-4 align-items-center text-center">
                                <p>oasis will provide an avenue for women to</p>
                                <Row className={"flex-nowrap overflow-auto w-100 text-white "}>
                                    <Card className="about-us-card border-0 m-2 flex-grow-1">
                                        <Card.Body>
                                            <Card.Title  >feel safe</Card.Title>
                                            <Card.Subtitle>when sharing stories</Card.Subtitle>
                                        </Card.Body>
                                    </Card>

                                    <Card className="about-us-card border-0 m-2 flex-grow-1 ">
                                        <Card.Body >
                                            <Card.Title >seek refuge</Card.Title>
                                            <Card.Subtitle>from psychiatrists</Card.Subtitle>
                                        </Card.Body>
                                    </Card>

                                    <Card className="about-us-card border-0 m-2 flex-grow-1 ">
                                        <Card.Body>
                                            <Card.Title >find solace</Card.Title>
                                            <Card.Subtitle>in a community</Card.Subtitle>
                                        </Card.Body>
                                    </Card>
                                </Row>
                            </Container>

                            <Container className="d-flex flex-row-reverse p-4 ">
                                <Row  className={"align-items-center justify-content-between flex-row-reverse"}>
                                    <Col lg={6}>
                                        <h4 className={"about-us-label"}>mission</h4>
                                        <p>To provide a safe haven for women and young girls in schools and universities to seek refuge in, where they can form a community with shared experiences, all while being provided with proper access to help with their mental, emotional, and psychological needs.</p>
                                    </Col>
                                    <Col>
                                        <Image className="img-fluid " src={image1}/>
                                    </Col>
                                </Row>
                            </Container>

                            <Container className="d-flex flex-row p-4">
                                <Row  className={"align-items-center justify-content-between"}>
                                    <Col lg={6}>
                                        <h4 className={"about-us-label"}>vision</h4>
                                        <p>To be a catalyst of change in pushing for a VAW-free society and act as a frontline service provider for struggling female students who experienced forms of abuse in universities and schools nationwide.</p>
                                    </Col>
                                    <Col>
                                        <Image className="img-fluid " src={image1}/>
                                    </Col>
                                </Row>
                            </Container>
                        </Container>
                    </Col>
            </Row>

        </Container>
     );
}
 
export default About;