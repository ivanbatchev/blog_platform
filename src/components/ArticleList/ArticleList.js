/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Pagination } from '@mui/material'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { onError, onPageChange, onPageLoad } from '../../redux/actions'
import Article from '../Article'
import Spinner from '../Spinner/Spinner'
import ErrorIndicator from '../ErrorIndicator'

import classes from './ArticleList.module.scss'

const ArticleList = ({
  data,
  loading,
  error,
  pageCount,
  page,
  onPageLoad,
  onPageChange,
  isUserLoggedIn,
  userInfoWhenLoggedIn,
}) => {
  useEffect(() => {
    if (isUserLoggedIn) {
      onPageLoad(page, userInfoWhenLoggedIn.token)
    } else {
      onPageLoad(page)
    }
  }, [])

  const handlePaginationChange = ({ target: { innerText: pageNumber } }) => {
    onPageChange(+pageNumber)
    window.scrollTo(0, 0)
  }
  const pagination = (
    <Pagination page={page} count={pageCount} shape="rounded" color={'primary'} onChange={handlePaginationChange} />
  )

  const articleList = data.map((article) => {
    return <Article article={article} key={article.slug} />
  })

  if (error) {
    return <ErrorIndicator errorMessage={error.message} />
  }
  return (
    <main className={classes.mainWrapper}>
      {!loading ? articleList : <Spinner size={75} />}
      {!loading && pagination}
    </main>
  )
}

const mapStateToProps = ({
  dataReducer: { data, loading, error, pageCount, page },
  authReducer: { isUserLoggedIn, userInfoWhenLoggedIn },
}) => {
  return {
    data,
    page,
    loading,
    error,
    pageCount,
    isUserLoggedIn,
    userInfoWhenLoggedIn,
  }
}

const mapDispatchToProps = {
  onError,
  onPageChange,
  onPageLoad,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ArticleList))
