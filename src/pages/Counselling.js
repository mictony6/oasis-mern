import '../index.css';
import {
    Col,
    Container,
    FormLabel,
    FormSelect,
    ListGroup,
    Row,
    ListGroupItem,
} from 'react-bootstrap';
import AppNavbar from '../components/AppNavbar';
import TherapistCard from "../components/TherapistCard";
import ConsultationCard from "../components/ConsultationCard";
import {Link} from "react-router-dom";
import Categories from "../components/Categories";

export default function Counselling() {
    return (
        <Container fluid>
            <Row className='d-flex flex-row'>
                <Col lg={2} className=''>
                    <AppNavbar/>
                </Col>
                <Col className={'my-4 '}>
                    <p className={'fg-primary fw-bold display-6'}>connect with our therapists</p>
                    <Row className={'w-100 my-4'}>
                        <Col className={'d-flex flex-row align-items-center'}>
                            <FormLabel htmlFor={'sort-type'} className={'col-2'} >sort by</FormLabel>
                            <FormSelect aria-label={'sort-type'}>
                                <option >online consultations</option>
                                <option > other option</option>
                            </FormSelect>
                        </Col>
                        <Col className={'d-flex flex-row align-items-center '}>
                            <FormLabel htmlFor={'sort-type'} className={'col-4'}>available dates</FormLabel>
                            <FormSelect aria-label={'sort-type'}>
                                <option >this week</option>
                                <option >this month</option>
                            </FormSelect>
                        </Col>
                    </Row>
                    <Categories/>
                    <ListGroup className={""}>
                        <TherapistCard/>
                        <TherapistCard/>
                        <TherapistCard/>
                        <TherapistCard/>
                    </ListGroup>
                </Col>
                <Col lg={3} >
                        <Container fluid className='sticky-top vh-100 '>

                        <div className={"d-flex flex-row align-items-start justify-content-between pt-4 px-1    "}>
                            <h5 className={'fg-primary '}>upcoming consultation</h5>

                        </div>
                        <ListGroup className={'my-2 '}>
                            <ConsultationCard/>
                        </ListGroup>
                        <div className={"d-flex flex-row align-items-start justify-content-between pt-4 px-1"}>
                                <h5 className={'fg-primary '}>recent consultations</h5>
                                <Link className={"text-secondary"} to={"/consultations"}>view all</Link>
                        </div>
                        <ListGroup >
                            <ConsultationCard/>
                            <ConsultationCard/>
                            <ListGroupItem>See More...</ListGroupItem>
                        </ListGroup>

                    </Container>
                </Col>
            </Row>
        </Container>
    );
}
