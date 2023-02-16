import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { Popover } from '@mui/material'

import { ARTICLES, EDIT } from '../../routes'
import { onArticleDelete, onArticleLike, onArticleDislike } from '../../redux/actions'
import { dateFormater } from '../../utils/'
import { exclamation, like, liked } from '../../assets/icons'

import classes from './Article.module.scss'

const Article = ({
  article,
  history,
  selected = false,
  userInfoWhenLoggedIn,
  onArticleDelete,
  onArticleLike,
  isUserLoggedIn,
  onArticleDislike,
}) => {
  // working with popover
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
  const {
    description,
    title,
    tagList,
    createdAt,
    author: { username, image },
    favoritesCount,
    body,
  } = article

  const [likesCount, setLikesCount] = useState(favoritesCount)
  const [isLiked, setLikeStatus] = useState(article.favorited)

  const handleArticleDelete = () => {
    onArticleDelete(article.slug, history)
  }
  const articleHeader = (
    <div className={classes.headerWrapper}>
      <div className={classes.articleDescription}>
        <header>
          <h5
            onClick={() => {
              if (history.location.pathname !== ARTICLES + article.slug) {
                history.push(ARTICLES + article.slug)
              }
            }}
          >
            {title}
          </h5>
          <div className={classes.likesWrapper}>
            <button>
              <img
                src={isLiked ? liked : like}
                alt="like-button"
                onClick={() => {
                  if (!isLiked && isUserLoggedIn) {
                    setLikeStatus(true)
                    setLikesCount((current) => current + 1)
                    onArticleLike(article.slug)
                  }
                  if (isLiked && isUserLoggedIn) {
                    setLikeStatus(false)
                    setLikesCount((current) => current - 1)
                    onArticleDislike(article.slug)
                  }
                }}
              />
            </button>
            <span>{likesCount === 0 ? '' : likesCount}</span>
          </div>
        </header>
        <div className={classes.tagsWrapper}>
          {tagList.map((tag, index) => {
            return (
              <div className={classes.activeTag} key={article.slug + tag + index}>
                {tag.length > 25 ? tag.slice(0, 25) + '...' : tag}
              </div>
            )
          })}
        </div>
        <main>{!description ? '' : description}</main>
      </div>
      <div>
        <div className={classes.creatorDescription}>
          <div className={classes.info}>
            <h3 className={classes.name}>{username}</h3>
            <div className={classes.articleDate}>{dateFormater(createdAt)}</div>
          </div>
          <div className={classes.imageContainer} style={{ backgroundImage: `url(${image})` }}></div>
        </div>
        {selected && article?.author?.username === userInfoWhenLoggedIn?.username && (
          <div className={classes.buttonsContainer}>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <div className={classes.deleteModalContainer}>
                <div className={classes.headerContainer}>
                  <img src={exclamation} alt="exl mark"></img>
                  <p>Are you sure you want to delete this article?</p>
                </div>
                <div className={classes.modalButtonsContainer}>
                  <button className={classes.noButton} onClick={handleClose}>
                    No
                  </button>
                  <button className={classes.yesButton} onClick={handleArticleDelete}>
                    Yes
                  </button>
                </div>
              </div>
            </Popover>
            <button className={classes.deleteArticle} onClick={handleClick}>
              Delete
            </button>
            <button
              className={classes.editArticle}
              onClick={() => {
                if (history.location.pathname !== ARTICLES + article.slug + EDIT) {
                  history.push(ARTICLES + article.slug + EDIT)
                }
              }}
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  )

  const articleBody = (
    <div className={{ fontSize: '18px' }}>
      <ReactMarkdown>{body}</ReactMarkdown>
    </div>
  )

  return (
    <div className={classes.articleWrapper}>
      {articleHeader}
      {selected && articleBody}
    </div>
  )
}

const mapStateToProps = ({
  authReducer: { userInfoWhenLoggedIn, isUserLoggedIn },
  dataReducer: { selectedArticle },
}) => {
  return {
    userInfoWhenLoggedIn,
    selectedArticle,
    isUserLoggedIn,
  }
}

const mapDispatchToProps = {
  onArticleLike,
  onArticleDelete,
  onArticleDislike,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Article))
