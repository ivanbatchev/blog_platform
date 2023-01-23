import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { CircularProgress } from '@mui/material'

import { onLoginFormSubmition } from '../../redux/actions'

import classes from './SignInForm.module.scss'

const SignInForm = ({ isLoggedIn, onLoginFormSubmition }) => {
  const [hideLoginSpan, setLoginVisibility] = useState(false)

  if (isLoggedIn) {
    return <Redirect to={'/articles'} exact />
  }

  return (
    <form
      className={classes.signInForm}
      onSubmit={(e) => {
        setLoginVisibility(true)
        e.preventDefault()
        onLoginFormSubmition()
      }}
    >
      <h4>Sign In</h4>
      <label>
        Email address
        <input type="email" placeholder="Email address" required></input>
      </label>
      <label>
        Password
        <input type="password" placeholder="Password" required></input>
      </label>
      <button className={classes.loginButton} disabled={hideLoginSpan}>
        <span hidden={hideLoginSpan}>Login</span>
        <span hidden={!hideLoginSpan}>
          <CircularProgress disableShrink size={16} color={'inherit'} />
        </span>
      </button>
      <div className={classes.haveAccount}>
        Don&rsquo;t have an account? <Link to={'/sign-up'}>Sign Up.</Link>
      </div>
    </form>
  )
}

const mapStateToProps = ({ authReducer: { isLoggedIn, authorozing } }) => {
  return {
    isLoggedIn,
    authorozing,
  }
}

const mapDispatchToProps = {
  onLoginFormSubmition,
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm)
