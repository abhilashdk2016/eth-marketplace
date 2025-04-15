import React from 'react'

const Button = ({ children, className = "", variant="purple", ...rest }) => {
  const variants = {
    purple: "text-white bg-indigo-600 hover:bg-indigo-700",
    red: "text-white bg-red-600 hover:bg-red-700",
    lightPurple: "text-indigo-700 bg-indigo-100 hover:bg-indigo-200",
    white: "text-black bg-white"
  }
  return (
    <button className={`disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer rounded-md xs:px-8 xs:py-3 text-base border font-medium ${className} ${variants[variant]}`} {...rest}>
        {children}
    </button>
  )
}

export default Button