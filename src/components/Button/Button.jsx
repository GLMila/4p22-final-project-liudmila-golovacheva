import React from 'react'
import './Button.css'

const Button = (props) => {
  const {
    className = '',
    type,
    children,
    onClick,
  } = props

  return (
    <button
      className={`${className} button`}
      type={type}
      onClick={onClick}
    >{children} </button>
  )
}

export default Button