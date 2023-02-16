import React from 'react'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { onProfileEdition } from '../../redux/actions'
import Spinner from '../Spinner'

import classes from './EditProfile.module.scss'

const EditProfile = ({ onProfileEdition, history, requestEditStatus, editError, userInfoWhenLoggedIn }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = ({ username, email, new_password, avatar_image_url }) => {
    onProfileEdition(email, new_password, username, avatar_image_url, history)
  }

  // error style
  const error = {
    outline: '1px solid red',
  }

  if (requestEditStatus === 'loading') {
    return <Spinner />
  }

  return (
    <form className={classes.editWrapper} onSubmit={handleSubmit(onSubmit)}>
      <h4>Edit Profile</h4>
      <label>
        Username
        <input
          defaultValue={userInfoWhenLoggedIn.username}
          style={errors?.username ? error : {}}
          type="text"
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
          placeholder="Username"
          autoComplete="off"
        ></input>
        {<p className={classes.error}>{errors.username && errors.username.message}</p>}
        {<p className={classes.error}>{editError?.username && `Username ${editError?.username}`}</p>}
      </label>
      <label>
        Email address
        <input
          defaultValue={userInfoWhenLoggedIn.email}
          style={errors?.email ? error : null}
          type="email"
          name="email"
          {...register('email', {
            required: {
              value: true,
              message: 'This field is required',
            },
          })}
          placeholder="Email address"
          autoComplete="off"
        ></input>
        {<p className={classes.error}>{errors.email && errors.email.message}</p>}
        {<p className={classes.error}>{editError?.email && `Email ${editError?.email}`}</p>}
      </label>
      <label>
        New password
        <input
          style={errors?.new_password ? error : null}
          type="password"
          name="new_password"
          {...register('new_password', {
            minLength: {
              value: 6,
              message: 'Your password needs to be at least 6 characters',
            },
            maxLength: {
              value: 40,
              message: 'Your password needs to be not more than 40 characters',
            },
          })}
          placeholder="New password"
          autoComplete="off"
        ></input>
        {<p className={classes.error}>{errors.new_password && errors.new_password.message}</p>}
      </label>
      <label>
        Avatar image (url)
        <input
          style={errors?.avatar_image_url ? error : null}
          type="url"
          name="avatar_image_url"
          {...register('avatar_image_url')}
          placeholder="Avatar image"
          autoComplete="off"
        ></input>
        {<p className={classes.error}>{errors.avatar_image_url && errors.avatar_image_url.message}</p>}
      </label>
      <button className={classes.saveButton}>Save</button>
    </form>
  )
}

const mapStateToProps = ({ editReducer: { requestEditStatus, editError }, authReducer: { userInfoWhenLoggedIn } }) => {
  return {
    requestEditStatus,
    editError,
    userInfoWhenLoggedIn,
  }
}

const mapDispatchToProps = {
  onProfileEdition,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditProfile))
