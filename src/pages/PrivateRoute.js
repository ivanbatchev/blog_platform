import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'
const PrivateRoute = ({ component: Component, isUserLoggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return isUserLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/sign-in', state: { from: props.location } }} />
        )
      }}
    />
  )
}

const mapStateToProps = ({ authReducer: { isUserLoggedIn } }) => {
  return {
    isUserLoggedIn,
  }
}

export default connect(mapStateToProps, null)(PrivateRoute)
