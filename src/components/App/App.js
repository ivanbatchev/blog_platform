import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { ARTICLES, ARTICLES_ID, ARTICLES_ID_EDIT, NEW_ARTICLE, PROFILE, ROOT, SIGN_IN, SIGN_UP } from '../../routes'
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
      <Route path={ROOT} component={HomePage} exact />
      <Route path={ARTICLES} component={HomePage} exact />
      <Route
        path="/"
        render={() => {
          return <Redirect to={ARTICLES} />
        }}
        exact
      />
      <PrivateRoute path={NEW_ARTICLE} component={NewArticlePage} />
      <Route path={SIGN_UP} component={SignUpPage} />
      <Route path={SIGN_IN} component={SignInPage} />
      <Route path={PROFILE} component={EditProfilePage} />
      <Route
        exact
        path={ARTICLES_ID}
        render={({
          match: {
            params: { id },
          },
        }) => {
          return <ArticleDetails slug={id} />
        }}
      />
      <Route
        path={ARTICLES_ID_EDIT}
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
