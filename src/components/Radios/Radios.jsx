import React from "react";
import './Radios.css'

const Radios = (props) => {
  const {
    className = '',
    name,
    items = [],
    label,
  } = props

  return (
    <div className="radios">
      <div className="radios__label">{label}</div>  
      <ul className="radios__list">
        {items.map(({ value, label, isChecked }) => (
          <li className="radios__item" key={value}>
            <label className="radios__radio">
              <input
                className="radios__control visually-hidden"
                id={value}
                name={name}
                value={value}
                defaultChecked={isChecked}
                type="radio"
              />
              <span className="radio__emulator"/>
              <span className="radios__radio-label">{label}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Radios