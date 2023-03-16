
import '../index.css';
import { Container, Row } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import Typed from 'react-typed';
import { useNavigate } from 'react-router-dom';


export default function Welcome() {
    // Media Queries for responsive UI
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    })
    const isLandscape = useMediaQuery({ query: '(orientation: landscape)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

    const location = useNavigate()

    function signUp() {
        location("/register");
    }

    return (
        <div className='welcome'>
        <Container fluid>
            <div className='welcome-container'>
                <Row className = 'justify-content-center'>
                    <h1 className ='typewrite'>
                        <Typed 
                            strings={[
                                "^300 share stories.",
                                "^300 seek refuge.",
                                "^300 find solace.",
                                "^300 you are safe here."
                            ]}
                            typeSpeed = { 100 }
                            backSpeed = { 30 }
                            backDelay = { 2000 }
                            loop
                        />
                        </h1>
                </Row>
                <Row>
                    {(isDesktopOrLaptop || (isLandscape && isTabletOrMobile)) && <p className='description'>
                        A safe space for women to come together—an oasis for their thoughts, experiences, <br /> and sufferings to be validated and given support.
                    </p>}
                    {(isTabletOrMobile && !isLandscape) && <p className='description'>
                        A safe space for women to come together—an oasis for their thoughts, experiences, and sufferings to be validated and given support.
                    </p>}
                </Row>
                <Row>
                    <button className='button' onClick={signUp}>
                        get started
                    </button>
                </Row>
            </div>
        </Container>
        </div>   
        )
}