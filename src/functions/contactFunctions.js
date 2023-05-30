import Swal from 'sweetalert2'


export function addContact(user_id) {
    fetch(`http://localhost:4000/contact/addContact/${user_id}`, {
        method : 'PUT',
        headers : {
            'Content-Type' : 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        }).then(res => res.json())
        .then(data => {
        if(data.status){
            Swal.fire({
                title: "Contact requested!",
                icon: "success",
                text: "Please wait on their confirmation to establish you as a contact",
                iconColor: '#3A3530',
                color: '#3A3530',
                confirmButtonText: "OK",
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'button2'
                }
            })
            return(data.status)
        } else {
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
            })}
    })
}

export function removeContact(user_id) {
    fetch(`http://localhost:4000/contact/removeContact/${user_id}`, {
        method : 'PATCH',
        headers : {
            'Content-Type' : 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        }).then(res => res.json())
        .then(data => {
            if(data.status) {
            Swal.fire({
                title: "User Removed.",
                icon: "success",
                text: "This user has been removed from your contact list.",
                iconColor: '#3A3530',
                color: '#3A3530',
                confirmButtonText: "OK",
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'button2'
                }
            })
            return(data.status)
            } else {
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
        }
    })
}

export function blockContact(user_id) {
    fetch(`http://localhost:4000/contact/blockContact/${user_id}`, {
        method : 'PUT',
        headers : {
            'Content-Type' : 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        }).then(res => res.json())
        .then(data => {
        if(data.status) {
            Swal.fire({
                title: "User Blocked",
                icon: "success",
                text: "This user has been blocked! They won't be able to message you and you will no longer see their posts.",
                iconColor: '#3A3530',
                color: '#3A3530',
                confirmButtonText: "OK",
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'button2'
                }
            })
            return(data.status)
        } else{
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
        }
    })
}

export function unblockContact(user_id) {
    fetch(`http://localhost:4000/contact/unblockContact/${user_id}`, {
        method : 'PATCH',
        headers : {
            'Content-Type' : 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        }).then(res => res.json())
        .then(data => {
            if(data.status) {
            Swal.fire({
                    title: "User Unblocked",
                    icon: "success",
                    text: "This user has been unblocked. They will now be able to add to you as their contact and send message to you.",
                    iconColor: '#3A3530',
                    color: '#3A3530',
                    confirmButtonText: "OK",
                    buttonsStyling: false,
                    customClass: {
                        confirmButton: 'button2'
                    }
                })
                return(data.status)
            } else{
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
            }
    })
}

export function confirmContact(contact_id, notification_id, contact_person_id) {
    fetch(`http://localhost:4000/contact/confirmContact/${contact_id}`, {
        method : 'PATCH',
        headers : {
            'Content-Type' : 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            notification_id: notification_id,
            contact_person_id: contact_person_id
        })
        }).then(res => res.json())
        .then(data => {
        if(data.status){
            Swal.fire({
                title: "Contact established!",
                icon: "success",
                text: "You may now message each other.",
                iconColor: '#3A3530',
                color: '#3A3530',
                confirmButtonText: "OK",
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'button2'
                }
            })
            return(data.status)
        } else {
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
            })}
    })
}

export function declineContact(contact_id, notification_id) {
    fetch(`http://localhost:4000/contact/declineContact/${contact_id}`, {
        method : 'PATCH',
        headers : {
            'Content-Type' : 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            notification_id: notification_id
        })
        }).then(res => res.json())
        .then(data => {
        if(data.status){
            Swal.fire({
                title: "Contact declined.",
                icon: "success",
                text: "You may still add them whenever you change your mind.",
                iconColor: '#3A3530',
                color: '#3A3530',
                confirmButtonText: "OK",
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'button2'
                }
            })
            console.log(data.status)
            return(data.status)
        } else {
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
            })}
    })
}
