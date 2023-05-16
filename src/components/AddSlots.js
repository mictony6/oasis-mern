import { useContext } from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useParams} from "react-router-dom";
import UserContext from "../UserContext";
import { useState } from "react";
import { useEffect } from "react";
import {DateRangePicker} from "rsuite";
import {subDays, startOfWeek, endOfWeek, addDays, startOfMonth, endOfMonth, addMonths, subMonths, addHours, startOfHour, startOfDay, format} from 'date-fns';

export default function AddSlots() {

    const { id } = useContext(UserContext);

    const [dates, setDates] = useState('')
    const [times, setTimes] = useState('')

    const today = new Date()

    const predefinedDateRanges = [
        {
            label: 'Today',
            value: [today, today],
            placement: 'left'
        },
        {
            label: 'This week',
            value: [startOfWeek(today), endOfWeek(today)],
            placement: 'left'
        },
        {
            label: 'This month',
            value: [startOfMonth(today), endOfMonth(today)],
            placement: 'left'
        },
        {
            label: 'Next month',
            value: [startOfMonth(addMonths(today, 1)), endOfMonth(addMonths(today, 1))],
            placement: 'left'
        },
        {
            label: 'Next 3 Months',
            value: [startOfMonth(addMonths(today,1)), endOfMonth(addMonths(today,2))],
            placement: 'left'
        },
    ]

    const predefinedTimeRanges = [
        {
            label: 'Office Hours',
            value: [addHours(startOfDay(today),8), addHours(startOfDay(today),16)],
            placement: 'left'
        },
        {
            label: 'Morning',
            value: [addHours(startOfDay(today),8), addHours(startOfDay(today),11)],
            placement: 'left'
        },
        {
            label: 'Afternoon',
            value: [addHours(startOfDay(today),13), addHours(startOfDay(today),16)],
            placement: 'left'
        },
        {
            label: 'Evening',
            value: [addHours(startOfDay(today),17), addHours(startOfDay(today),20)],
            placement: 'left'
        },
    ]

    useEffect(() => {
        console.log(dates, times)
    }, [dates, times])

    const handleSubmit = (e) => {
        e.preventDefault()

        if(dates.length !== 0) {
            setDates(times.map(date => {
            return format(date, 'MM/dd/yyyy')
            }))}

        if(times.length !== 0) {
            setTimes(times.map(time => {
            let t = new Date(time)
            return format((addHours(startOfDay(today), t.getHours())), 'HH:mm')
            }))}
    }

    return(
        <Container>
        <Form onSubmit={handleSubmit}>
            <Row className='justify-content-center align-items-center mt-5'>
                <DateRangePicker
                    placeholder="Select Available Dates"
                    cleanable
                    // appearance="subtle"
                    ranges={predefinedDateRanges}
                    preventOverflow
                    showOneCalendar
                    style={{ width: 300 }}
                    character=" - "
                    onChange={e => setDates(e)}
                />
            </Row>
            <Row className='justify-content-center align-items-center mt-5'>
                <DateRangePicker
                    placeholder="Select Available Time"
                    format="hh:00 aa"
                    showMeridian
                    cleanable
                    ranges={predefinedTimeRanges}
                    preventOverflow
                    style={{ width: 300 }}
                    character=" - "
                    onChange={e => setTimes(e)}
                />
            </Row>
            <Row className='justify-content-center align-items-center mt-5'>
                <Button type="submit" className="w-25"> Add slot </Button>
            </Row>
        </Form>
            
        </Container>
    );
}