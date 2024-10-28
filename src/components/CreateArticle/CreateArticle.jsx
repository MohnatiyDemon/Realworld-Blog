import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useCreateAnArticleMutation } from '../../features/api/blogApi'
import styles from './CreateArticle.module.scss'

const CreateArticle = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()
  const [tags, setTags] = useState([''])
  const navigate = useNavigate()

  const addTagField = () => {
    setTags([...tags, ''])
  }
  const removeTagField = (index) => {
    setTags(tags.filter((_, i) => i !== index))
  }

  const handleTagChange = (index, value) => {
    const newTags = [...tags]
    newTags[index] = value
    setTags(newTags)
  }

  const [createArticle, { isError, isSuccess, isLoading, error }] = useCreateAnArticleMutation()

  const onSubmit = (data) => {
    createArticle({
      title: data.title,
      description: data.description,
      body: data.body,
      tagList: tags,
    })
  }

  useEffect(() => {
    if (isSuccess) {
      navigate('/successful-message')
    }
  }, [isSuccess, navigate])

  return (
    <form className={styles.CreateArticle} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles['form-title']}>Create new article</h2>

      <label className={styles['form-label']}>
        <span>Title</span>
        <input
          className={styles['form-input']}
          type="text"
          placeholder="Title"
          {...register('title', {
            required: 'Title is required',
          })}
        />
        {errors.title && <p className={styles['error-message']}>{errors.title.message}</p>}
      </label>

      <label className={styles['form-label']}>
        <span>Short description</span>
        <input
          className={styles['form-input']}
          type="text"
          placeholder="Short description"
          {...register('description', {
            required: 'Short description is required',
          })}
        />
        {errors.description && <p className={styles['error-message']}>{errors.description.message}</p>}
      </label>

      <label className={styles['form-label']}>
        <span>Text</span>
        <textarea
          className={`${styles['form-input']} ${styles['form-input--textarea']}`}
          type="text"
          placeholder="Text"
          {...register('body', {
            required: 'Text is required',
          })}
        />
        {errors.body && <p className={styles['error-message']}>{errors.body.message}</p>}
      </label>

      <span>Tags</span>
      <div className={styles['tag-container']}>
        {tags.map((tag, index) => (
          <label key={index} className={`${styles['form-label']} ${styles['form-label--tags']}`}>
            <input
              className={`${styles['form-input']} ${styles['form-input--tag']}`}
              type="text"
              placeholder="Tag"
              value={tag}
              onChange={(e) => handleTagChange(index, e.target.value)}
            />
            <button
              type="button"
              className={`${styles['remove-tag-button']} ${styles.button}`}
              onClick={() => removeTagField(index)}
            >
              Delete
            </button>
          </label>
        ))}
        <button type="button" className={`${styles['add-tag-button']} ${styles.button}`} onClick={addTagField}>
          Add Tag
        </button>
      </div>

      <input className={styles['form-submit']} type="submit" value="Send" />
    </form>
  )
}

export default CreateArticle
