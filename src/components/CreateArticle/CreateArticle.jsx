import { useForm } from 'react-hook-form'
import { useCreateAnArticleMutation } from '../../features/api/blogApi'
import styles from './CreateArticle.module.scss'

const CreateArticle = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  const [createArticle, { isError, isSuccess, isLoading, error }] = useCreateAnArticleMutation()

  const onSubmit = (data) => {
    createArticle({
      title: data.title,
      description: data.description,
      body: data.body,
      tags: data.tag,
    })
  }

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
      <label className={styles['form-label']}>
        <span>Tags</span>
        <input
          className={`${styles['form-input']} ${styles['form-input--tag']} `}
          type="text"
          placeholder="Tag"
          {...register('tag')}
        />
      </label>
      <label className={styles['form-label']}>
        <span>Tags</span>
        <input
          className={`${styles['form-input']} ${styles['form-input--tag']} `}
          type="text"
          placeholder="Tag"
          {...register('tag')}
        />
      </label>
      <input className={styles['form-submit']} type="submit" value="Send" />
    </form>
  )
}

export default CreateArticle
