import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'

import { onLoginFormSubmition } from '../../redux/actions'

import classes from './SignInForm.module.scss'

const SignInForm = ({ onLoginFormSubmition, history }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = ({ email, password }) => {
    onLoginFormSubmition(email, password, history)
  }

  // error style
  const error = {
    outline: '1px solid red',
  }
  return (
    <form className={classes.signInForm} onSubmit={handleSubmit(onSubmit)}>
      <h4>Sign In</h4>
      <label>
        Email address
        <input
          style={errors?.email ? error : null}
          type="email"
          {...register('email', {
            required: {
              value: true,
              message: 'This field is required',
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          placeholder="Email address"
          autoComplete="off"
        ></input>
        {<p className={classes.error}>{errors.email && errors.email.message}</p>}
      </label>
      <label>
        Password
        <input
          style={errors?.password ? error : null}
          type="password"
          {...register('password', {
            required: {
              value: true,
              message: 'This field is required',
            },
          })}
          placeholder="Password"
          autoComplete="off"
        ></input>
        {<p className={classes.error}>{errors.password && errors.password.message}</p>}
      </label>
      <button className={classes.loginButton}>
        <span>Login</span>
      </button>
      <div className={classes.haveAccount}>
        Don&rsquo;t have an account? <Link to={'/sign-up'}>Sign Up.</Link>
      </div>
    </form>
  )
}

const mapStateToProps = ({ authReducer: { isUserLoggedIn, authorozing } }) => {
  return {
    isUserLoggedIn,
    authorozing,
  }
}

const mapDispatchToProps = {
  onLoginFormSubmition,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignInForm))
