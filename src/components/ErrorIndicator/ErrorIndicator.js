import React from 'react'

import classes from './ErrorIndicator.module.scss'

const ErrorIndicator = ({ errorMessage = 'uknown' }) => {
  return (
    <div className={classes.error}>
      Error. Sorry for that!
      <br /> Try to reaload this page
      <div>Error description: {errorMessage}</div>
    </div>
  )
}

export default ErrorIndicator
