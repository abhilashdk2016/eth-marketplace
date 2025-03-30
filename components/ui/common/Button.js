import React from 'react'

const Button = ({ children, className = "text-white bg-indigo-600 hover:bg-indigo-700", ...rest }) => {
  return (
    <button className={`disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer rounded-md px-8 py-3 text-base border font-medium ${className}`} {...rest}>
        {children}
    </button>
  )
}

export default Button