import { useContext } from "react";
import {Button,  Container, Form, Row} from "react-bootstrap";
import {useParams} from "react-router-dom";
import UserContext from "../UserContext";
import { useState } from "react";
import { useEffect } from "react";
import { DateRangePicker } from "rsuite";
import {subDays, startOfWeek, endOfWeek, addDays, startOfMonth, endOfMonth, addMonths, subMonths, addHours, startOfHour, startOfDay, format, eachDayOfInterval, eachHourOfInterval} from 'date-fns';
import { isBefore } from "date-fns";
import { isToday } from "date-fns";
import dayjs from "dayjs";
import Swal from "sweetalert2";

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

    const disabledDate = (date) => {
        return isBefore(date, new Date()) || isToday(date);
    };

    useEffect(() => {
        
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

    function addSlot(e) {
        e.preventDefault()

        const datesArray = eachDayOfInterval({ start: dates[0], end: dates[1]})
        const timesArray = eachHourOfInterval({ start: times[0], end: times[1] })

        for(let i in datesArray) {
            for(let j in timesArray) {
                fetch(`http://localhost:4000/therapist/addSlot`, {
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        therapist_id: 1,
                        date: dayjs(datesArray[i]).format('YYYY-MM-DD'),
                        time: dayjs(timesArray[j]).format('HH:mm')
                    })
                    }).then(res => res.json())
                    .then(data => {
                        data ?
                        Swal.fire({
                            title: "Slots Added!",
                            icon: "success",
                            iconColor: '#3A3530',
                            color: '#3A3530',
                            confirmButtonText: "OK",
                            buttonsStyling: false,
                            customClass: {
                                confirmButton: 'button2'
                            }
                        })
                        :
                        Swal.fire({
                            title: "Oh No!",
                            icon: "error",
                            text: "Something went wrong :( Please try again!",
                            iconColor: '#3A3530',
                            color: '#3A3530',
                            confirmButtonText: "OK",
                            buttonsStyling: false,
                            customClass: {
                                confirmButton: 'button2'
                            }
                        })
                })
            }
        }
    }

    return(
        <Container className={""}>
        <Form onSubmit={handleSubmit}>
            <Row className='justify-content-center align-items-center mt-4'>
                <DateRangePicker
                    placeholder="Select Available Dates"
                    cleanable
                    ranges={predefinedDateRanges}
                    preventOverflow
                    showOneCalendar
                    style={{ width: 300 }}
                    character=" - "
                    onChange={e => setDates(e)}
                    shouldDisableDate={disabledDate}
                />
            </Row>
            <Row className='justify-content-center align-items-center mt-4'>
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
            <Row className='justify-content-center align-items-center mt-4'>
                <Button type="submit" className="w-25" onClick={addSlot}> Add slot </Button>
            </Row>
        </Form>
            
        </Container>
    );
}