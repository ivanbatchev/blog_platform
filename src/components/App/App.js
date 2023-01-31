import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { HomePage, SignUpPage, SignInPage, EditProfilePage } from '../../pages'
import Header from '../Header'
import ArticleDetails from '../ArticleDetails'

import classes from './App.module.scss'

const App = () => (
  <div className={classes.app}>
    <Header />
    <Switch>
      <Route path={'/'} component={HomePage} exact />
      <Route path={'/articles'} component={HomePage} exact />
      <Route
        path="/"
        render={() => {
          return <Redirect to={'/articles'} />
        }}
        exact
      />
      <Route path={'/sign-up'} component={SignUpPage} />
      <Route path={'/sign-in'} component={SignInPage} />
      <Route path={'/profile'} component={EditProfilePage} />
      <Route
        path={'/articles/:id'}
        render={({
          match: {
            params: { id },
          },
        }) => {
          return <ArticleDetails slug={id} />
        }}
      />
    </Switch>
  </div>
)

export default App
