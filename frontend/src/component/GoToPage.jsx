import React from 'react'
import { Link } from 'react-router-dom'

function GoToPage({ text, lable, to }) {
    return (
        <div className='text-center text-sm font-semibold mb-3 mt-2 '>
            {text}
            <Link to={to} className="pointer underline pl-1 cursor-pointer">{lable}</Link>
        </div>
    )
}

export default GoToPage