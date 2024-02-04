import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SucessToast({ message, type }) {

    useEffect(() => {
        console.log("message", message)
        if (message && type == "Success") {
            toast.success(message, { autoClose: 3000 });
        } else if (message && type == "Error") {
            toast.error(message, { autoClose: 3000 });
        }
    }, [message])

    return (
        <><ToastContainer /></>
    )
}

export default SucessToast