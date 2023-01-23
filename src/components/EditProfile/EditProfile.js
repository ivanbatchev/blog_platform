import React from 'react'

import classes from './EditProfile.module.scss'

const EditProfile = ({ email, username }) => {
  return (
    <form className={classes.editWrapper}>
      <h4>Edit Profile</h4>
      <label>
        Username
        <input type="text" placeholder="Username" required></input>
      </label>
      <label>
        Email address
        <input type="email" placeholder="Email address" required></input>
      </label>
      <label>
        New password
        <input type="password" placeholder="New password" required></input>
      </label>
      <label>
        Avatar image (url)
        <input type="text" placeholder="Password" required></input>
      </label>
      <button className={classes.saveButton}>Save</button>
    </form>
  )
}

export default EditProfile
