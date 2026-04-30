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


export const ReviewForm = (( { productId, className, ...props }: ReviewFormProps ): JSX.Element => {
    const { register, control, handleSubmit, formState: { errors }, reset } = useForm<IReviewForm>()
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

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={cn(styles.reviewForm, className)}
                {...props}
            >
                <Input 
                    {...register('name', { required: { value: true, message: 'Заполните имя' } })} 
                    placeholder='Имя'
                    error={errors.name}
                />
                <Input 
                    {...register('title', { required: { value: true, message: 'Заполните заголовок' } })} 
                    placeholder='Заголовок отзыва' 
                    error={errors.title}
                    className={styles.title} 
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
                            />
                        )}
                    />
                </div>
                <Textarea 
                    {...register('description', { required: { value: true, message: 'Заполните описание' } })} 
                    placeholder='Текст отзыва' 
                    error={errors.description}
                    className={styles.description} 
                />
                <div className={styles.submit}>
                    <Button appearance='primary'>Отправить</Button>
                    <span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
                </div>
            </div>

            {isSuccess && <div className={cn(styles.success, styles.panel)}>
                <div className={styles.succesTitle}>Ваш отзыв отправлен.</div>
                <div>Благодарим вас. После модерации ваш отзыв появится на сайте.</div>
                <CloseIcon className={styles.close} onClick={() => setIsSuccess(false)}/>
            </div>}
            {error && <div className={cn(styles.error, styles.panel)}>
                Что-то пошло не так... Попробуйте обновить страницу или вернуться позже.
                <CloseIcon className={styles.close} onClick={() => setError(undefined)}/>
            </div>}
        </form>
    )
})