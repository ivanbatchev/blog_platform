import React from 'react'
import { CircularProgress } from '@mui/material'

import classes from './Spinner.module.scss'

const Spinner = ({ size }) => {
  return (
    <div className={classes.spinner}>
      <CircularProgress disableShrink size={size} />
    </div>
  )
}

export default Spinner
