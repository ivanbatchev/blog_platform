import React from 'react'
import { withRouter } from 'react-router-dom'
import uniqid from 'uniqid'
import { connect } from 'react-redux'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { Popover } from '@mui/material'

import { onArticleDelete } from '../../redux/actions'
import { dateFormat } from '../../utils/dateFormater'
import { exclamation, like } from '../../assets/icons'

import classes from './Article.module.scss'

const Article = ({ article, history, selected = false, userInfoWhenLoggedIn, onArticleDelete }) => {
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

  const handleArticleDelete = () => {
    onArticleDelete(article.slug, history)
  }
  const articleHeader = (
    <div className={classes.headerWrapper}>
      <div className={classes.articleDescription}>
        <header>
          <h5
            onClick={() => {
              if (history.location.pathname !== `/articles/${article.slug}`) {
                history.push(`/articles/${article.slug}`)
              }
            }}
          >
            {title}
          </h5>
          <div className={classes.likesWrapper}>
            <button>
              <img src={like} alt="like-button" />
            </button>
            <span>{favoritesCount === 0 ? '' : favoritesCount}</span>
          </div>
        </header>
        <div className={classes.tagsWrapper}>
          {tagList.map((tag) => {
            return (
              <div className={classes.activeTag} key={uniqid()}>
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
            <div className={classes.articleDate}>{dateFormat(createdAt)}</div>
          </div>
          <div
            className={classes.imageContainer}
            style={{
              backgroundImage: `url(${image})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
            }}
          ></div>
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
              <div style={{ width: '240px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex' }}>
                  <img src={exclamation} alt="exl mark" style={{ alignSelf: 'flex-start', margin: '16px' }}></img>
                  <p style={{ margin: '0px', padding: '0px', marginTop: '8px', marginBottom: '16px' }}>
                    Are you sure you want to delete this article?
                  </p>
                </div>
                <div style={{ alignSelf: 'flex-end', marginBottom: '8px' }}>
                  <button style={{ marginRight: '8px' }} className={classes.noButton} onClick={handleClose}>
                    No
                  </button>
                  <button style={{ marginRight: '16px' }} className={classes.yesButton} onClick={handleArticleDelete}>
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
                if (history.location.pathname !== `/articles/${article.slug}/edit`) {
                  history.push(`/articles/${article.slug}/edit`)
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

const mapStateToProps = ({ authReducer: { userInfoWhenLoggedIn }, dataReducer: { selectedArticle } }) => {
  return {
    userInfoWhenLoggedIn,
    selectedArticle,
  }
}

const mapDispatchToProps = {
  onArticleDelete,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Article))
