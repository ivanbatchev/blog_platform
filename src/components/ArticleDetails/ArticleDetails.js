import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import Article from '../Article/Article'
import { onArticleSelection } from '../../redux/actions'
import Spinner from '../Spinner/Spinner'

import classes from './ArticleDetails.module.scss'

const ArticleDetails = ({ slug, onArticleSelection, loading, selectedArticle }) => {
  useEffect(() => {
    onArticleSelection(slug)
  }, [])

  const visibleContent =
    loading || selectedArticle === null ? (
      <Spinner />
    ) : (
      <section className={classes.articleWrapper}>
        <Article article={selectedArticle} selected />
      </section>
    )
  return visibleContent
}

const mapStateToProps = ({ dataReducer: { loading, selectedArticle } }) => {
  return {
    selectedArticle,
    loading,
  }
}

const mapDispatchToProps = {
  onArticleSelection,
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetails)
