/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import uniqid from 'uniqid'

import { onArticleCreation, onArticleEdition } from '../../redux/actions'
import Spinner from '../Spinner'

import classes from './NewArticle.module.scss'

const NewArticle = ({
  onArticleCreation,
  editMode = false,
  selectedArticle,
  history,
  newArticleCreationStatus,
  onArticleEdition,
}) => {
  console.log(selectedArticle?.slug)

  if (selectedArticle === null) {
    history.push('/')
  }
  const inputRef = useRef(null)
  const [tagList, setTagList] = useState([''])
  useEffect(() => {
    if (editMode) {
      setTagList(selectedArticle?.tagList)
    }
  }, [])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = ({ title, short_description, main_text }) => {
    if (editMode) {
      onArticleEdition(
        { title, description: short_description, body: main_text, tagList },
        history,
        selectedArticle?.slug
      )
    } else {
      onArticleCreation({ title, description: short_description, body: main_text, tagList }, history)
    }
  }

  // error style
  const error = {
    outline: '1px solid red',
  }

  if (newArticleCreationStatus === 'loading') {
    return (
      <div style={{ marginTop: '256px' }}>
        <Spinner />
      </div>
    )
  }

  return (
    <div className={classes.mainContainer}>
      <header className={classes.mainHeader}>{editMode ? 'Edit Article' : 'Create an article'}</header>
      <form className={classes.formBody} onSubmit={handleSubmit(onSubmit)}>
        <main>
          <label>
            Title{' '}
            <input
              style={errors?.title ? error : null}
              name="title"
              {...register('title', {
                required: {
                  value: true,
                  message: 'This field is required',
                },
              })}
              placeholder="Title"
              autoComplete="off"
              defaultValue={editMode ? selectedArticle?.title : ''}
            ></input>
            {<p className={classes.error}>{errors.title && errors.title.message}</p>}
          </label>
          <label>
            Short description{' '}
            <input
              style={errors?.short_description ? error : null}
              name="short_description"
              {...register('short_description', {
                required: {
                  value: true,
                  message: 'This field is required',
                },
              })}
              placeholder="Short description"
              autoComplete="off"
              defaultValue={editMode ? selectedArticle?.description : ''}
            ></input>
            {<p className={classes.error}>{errors.short_description && errors.short_description.message}</p>}
          </label>
          <label>
            Text
            <textarea
              style={errors?.main_text ? error : null}
              name="main_text"
              {...register('main_text', {
                required: {
                  value: true,
                  message: 'This field is required',
                },
              })}
              className={classes.mainText}
              placeholder="Text"
              autoComplete="off"
              defaultValue={editMode ? selectedArticle?.body : ''}
            ></textarea>
            {<p className={classes.error}>{errors.main_text && errors.main_text.message}</p>}
          </label>
        </main>
        <div className={classes.tagsContainer}>
          <label className={classes.tagsLabel}>Tags</label>
          <div className={classes.tagListContainer}>
            {tagList.map((item, index) => {
              return (
                <div className={classes.tagItemContainer} key={uniqid()}>
                  <input
                    placeholder="Tag"
                    autoComplete="off"
                    defaultValue={item}
                    name="tag"
                    ref={inputRef}
                    maxLength={16}
                  ></input>
                  <button
                    type="button"
                    className={classes.deleteButton}
                    hidden={
                      ((tagList.length === 1 && index === 0) || tagList.length - 1 === index) && tagList[0] === ''
                        ? true
                        : false
                    }
                    onClick={() => {
                      if (tagList.length - 1 !== index) {
                        setTagList(tagList.filter((_, i) => i !== index))
                        inputRef.current.value = ''
                      }
                      if (tagList[0] !== '' && tagList.length === 1) {
                        setTagList([''])
                        inputRef.current.value = ''
                      }
                    }}
                  >
                    Delete
                  </button>
                  <button
                    hidden={tagList.length - 1 === index ? false : true}
                    type="button"
                    className={classes.addButton}
                    onClick={() => {
                      if (inputRef.current.value !== '' && !tagList.includes(inputRef.current.value)) {
                        setTagList([inputRef.current.value.toString(), ...tagList])
                        inputRef.current.value = ''
                      } else {
                        inputRef.current.value = ''
                      }
                    }}
                  >
                    Add tag
                  </button>
                </div>
              )
            })}
          </div>
        </div>
        <button type="submit" className={classes.sendButton}>
          Send
        </button>
      </form>
    </div>
  )
}

const mapStateToProps = ({ dataReducer: { selectedArticle }, authReducer: { newArticleCreationStatus } }) => {
  return {
    selectedArticle,
    newArticleCreationStatus,
  }
}

const mapDispatchToProps = {
  onArticleCreation,
  onArticleEdition,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewArticle))
