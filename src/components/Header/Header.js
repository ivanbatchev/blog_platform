import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { userLoggedOut } from '../../redux/actions'

import classes from './Header.module.scss'

const Header = ({ isLoggedIn, username, image, userLoggedOut }) => {
  const noLoginMenu = (
    <ul className={classes.signwrapper}>
      <li className={classes.signinButton}>
        <Link to="/sign-in">Sign In</Link>
      </li>
      <li className={classes.signupButton}>
        <Link to="/sign-up">Sign Up</Link>
      </li>
    </ul>
  )
  const loggedInMenu = (
    <div className={classes.loggedInWrapped}>
      <button className={classes.createArticleButton}>Create article</button>
      <div className={classes.userInfo}>
        <div>Username</div>
        <img src={image} alt="nice"></img>
      </div>
      <button
        className={classes.logOutButton}
        onClick={() => {
          userLoggedOut()
        }}
      >
        Log out
      </button>
    </div>
  )

  const visiblePanel = isLoggedIn ? loggedInMenu : noLoginMenu

  return (
    <header className={classes.header}>
      <h1>
        <Link to="/">Realworld Blog</Link>
      </h1>
      {visiblePanel}
    </header>
  )
}

const mapStateToProps = ({ authReducer: { isLoggedIn } }) => {
  return {
    isLoggedIn,
  }
}

const mapDispatchToProps = {
  userLoggedOut,
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
