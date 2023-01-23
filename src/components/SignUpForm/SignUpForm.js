import React, { useState, useRef } from 'react'
import { Checkbox } from '@mui/material'
import { Link } from 'react-router-dom'

import classes from './SignUpForm.module.scss'

const SignUpForm = () => {
  const password = useRef()
  const mathingPassword = useRef()
  const [isValidPassword, setPasswordValidation] = useState(true)
  const [arePasswordsMatching, setMatching] = useState(true)
  const [createButtonDisabled, setButtonDisability] = useState(false)
  // stylesForValidation
  const passwordLengthStyle = {
    color: 'red',
    fontSize: '12px',
    position: 'absolute',
    marginTop: '60px',
  }
  const passwordMatchStyle = {
    color: 'red',
    fontSize: '12px',
    position: 'absolute',
    marginTop: '60px',
  }
  const redBorderStyle = {
    border: '1px solid red',
  }
  // FORM VALIDATION
  const validatePassword = (passwordValue) => {
    setPasswordValidation(passwordValue.length < 6 ? false : true)
    if (passwordValue.length === 0) {
      setPasswordValidation(true)
    }
    if (passwordValue.length < 6 && passwordValue.length !== 0) {
      setButtonDisability(true)
    } else {
      setButtonDisability(false)
    }
  }

  const checkPasswordsMatch = () => {
    const passwordsAreEqual = password.current.value === mathingPassword.current.value
    setMatching(passwordsAreEqual ? true : false)
    if (mathingPassword.current.value.length === 0) {
      setMatching(true)
    }

    if (!passwordsAreEqual) {
      setButtonDisability(true)
    } else {
      setButtonDisability(false)
    }
  }

  return (
    <form className={classes.signUpForm}>
      <h4>Create new account</h4>
      <label>
        Username
        <input type="text" placeholder="Username" required></input>
      </label>
      <label>
        Email address
        <input type="email" placeholder="Email address" required></input>
      </label>
      <label>
        Password
        <input
          ref={password}
          type="password"
          placeholder="Password"
          required
          style={!isValidPassword ? redBorderStyle : null}
          onChange={({ target: { value: passwordValue } }) => {
            validatePassword(passwordValue)
            checkPasswordsMatch()
          }}
        ></input>
        <span style={!isValidPassword ? passwordLengthStyle : null} hidden={isValidPassword}>
          Your password needs to be at least 6 chracters.
        </span>
      </label>
      <label>
        Repeat password
        <input
          ref={mathingPassword}
          type="password"
          placeholder="Password"
          required
          style={!arePasswordsMatching ? redBorderStyle : null}
          onChange={checkPasswordsMatch}
        ></input>
        <span style={!arePasswordsMatching ? passwordMatchStyle : null} hidden={arePasswordsMatching}>
          Passwords must match
        </span>
      </label>
      <hr className={classes.hLine}></hr>
      <label className={classes.infoProcessing}>
        <Checkbox
          onChange={({ target: { checked } }) => {
            setButtonDisability(!checked)
          }}
          defaultChecked={true}
          className={classes.chekboxMui}
        />
        I agree to the processing of my personal information
      </label>
      <button
        disabled={createButtonDisabled}
        style={!createButtonDisabled ? null : { opacity: '0.5' }}
        className={classes.createButton}
      >
        Create
      </button>
      <div className={classes.haveAccount}>
        Already have an account? <Link to="/sign-in"> Sign In.</Link>
      </div>
    </form>
  )
}

export default SignUpForm
