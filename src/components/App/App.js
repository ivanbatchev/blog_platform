import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { HomePage, SignUpPage, SignInPage, EditProfilePage, NewArticlePage } from '../../pages'
import Header from '../Header'
import ArticleDetails from '../ArticleDetails'
import PrivateRoute from '../../pages/PrivateRoute'
import NewArticle from '../NewArticle/NewArticle'

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
      <PrivateRoute path={'/new-article'} component={NewArticlePage} />
      <Route path={'/sign-up'} component={SignUpPage} />
      <Route path={'/sign-in'} component={SignInPage} />
      <Route path={'/profile'} component={EditProfilePage} />
      <Route
        exact
        path={'/articles/:id'}
        render={({
          match: {
            params: { id },
          },
        }) => {
          return <ArticleDetails slug={id} />
        }}
      />
      <Route
        path={'/articles/:id/edit'}
        render={({
          match: {
            params: { id },
          },
        }) => {
          return <NewArticle slug={id} editMode={true} />
        }}
      />
    </Switch>
  </div>
)

export default App
