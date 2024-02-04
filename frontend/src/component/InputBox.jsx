import React from 'react'

function InputBox({ lable, placeholder, onChange, value }) {
    return (
        <div className='px-4 my-2'>
            <div className='font-semibold mb-2'>{lable}</div>
            <input placeholder={placeholder} className="w-full rounded-md  border-2 px-2 py-1" onChange={onChange} value={value} />
        </div>
    )
}

export default InputBox