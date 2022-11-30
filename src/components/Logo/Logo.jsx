import React from 'react'
import { Link } from 'react-router-dom'
import './Logo.css'

const Logo = (props) => {
  const {
    className = '',
    href,
    reloadDocument= {},
  } = props

  return (
    <Link className={`${className} logo`} to={href} reloadDocument={reloadDocument}>
      <div className='logo'>
        <span className="logo-start">Flower</span>
        <span className="logo-end">Shop</span>
      </div>
    </Link>
  )
}

export default Logo