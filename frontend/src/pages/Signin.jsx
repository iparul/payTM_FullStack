import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../component/Button'
import GoToPage from '../component/GoToPage'
import Heading from '../component/Heading'
import InputBox from '../component/InputBox'
import Subheading from '../component/Subheading'
import SucessToast from '../component/SucessToast'
function Signin() {
    const naviagte = useNavigate()
    const [userSignIn, setUserSignIn] = useState({
        username: "",
        password: ""
    })
    const [message, setMessage] = useState("")
    const [type, setType] = useState("")

    const setData = (e, value) => {
        setUserSignIn({
            ...userSignIn,
            [value]: e.target.value
        })
    }

    const signInInfo = async () => {
        try {
            const res = await axios.post("http://localhost:3000/api/v1/user/signin", {
                ...userSignIn
            })

            if (res.status == 200) {
                setMessage("User login successfully")
                setType("Success")
                setTimeout(() => naviagte("/dashboard"), 1000)

                localStorage.setItem("token", res.data.token)
            } else {
                setMessage("Error")
                setType("Error")
            }
        } catch (err) {
            setMessage("There is some issue, Please try again")
            setType("Error")
            setUserSignIn({
                username: "",
                password: ""
            })
        }


    }

    return (
        <div className='bg-gray-500 flex justify-center h-screen'>
            <div className='w-80 bg-white rounded-md h-max m-auto'>
                <Heading lable="Sign In" />
                <Subheading lable="Enter your credentials to asscess your account" />
                <InputBox lable="Email" placeholder="jondeo@gmail.com" onChange={(e) => setData(e, "username")} value={userSignIn.username} />
                <InputBox lable="Password" placeholder="12345" onChange={(e) => setData(e, "password")} value={userSignIn.password} />
                <Button lable="Sign In" onClick={signInInfo} />
                <GoToPage text="Already have account?" lable="Sign Up" to="/" />
            </div>
            <SucessToast message={message} type={type} />
        </div>
    )
}

export default Signin