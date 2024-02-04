import React from 'react'

function Button({ lable, onClick }) {
    return (
        <button type="button" class="w-11/12 px-4 mx-4 my-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm  py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 " onClick={onClick}>{lable}</button>
    )
}

export default Button