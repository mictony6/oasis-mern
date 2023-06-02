
import '../index.css';
import { useContext, useState } from 'react';
import {Container, Dropdown, FormControl, Button, Image, Modal, ButtonGroup} from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive'
import TextareaAutosize from 'react-textarea-autosize';
import user_placeholder from '../static/images/profile_pic_placeholder.svg'
import Swal from 'sweetalert2'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';
import {useTranslation} from "react-i18next";


export default function CreatePost() {
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    })

    const isLandscape = useMediaQuery({ query: '(orientation: landscape)' })

    const [show, setShow] = useState(false);
    const [open, setOpen] = useState(false);

    const [subject, setSubject] = useState("")
    const [content, setContent] = useState("");

    const [active, setActive] = useState(false)

    const { user } = useContext(UserContext)

    useEffect(() => {
        subject !== '' && content !== '' ? setActive(true) : setActive(false)
    }, [subject, content])

    const showDropdown = (e) => {
        setShow(true);
    }
    const hideDropdown = e => {
        setShow(false);
    }

    const openModal = (e) => {
        setOpen(true);
    }
    const closeModal = e => {
        setOpen(false);
    }

    function createPost(e) {
        e.preventDefault()

        fetch(`http://localhost:4000/post/create`, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                subject: subject,
                content: content
            })
            }).then(res => res.json())
            .then(data => {
                data ? 
                Swal.fire({
                    title: "Post created!",
                    icon: "success",
                    text: "Thank you for sharing.",
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
        closeModal()
        setSubject("");
        setContent("");
    }

    const {t, i18n} = useTranslation();

    return (
        <Container fluid>
            <Container fluid className="d-flex flex-row my-4 justify-content-between">
                <ButtonGroup className='rounded-4 d-flex flex-row p-2 shadow-focus w-100' >
                    <FormControl placeholder={t('post.placeholder')} className='border-0 w-100 shadow-none'
                    onClick={openModal}
                    ></FormControl>
                    <Button className=" px-4 bg-primary border-0 "
                    onClick={openModal}
                    ><i className={"bi bi-plus-lg"}></i> </Button>
                </ButtonGroup>

                <Dropdown>
                    <Button type="button" data-bs-toggle="dropdown" aria-expanded="false" className="border-0"
                    style={{background: 'transparent'}}>
                    <Image src={user_placeholder} className="mx-2 w-auto"/>
                    </Button>

                    <ul className="dropdown-menu dropdown-menu-end">
                        <Dropdown.Item as={Link} to={`/user/${user.id}`}>Profile</Dropdown.Item>
                        <Dropdown.Item href="logout">Logout</Dropdown.Item>
                    </ul>
                </Dropdown>
            </Container>

            <Modal show={open} size="lg" className="mt-auto" centered onHide={closeModal}>
                <Container fluid className="d-flex flex-column px-4 my-4 justify-content-between align-items-center">
                    <h3 className='py-3'>{t('post.create')}</h3>
                    <div className='rounded-4 d-flex flex-row p-2 shadow-focus w-100' >
                        <FormControl 
                            placeholder={t('post.title')}
                            className='border-0 w-100 shadow-none'
                            onChange = {e => setSubject(e.target.value)}
                            value={subject}
                        />
                    </div>
                    <div className='w-100'>
                        <TextareaAutosize
                            className='content-box'
                            placeholder={t('post.placeholder')}
                            minRows={10}
                            maxRows={15}
                            onChange = {e => setContent(e.target.value)}
                            value={content}
                        />
                    </div>
                    <div className='mt-3'>
                        <Button 
                        className="rounded px-5 bg-primary border-0"
                        onClick={createPost}
                        disabled={!active}
                        >
                            {t('post.button')}
                        </Button>
                    </div>
                </Container>
            </Modal>

        </Container>
    )
}