import {
    Button, ButtonGroup,  Collapse,
    Container,
    ListGroup,
    ListGroupItem,
    Modal,
    Tab,
    Tabs
} from "react-bootstrap";
import {useState} from "react";
import AddSlots from "./AddSlots";
import { format } from "date-fns";
import { DateCalendar } from "@mui/x-date-pickers";
import { useEffect } from "react";
import dayjs from 'dayjs';
import { useLocation, useNavigate } from "react-router-dom";
import Booking from "./Booking";
import { useContext } from "react";
import TherapistContext from "../TherapistContext";


export default function AppointmentList(){
    const {therapist}  = useContext(TherapistContext)
    const [key, setKey] = useState('Day');


    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(new Date())
    const [slots, setSlots] = useState(null)
    const [openCalendar, setOpenCalendar] = useState(false)

    const location = useLocation()
    const history = useNavigate()

    let [humanizedDate, setHumanizedDate] = useState('')

    useEffect(() => {
        setHumanizedDate(dayjs(new Date(date)).format('MMMM DD'))

        fetch(`http://localhost:4000/booking/getSlotsBy${key}/${therapist.therapist_id}`,
        {method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            date: date
        })
        }
        )
        .then(res => res.json())
        .then(data => {
            data.length !== 0 ?
            setSlots(data.map(slot => {
                return(
                    <Booking key={slot.slot_id} bookingProp= {slot}/>
                )
            }))
            :
            setSlots(<p className="mx-auto">You have no slots for this date. You can add slots from the dropdown below.</p>)
        })

    }, [date, key, therapist.therapist_id])

    function nextDay(){
        setDate(dayjs(date).add(1, 'day'))
    }

    function previousDay(){
        setDate(dayjs(date).subtract(1, 'day'))
    }

    return(
      < >
          <Container className={"d-flex align-items-center justify-content-between"}>
              <p className={"fw-bold display-6 "}><small>appointments</small></p>
              <ButtonGroup className={"d-flex flex-row align-items-center "}>
                  <Button onClick={previousDay}>{"<"}</Button>
                  <Button onClick={e => setOpenCalendar(true)}>{humanizedDate}</Button>
                  <Button onClick={nextDay}>{">"}</Button>
              </ButtonGroup>

              {<Modal show = {openCalendar} 
                onHide={e => setOpenCalendar(false)}>
                <DateCalendar
                className="datepicker-single"
                onChange={e => {
                    setDate(e)
                    setOpenCalendar(false)
                    }
                } 
                />
              </Modal>}
          </Container>

          <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => {
                setKey(k)
                history(`${location.pathname}?sort=${k}`);
                }}
              className="mb-3"
          >
              <Tab eventKey="Day" title="Day">
                  <ListGroup className={"appointment-list overflow-auto"}>
                    {slots}
                  </ListGroup>
              </Tab>
              <Tab eventKey="Week" title="Week">
                  <ListGroup className={"appointment-list overflow-auto"}>
                    {slots}
                  </ListGroup>
              </Tab>
              <Tab eventKey="Month" title="Month" >
                  <ListGroup className={"appointment-list overflow-auto"}>
                    {slots}
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