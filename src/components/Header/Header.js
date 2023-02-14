import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

import { userLoggedOut } from '../../redux/actions'

import classes from './Header.module.scss'

const Header = ({ isUserLoggedIn, userLoggedOut, history, userStatus, loginError, userInfoWhenLoggedIn }) => {
  const [openSuccessRegistration, setOpenSuccessRegistration] = useState(false)
  const [openOnLoginError, setOpenOnLoginError] = useState(false)
  useEffect(() => {
    if (userStatus?.user?.username) {
      setOpenSuccessRegistration(true)
    }
    if (loginError) {
      setOpenOnLoginError(true)
    }
  }, [userStatus, loginError])

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSuccessRegistration(false)
    setOpenOnLoginError(false)
  }

  const noLoginMenu = (
    <ul className={classes.signwrapper}>
      <li className={classes.signinButton}>
        <Link to="/sign-in">Sign In</Link>
      </li>
      <li
        className={classes.signupButton}
        onClick={() => {
          history.push('/sign-up')
        }}
      >
        <Link to="/sign-up">Sign Up</Link>
      </li>
    </ul>
  )
  const loggedInMenu = (
    <div className={classes.loggedInWrapped}>
      <button
        className={classes.createArticleButton}
        onClick={() => {
          history.push('/new-article')
        }}
      >
        Create article
      </button>
      <div
        className={classes.userInfo}
        onClick={() => {
          history.push('/profile')
        }}
      >
        <div>{isUserLoggedIn ? localStorage.getItem('username') : null}</div>
        {userInfoWhenLoggedIn?.image ? (
          <div
            className={classes.imageContainer}
            style={{
              backgroundImage: `url(${userInfoWhenLoggedIn?.image})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
            }}
          ></div>
        ) : null}
      </div>
      <button
        className={classes.logOutButton}
        onClick={() => {
          localStorage.clear()
          userLoggedOut()
          history.push('/articles')
        }}
      >
        Log out
      </button>
    </div>
  )

  const visiblePanel = isUserLoggedIn ? loggedInMenu : noLoginMenu

  return (
    <>
      <header className={classes.header}>
        <h1>
          <Link to="/">Realworld Blog</Link>
        </h1>
        {visiblePanel}
      </header>
      {/* Bubble on succesful registration */}
      <Snackbar open={openSuccessRegistration} autoHideDuration={2000} onClose={handleClose}>
        <MuiAlert severity="success" sx={{ width: '100%' }}>
          Registration was succesful!
        </MuiAlert>
      </Snackbar>
      {/* ===================================== */}
      {/* Bubble on login fail */}
      <Snackbar open={openOnLoginError} autoHideDuration={2000} onClose={handleClose}>
        <MuiAlert severity="error" sx={{ width: '100%' }}>
          Email or password is invalid!
        </MuiAlert>
      </Snackbar>
      {/* ===================================== */}
    </>
  )
}

const mapStateToProps = ({ authReducer: { isUserLoggedIn, userStatus, loginError, userInfoWhenLoggedIn } }) => {
  return {
    isUserLoggedIn,
    userStatus,
    loginError,
    userInfoWhenLoggedIn,
  }
}

const mapDispatchToProps = {
  userLoggedOut,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))
