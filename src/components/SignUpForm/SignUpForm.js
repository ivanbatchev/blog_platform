import React, { useState, useRef } from 'react'
import { Checkbox, CircularProgress } from '@mui/material'
import { Link, withRouter } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'

import { onNewUserRegistration, handleNewDataInput } from '../../redux/actions'

import classes from './SignUpForm.module.scss'

const SignUpForm = ({ onNewUserRegistration, userStatus, requestStatus, handleNewDataInput, history }) => {
  const [createButtonDisabled, setButtonDisability] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm()

  const password = useRef({})
  password.current = watch('password', '')
  const onSubmit = ({ username, email, password }) => {
    onNewUserRegistration(username, email, password, history)
  }

  // error style
  const error = {
    outline: '1px solid red',
  }
  return (
    <form
      className={classes.signUpForm}
      onSubmit={handleSubmit(onSubmit)}
      onChange={() => {
        if (userStatus !== null) {
          handleNewDataInput()
        }
      }}
    >
      <h4>Create new account</h4>
      <label>
        Username
        <input
          style={errors?.username || userStatus?.username ? error : null}
          name="username"
          {...register('username', {
            required: {
              value: true,
              message: 'This field is required',
            },
            minLength: {
              value: 3,
              message: 'Username must be at least 3 characters',
            },
            maxLength: {
              value: 20,
              message: 'Username must be less than 20 characters',
            },
          })}
          type="text"
          placeholder="Username"
          autoComplete="off"
        ></input>
        {<p className={classes.error}>{errors.username && errors.username.message}</p>}
        {<p className={classes.error}>{userStatus?.username ? `Username: ${userStatus.username}` : null}</p>}
      </label>
      <label>
        Email address
        <input
          style={errors?.email || userStatus?.email ? error : null}
          name="email"
          {...register('email', {
            required: {
              value: true,
              message: 'This field is required',
            },
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          type="email"
          placeholder="Email address"
          autoComplete="off"
        ></input>
        {<p className={classes.error}>{errors.email && errors.email.message}</p>}
        {<p className={classes.error}>{userStatus?.email ? `Email ${userStatus.email}` : null}</p>}
      </label>

      <label>
        Password
        <input
          style={errors?.password ? error : null}
          name="password"
          {...register('password', {
            required: {
              value: true,
              message: 'This field is required',
            },
            minLength: {
              value: 6,
              message: 'Your password needs to be at least 6 characters',
            },
            maxLength: {
              value: 40,
              message: 'Your password needs to be not more than 40 characters',
            },
          })}
          type="password"
          placeholder="Password"
        ></input>
        {<p className={classes.error}>{errors.password && errors.password.message}</p>}
      </label>

      <label>
        Repeat password
        <input
          style={errors?.repeat_password ? error : null}
          name="repeat_password"
          {...register('repeat_password', {
            required: {
              value: true,
              message: 'This field is required',
            },
            validate: (value) => value === password.current || 'Passwords must match',
          })}
          type="password"
          placeholder="Password"
        ></input>
        {<p className={classes.error}>{errors.repeat_password && errors.repeat_password.message}</p>}
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
        type="submit"
        disabled={createButtonDisabled || requestStatus === 'loading'}
        style={createButtonDisabled ? { opacity: '0.5' } : null}
        className={classes.createButton}
      >
        {requestStatus === 'loading' ? <CircularProgress color="warning" size={12} /> : 'Create'}
      </button>
      <div className={classes.haveAccount}>
        Already have an account? <Link to="/sign-in"> Sign In.</Link>
      </div>
    </form>
  )
}

const mapStateToProps = ({ authReducer: { userStatus, requestStatus } }) => {
  return {
    userStatus,
    requestStatus,
  }
}

const mapDispatchToProps = {
  onNewUserRegistration,
  handleNewDataInput,
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUpForm))
