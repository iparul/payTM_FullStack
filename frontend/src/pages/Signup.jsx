import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../component/Button'
import GoToPage from '../component/GoToPage'
import Heading from '../component/Heading'
import InputBox from '../component/InputBox'
import Subheading from '../component/Subheading'
import SucessToast from '../component/SucessToast'

function Signup() {
    const naviagte = useNavigate()
    const [userData, setUserData] = useState({
        userName: "",
        firstName: "",
        lastName: "",
        password: ""
    })
    const [message, setMessage] = useState("")
    const [type, setType] = useState("")

    const setData = (e, value) => {
        setUserData({
            ...userData,
            [value]: e.target.value
        })
    }

    const SignupInfo = async () => {
        try {
            const res = await axios.post("http://localhost:3000/api/v1/user/signup", {
                ...userData
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
            setUserData({
                userName: "",
                firstName: "",
                lastName: "",
                password: ""
            })
        }

    }

    const verifyUser = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/v1/user/me", {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("token")
                }
            })
            if (res?.data?.message == "User is verified.") {
                naviagte("/dashboard")
            }
        } catch (err) {

        }

    }

    useEffect(() => {
        verifyUser()
    }, [])

    return (
        <div className='bg-gray-500 flex justify-center h-screen'>
            <div className='w-80 bg-white rounded-md h-max m-auto'>
                <Heading lable="Sign Up" />
                <Subheading lable="Enter your information to create an account" />
                <InputBox lable="First Name" placeholder="Jon" onChange={(e) => setData(e, "firstName")} value={userData.firstName} />
                <InputBox lable="Last Name" placeholder="Deo" onChange={(e) => setData(e, "lastName")} value={userData.lastName} />
                <InputBox lable="Email" placeholder="jondeo@gmail.com" onChange={(e) => setData(e, "userName")} value={userData.userName} />
                <InputBox lable="Password" placeholder="12345" onChange={(e) => setData(e, "password")} value={userData.password} />
                <Button lable="Sign Up" onClick={SignupInfo} />
                <GoToPage text="Already have account?" lable="Login" to="/signin" />
                <SucessToast message={message} type={type} />
            </div>

        </div>
    )
}

export default Signup