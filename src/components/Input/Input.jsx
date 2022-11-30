import React from 'react'
import './Input.css'

const Input = (props) => {
  const {
    className = '',
    name,
    id= name,
    label,
    isLabelHidden = true,
    type = 'text',
    placeholder,
    value,
    error = '',
    onChange,
  } = props

  const isTextArea = type === 'textarea'

  const Component = isTextArea ? 'textarea' : 'input'

  const onlyTextAreaProps = {}
  const onlyInputProps = { type }
  const extraProps = isTextArea ? onlyTextAreaProps : onlyInputProps

  const hasError = Boolean(error)

  return (
    <>
      <label 
        className={`${isLabelHidden ? 'visually-hidden' : ''}`}
        htmlFor={id}
      >
        {label}
      </label>
      <Component
        className={`${className} input ${hasError ? 'is-invalid' : ''}`}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...extraProps}
      />
      {hasError && <div className='error'>{error}</div>}
    </>
  )
} 

export default Input