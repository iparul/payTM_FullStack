import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Appbar } from '../component/Appbar'
import { Balance } from '../component/Balance'
import { Users } from '../component/Users'

function Dashboard() {
    const [balance, setBalance] = useState(0)

    useEffect(() => {
        getBalance()
    }, [])

    const getBalance = async () => {
        const res = await axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("token")
            }
        })
        console.log("***", res)
        setBalance(res.data.balance)
    }
    return (
        <div>
            <Appbar />
            <div className='m-8'>
                <Balance value={balance} />
                <Users />
            </div>
        </div>
    )
}

export default Dashboard