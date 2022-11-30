import React, { useState } from 'react'
import './Select.css'

const Select = (props) => {
  const {
    className = '',
    label,
    isLabelHidden = false,
    name,
    id = name,
    value,
    options = [],
    onChange,
  } = props

  const [isOpen, setIsOpen] = useState(false)

  const hasOptions = options.length > 0

  const currentVariant = options.find((option) => option.value === value).label

  const onBodyClick = () => {
    setIsOpen(!isOpen)
  }

  const onDropdownButtonClick = (value) => {
    onChange(value)
    setIsOpen(false)
  }

  if (!hasOptions) return null

  return (
    <div className={`${className} select`}>
      <label
        className={`select__label ${isLabelHidden ?  'visually-hidden' : ''}`}
        htmlFor={id}
      >
        {label}
      </label>
      <select
        className="visually-hidden"
        name={name}
        onChange={onChange}
        value={value}
      >
        {options.map(({ value, label }) => (
          <option
            key={value}
            value={value}
          >
            {label}
          </option>
        ))}
      </select>
      <div className={`select__dropdown ${isOpen ? 'is-open' : ''}`}>
        <ul className="select__dropdown-list">
          {options.map(({ value: optionValue, label }) => {
            const isSelected = optionValue === value

            return (
              <li className="select__dropdown-item" key={optionValue}>
                <button
                  className={`select__dropdown-button ${isSelected ? 'is-selected' : ''}`}
                  type="button"
                  onClick={() => onDropdownButtonClick(optionValue)}
                >
                  {label}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="select__body input" onClick={onBodyClick}>
        <div className="select__current-variant">{currentVariant}</div>
        <div className="select__arrow-icon">
          ↓
        </div>
      </div>
    </div>
  )
}

export default Select