import React from 'react'
import { withRouter } from 'react-router-dom'
import uniqid from 'uniqid'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

import { dateFormat } from '../../utils/dateFormater'
import { like } from '../../assets/icons'

import classes from './Article.module.scss'

const Article = ({ article, history, selected = false }) => {
  const {
    description,
    title,
    tagList,
    createdAt,
    author: { username, image },
    favoritesCount,
    body,
  } = article

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

export default withRouter(Article)
