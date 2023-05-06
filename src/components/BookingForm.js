import React, { useState } from 'react';
import {Button, Col, Container, Form, FormGroup, Row} from 'react-bootstrap';
import {DatePicker} from "rsuite";


const BookingForm = () => {
    const maxSteps = 3;
    const [currentStep, setCurrentStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = (event) => {
        // const { name, value } = event.target;
        // setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (currentStep < maxSteps) {
            setCurrentStep(currentStep + 1);
        } else {
            setCurrentStep(maxSteps+1);
            setSubmitted(true);
            // console.log(formData);
            // do something with form data
        }
    };

    const handleBack = () => {
        setCurrentStep(currentStep - 1);
    }

    // predefined ranges
    const dateRanges = [
        {
            label:"Today",
            value:new Date()
        },

    ]
    const timeRanges = [
        {
            label:"Now",
            value: new Date()
        }
    ]

    return (
        <Form onSubmit={handleSubmit} className={" d-flex flex-column  p-3  "} >
            {currentStep === 1 && (
                <>
                <Form.Group >

                    <Form.Label htmlFor="consultation-mode" >mode of consultation</Form.Label>
                    <select
                        className={"form-control"}
                        id="consultation-mode"
                        onChange={handleInputChange}
                         >

                        <option  selected>--select options--</option>
                        <option value={"option1"}>Option 1</option>
                        <option value={"option2"}>Option 2</option>
                    </select>
                </Form.Group>
                <Form.Group >

                    <Form.Label htmlFor="consultation-clinic">clinic</Form.Label>
                    <Form.Control id="consultation-clinic" name="clinic" type="text" onChange={handleInputChange}  placeholder="* Insert name here *" ></Form.Control>
                </Form.Group>
                </>

            )}
            {currentStep === 2 && (
                <>
                    <Form.Label>appointment date and time</Form.Label>
                    <Row>
                        <Col  >
                            <DatePicker size="md" placeholder="Select Date" ranges={dateRanges} className={"w-100"}/>
                        </Col>
                        <Col >

                            <DatePicker format="hh:mm aa" showMeridian ranges={timeRanges} placeholder={"Select Time"} className={"w-100"} />
                        </Col>
                    </Row>
                </>

            )}
            {currentStep === 3 && (
                <>
                    <Form.Label className={"fw-bold"}>Confirm Appointment</Form.Label>
                        <Form.Label >Mode of Consultation</Form.Label>
                        <Form.Control type="text" readOnly={true}/>
                        <Form.Label >Clinic</Form.Label>
                        <Form.Control type="text" readOnly={true}/>
                    <Row>
                        <Col>
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="text" readOnly={true} />
                        </Col>
                        <Col>
                            <Form.Label>Time</Form.Label>
                            <Form.Control type="text" readOnly={true}/>
                        </Col>
                    </Row>
                </>
            )}
            {submitted && (
                <Container>
                    Thank you!
                </Container>
            )}


            {/*buttons*/}
            {(submitted === false ) &&
                (<FormGroup className={"align-self-end mt-2 "}>
                        {(currentStep > 1) && (
                            <Button onClick={handleBack} className={"m-1"}>Back</Button>
                        )}
                        {(currentStep === maxSteps ) ?
                            (<Button type="submit" className={"m-1"}>Submit</Button>)
                            :(<Button type="submit" className={"m-1"}>Next</Button>)
                        }
                    </FormGroup>
                )
            }



        </Form>
    );
};

export default BookingForm;