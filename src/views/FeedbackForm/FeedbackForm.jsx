import React, { useState } from 'react'
import Checkbox from '../../components/Checkbox/Checkbox'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import isEmailValid from '../../utils/isEmailValid'
import Radios from '../../components/Radios/Radios'
import Select from '../../components/Select/Select'
import FileAttach from '../../components/FileAttach/FileAttach'
import './FeedbackForm.css'

const FeedbackForm = () => {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState('')
  const [message, setMessage] = useState('')
  const [messageError, setMessageError] = useState('')
  const [agreement, setAgreement] = useState('')
  const [agreementError, setAgreementError] = useState('')
  const [country, setCountry] = useState ('russia')

  const validate = () => {
    let hasError = false  

    if (isEmailValid(email)) {
      setEmailError('')
    } else {
      setEmailError('Incorrect email')
      hasError = true
    }

    if (name.length) {
      setNameError('')
    } else {
      setNameError('Required field')
      hasError = true
    }

    if (message.length) {
      setMessageError('')
    } else {
      setMessageError('Required field')
      hasError = true
    }

    if (agreement) {
      setAgreementError('')
    } else {
      setAgreementError('Required field')
      hasError = true
    }

    return !hasError
  }
  
  const onSubmit = (event) => {
    event.preventDefault()

    const isValid = validate()

    if (isValid) {
      const formNode = event.target
      const formData = new FormData(formNode)
      const formDataFormatted = Object.fromEntries(formData)

      console.debug(formDataFormatted)
    }
  }

  return (
    <form className="feedback-form" onSubmit={onSubmit}>
      <h1 className='feedback-form__title'>Add a review</h1>
      <div className="feedback-form__item">
        <Input 
          label="Email"
          name="email" 
          type="email" 
          placeholder="example@mail.com" 
          value={email}
          error={emailError}
          onChange={({target}) => setEmail(target.value)}
        />
      </div>
      <div className="feedback-form__item">
        <Input 
          label="Name"
          name="name" 
          placeholder="Ivan Ivanov" 
          value={name}
          error={nameError}
          onChange={({target}) => setName(target.value)}
        />
      </div>
      <div className="feedback-form__item">
        <Input 
          label="Message"
          name="message" 
          placeholder="Your message"
          type="textarea"
          value={message}
          error={messageError}
          onChange={({target}) => setMessage(target.value)}
        />
      </div>
      <div className="feedback-form__item">
        <Checkbox 
          label="I agree with terms"
          name="agreement"
          isChecked={agreement}
          error={agreementError}
          onChange={({ target }) => setAgreement(target.checked)}
        />
      </div>
      <div className="feedback-form__item">
        <Radios
          name="gender"
          label="Choose your gender:"
          items={[
            {
              value: 'male',
              label: 'Male',
              isChecked: true,
            },
            {
              value: 'female',
              label: 'Female',
            }
          ]}
        />
      </div>
      <div className="feedback-form__item">
        <Select 
          label="Choose your country"
          name="country"
          value={country}
          options={[
            {
              value: 'russia',
              label: 'Russia',
            },
            {
              value: 'china',
              label: 'China',
            },
            {
              value: 'usa',
              label: 'USA',
            },
          ]}
          onChange={setCountry}
        />
      </div>
      <div className="feedback-form__item">
        <FileAttach
          name="file"
        />
      </div>
      <div className="feedback-form__item">
        <Button
          className="feedback__button" 
          type="submit"
        >Send</Button>
      </div>
    </form>
  )
 }

 export default FeedbackForm