import React from 'react'
import './Container.css'

const Container = (props) => {
  const {
    className = '',
    children,
  } = props

  return (
    <div className={`${className} content`}>
      {children}
    </div>
  )
}

export default Container