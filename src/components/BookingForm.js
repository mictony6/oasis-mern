import { DateCalendar, DateField, DatePicker, DigitalClock, TimeField } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useEffect } from 'react';
import {Button, Col, Container, Form, FormGroup, Row} from 'react-bootstrap';
// import {DatePicker} from "rsuite";


const BookingForm = ({bookingProp}) => {
    
    const {online, in_person, last_name, prefix, suffix} = bookingProp

    const maxSteps = 3;
    const [currentStep, setCurrentStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [mode, setMode] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [openTime, setOpenTime] = useState(false)
    const [openCalendar, setOpenCalendar] = useState(false)
    const [datetime, setDateTime] = useState('')

    let [humanizedDate, setHumanizedDate] = useState('')
    let [humanizedTime, setHumanizedTime] = useState('')

    const eightAM = dayjs().set('hour', 8).startOf('hour');
    const fivePM = dayjs().set('hour', 16).startOf('hour');

    const tomorrow = dayjs().add(1, 'day')

    const handleInputChange = (e) => {
        setMode(e.target.value);
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

    useEffect(() => {
        setHumanizedTime(dayjs(time).format('hh:mm A'))
        setHumanizedDate(dayjs(new Date(date)).format('MMMM DD[,] YYYY'))

        setDateTime(new Date(humanizedDate.concat(" "+humanizedTime)))
    }, [time, date, humanizedDate, humanizedTime])

    return (    
        <Form onSubmit={handleSubmit} className={" d-flex flex-column  px-2 pb-3"} >
            {currentStep === 1 && (
                <>
                <Form.Group >

                    <Form.Label htmlFor="consultation-mode" className='pb-3 fw-bold'>Mode of consultation</Form.Label>
                    <select
                        className={"form-control"}
                        id="consultation-mode"
                        onChange={handleInputChange}
                        value={mode}
                        >
                            <option value=''>--select options--</option>
                            <option value={"online"} disabled={!online}>Online Consultation</option>
                            <option value={"inPerson"} disabled={!in_person}>In-Person Consultation</option>
                    </select>
                </Form.Group>
                <Form.Group >

                    {/* <Form.Label htmlFor="consultation-clinic">clinic</Form.Label>
                    <Form.Control id="consultation-clinic" name="clinic" type="text" onChange={handleInputChange}  placeholder="* Insert name here *" ></Form.Control> */}
                </Form.Group>
                </>

            )}
            {currentStep === 2 && (
                <>
                    <Form.Label className='pb-3 fw-bold'>Set Date and Time</Form.Label>
                    <Row>
                        <Col>
                            <DateField
                                onClick={e => setOpenCalendar(true)}
                                value = {date}
                                label="Select Date"
                                slotProps={{
                                textField: {
                                helperText: 'MM/DD/YYYY',
                                }
                            }}
                            />
                            {openCalendar &&
                                <DateCalendar
                                minDate={tomorrow}
                                onChange={e => {
                                    setDate(e)
                                    setOpenCalendar(false)}} />
                            }

                        </Col>
                        <Col >
                            <TimeField 
                                onClick={e => setOpenTime(true)}
                                value = {time}
                                label="Select Time"
                                slotProps={{
                                textField: {
                                }
                            }}
                            />
                            {openTime && 
                                <DigitalClock timeStep={30}
                                skipDisabled
                                minTime={eightAM}
                                maxTime={fivePM}
                                onChange={e => {
                                    setTime(e)
                                    setOpenTime(false)}}
                            />} 
                        </Col>
                    </Row>
                </>

            )}
            {currentStep === 3 && (
                <>
                    <Form.Label className={"fw-bold"}>Confirm Appointment</Form.Label>
                        <p> Are you sure you want to book an <b>{mode==='inPerson' ? "In-Person Consultation": "Online Consultation"}</b> with <b> {prefix ? prefix : ''} {last_name} {suffix ? suffix : ''}</b>on the following date and time?<br/>
                        <div className='d-flex mt-4 justify-content-center'><b className='fw-bold'>{humanizedDate} ({humanizedTime})</b></div></p>
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
                            (<Button type="submit" className={"m-1"}>Confirm</Button>)
                            :(<Button type="submit" className={"m-1"}>Next</Button>)
                        }
                    </FormGroup>
                )
            }



        </Form>
    );
};

export default BookingForm;