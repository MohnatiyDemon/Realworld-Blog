import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import {
  useCreateAnArticleMutation,
  useGetAnArticleQuery,
  useUpdateAnArticleMutation,
} from '../../features/api/blogApi'
import styles from './CreateArticle.module.scss'

const CreateArticle = () => {
  const [tags, setTags] = useState([''])
  const navigate = useNavigate()
  const location = useLocation()
  const { slug } = useParams()
  const isEditing = location.pathname.includes('/edit')

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

  const [createArticle, { data, isError, isSuccess: isCreateSuccess, isLoading, error }] = useCreateAnArticleMutation()
  const [updateAnArticle, { isSuccess: isUpdateSuccess }] = useUpdateAnArticleMutation()
  const { data: articleData } = useGetAnArticleQuery(slug)

  const initialData =
    isEditing && articleData
      ? {
          title: articleData.article.title,
          description: articleData.article.description,
          body: articleData.article.body,
          tagList: articleData.article.tagList || [],
        }
      : {
          title: '',
          description: '',
          body: '',
          tagList: [],
        }

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: initialData })

  const newArticleSlug = data?.article?.slug

  const onSubmit = (data) => {
    const { title, description, body } = data
    if (isEditing) {
      updateAnArticle({ slug, title, description, body, tags })
    }
    if (!isEditing) {
      createArticle({
        title,
        description,
        body,
        tagList: tags,
      })
    }
  }

  useEffect(() => {
    if (isEditing && articleData) {
      setTags(articleData.article.tagList || [''])
    }
  }, [isEditing, articleData])

  useEffect(() => {
    if (isCreateSuccess) {
      navigate('/successful-message', { state: { from: 'new-article', articleSlug: newArticleSlug } })
    }
    if (isUpdateSuccess) {
      navigate('/successful-message', { state: { from: 'update-article', articleSlug: slug } })
    }
  }, [isCreateSuccess, isUpdateSuccess, slug, navigate])

  return (
    <form className={styles.CreateArticle} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles['form-title']}>{isEditing ? 'Edit Article' : 'Create New Article'}</h2>

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
