import axios, { AxiosError } from 'axios';
import cn from 'classnames';
import { JSX, useState } from "react";
import { Controller, useForm } from 'react-hook-form';
import { API } from '../../helpers/api';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Rating } from '../Rating/Rating';
import { Textarea } from '../Textarea/Textarea';
import { IReviewForm, IReviewSentResponse } from './ReviewForm.interface';
import styles from './ReviewForm.module.css';
import { ReviewFormProps } from "./ReviewForm.props";
import CloseIcon from './close.svg';


export const ReviewForm = (( { productId, isOpened, className, ...props }: ReviewFormProps ): JSX.Element => {
    const { register, control, handleSubmit, formState: { errors }, reset, clearErrors } = useForm<IReviewForm>()
    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    const [error, setError] = useState<string>()

    const onSubmit = async (formData: IReviewForm) => {
        try {
            const { data } = await axios.post<IReviewSentResponse>(API.review.createDemo, { ...formData, productId })
            if (data.message) {
                setIsSuccess(true)
                reset()
            } else {
                setError('Что-то пошло не так...')
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                setError(err.response?.data?.message || err.message)
            } else if (err instanceof Error) {
                setError(err.message)
            } else {
                setError('Что-то пошло не так...')
            }
        } 
    } 

    const handleKeySuccess = (key: KeyboardEvent) => {
        if (key.code == 'Space' || key.code == 'Enter') {
            key.preventDefault()
            setIsSuccess(false)
        }
    }

    const handleKeyError = (key: KeyboardEvent) => {
        if (key.code == 'Space' || key.code == 'Enter') {
            key.preventDefault()
            setError(undefined)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={cn(styles.reviewForm, className)}
                {...props}
            >
                <Input 
                    {...register('name', { required: { value: true, message: 'Заполните имя' } })} 
                    placeholder='Имя'
                    error={errors.name}
                    tabIndex={isOpened ? 0 : -1}
                    aria-invalid={errors.name ? true : false}
                />
                <Input 
                    {...register('title', { required: { value: true, message: 'Заполните заголовок' } })} 
                    placeholder='Заголовок отзыва' 
                    error={errors.title}
                    className={styles.title} 
                    tabIndex={isOpened ? 0 : -1}
                    aria-invalid={errors.name ? true : false}
                />
                <div className={styles.rating}>
                    <span>Оценка:</span>
                    <Controller 
                        control={control}
                        name='rating'
                        rules={{ required: { value: true, message: 'Выставьте рейтинг' } }}
                        render={({ field }) => (
                            <Rating 
                                isEditable 
                                rating={field.value} 
                                ref={field.ref} 
                                setRating={field.onChange} 
                                error={errors.rating}
                                tabIndex={isOpened ? 0 : -1}
                            />
                        )}
                    />
                </div>
                <Textarea 
                    {...register('description', { required: { value: true, message: 'Заполните описание' } })} 
                    placeholder='Текст отзыва' 
                    error={errors.description}
                    className={styles.description} 
                    tabIndex={isOpened ? 0 : -1}
                    aria-label={'Текст отзыва'}
                    aria-invalid={errors.description ? true : false}
                />
                <div className={styles.submit}>
                    <Button appearance='primary' tabIndex={isOpened ? 0 : -1} onClick={() => clearErrors()} >Отправить</Button>
                    <span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
                </div>
            </div>

            {isSuccess && <div className={cn(styles.success, styles.panel)} role='alert'>
                <div className={styles.succesTitle} >Ваш отзыв отправлен.</div>
                <div>Благодарим вас. После модерации ваш отзыв появится на сайте.</div>
                <button 
                    className={styles.close}
                    onClick={() => setIsSuccess(false)}
                    aria-label='Закрыть статус оповещения'
                >
                    <CloseIcon/>
                </button>
            </div>}
            {error && <div className={cn(styles.error, styles.panel)} role='alert'>
                Что-то пошло не так... Попробуйте обновить страницу или вернуться позже.
                <button 
                    className={styles.close} 
                    onClick={() => setError(undefined)}
                    aria-label='Закрыть статус оповещения'
                >
                    <CloseIcon/>
                </button>
            </div>}
        </form>
    )
})