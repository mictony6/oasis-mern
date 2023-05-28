import { Card, CardGroup, Col, Container, Image, Row } from "react-bootstrap";
import AppNavbar from "../components/AppNavbar";
import image1 from "../static/images/oasis-pic-1.jpg";
import image2 from "../static/images/oasis-pic-2.jpg";
import image3 from "../static/images/oasis-pic-3.jpg";

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
                                <span className="about-paragraph">
                                    <h2 className="about-label">who we are</h2>
                                    <p className="about-title-text"><strong>oasis</strong> is a nurturing and empowering online community that provides a safe space for women to connect, share, and support one another. Within oasis, women find solace and validation for their thoughts, experiences, and challenges, knowing they are heard and understood. By fostering a sense of belonging, this platform aims to create a network of support that encourages personal growth, healing, and freedom of expression.</p>
                                </span>
                      
                                    <Image className="about-img" src={image1}/>
                   
                            </Container>

                            <Container className="d-flex flex-column p-4 ">
                                <Row className={"flex-nowrap overflow-auto "} id="about-row">
                                    <Card className="about-us">
                                        <Card.Body className="about-text-3">
                                            <Card.Title className="about-text">feel safe</Card.Title>
                                            <Card.Subtitle>when sharing stories</Card.Subtitle>
                                        </Card.Body>
                                    </Card>

                                    <Card className="about-us">
                                        <Card.Body className="about-text-3">
                                            <Card.Title className="about-text">seek refuge</Card.Title>
                                            <Card.Subtitle>from psychiatrists</Card.Subtitle>
                                        </Card.Body>
                                    </Card>

                                    <Card className="about-us">
                                        <Card.Body className="about-text-3">
                                            <Card.Title className="about-text">find solace</Card.Title>
                                            <Card.Subtitle>in a community</Card.Subtitle>
                                        </Card.Body>
                                    </Card>
                                  
                                </Row>
                            </Container>

                            <Container className="d-flex flex-row-reverse p-4 ">
                                <span className="about-paragraph">
                                    <h4 className="about-label"> mission</h4>
                                    <p>To provide a safe haven for women and young girls in schools and universities to seek refuge in, where they can form a community with shared experiences, all while being provided with proper access to help with their mental, emotional, and psychological needs.</p>
                                </span>
                                <span>
                                    <Image className="about-img" src={image2}/>
                                </span>
                            </Container>

                            <Container className="d-flex flex-row p-4">
                                <span className="about-paragraph">
                                    <h4 className="about-label">vision</h4>
                                    <p>To be a catalyst of change in pushing for a VAW-free society and act as a frontline service provider for struggling female students who experienced forms of abuse in universities and schools nationwide.</p>
                                </span>
                                <span>
                                    <Image className="about-img" src={image3}/>
                                </span>
                            </Container>
                        </Container>
                    </Col>
            </Row>

        </Container>
     );
}
 
export default About;