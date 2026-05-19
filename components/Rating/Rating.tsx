import cn from 'classnames';
import { ForwardedRef, forwardRef, JSX, KeyboardEvent, useEffect, useRef, useState } from "react";
import styles from './Rating.module.css';
import { RatingProps } from "./Rating.props";
import StarIcon from './star.svg';


export const Rating = forwardRef(( { isEditable = false, rating, setRating, error, tabIndex, ...props }: RatingProps, ref: ForwardedRef<HTMLDivElement> ): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>))
    const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([])

    const computeFocus = (rating: number, index: number): number => {
        if (!isEditable) return -1
        if (!rating && index == 0) return tabIndex ?? 0
        if (rating == index + 1) return tabIndex ?? 0

        return -1
    }

    useEffect(() => {
        constructRating(rating)
    }, [rating, tabIndex])

    const constructRating = (currentRating: number) => {
        const updatedArray = ratingArray.map(( rat: JSX.Element, index: number ) => {
            return (
                <span
                    className={cn(styles.star, {
                        [styles.filled]: index < currentRating,
                        [styles.editable]: isEditable,
                    })}
                    onMouseEnter={() => changeDisplay(index + 1)}
                    onMouseLeave={() => changeDisplay(rating)}
                    onClick={() => onClick(index + 1)}
                    tabIndex={computeFocus(rating, index)}
                    onKeyDown={handleKey}
                    ref={r => {ratingArrayRef.current?.push(r)}}
                >
                    <StarIcon 
                    />
                </span>
            )
        })

        setRatingArray(updatedArray)
    }

    const changeDisplay = (index: number) => {
        if (!isEditable) return
        constructRating(index)
    }

    const onClick = (index: number) => {
        if (!isEditable || !setRating) return
        setRating(index)
    }

    const handleKey = (e: KeyboardEvent) => {
        if (!isEditable || !setRating) return
        if (e.code == 'ArrowRight' || e.code == 'ArrowUp') {
            if (!rating) {
                setRating(1)
            } else {
                e.preventDefault()
                setRating(rating < 5 ? rating + 1 : 5)
            }
            ratingArrayRef.current[rating]?.focus()
        }
        if (e.code == 'ArrowLeft' || e.code == 'ArrowDown') {
            e.preventDefault()
            setRating(rating > 0 ? rating - 1 : 0)
            ratingArrayRef.current[rating - 2]?.focus()
        }
    }

    return (
        <div {...props} ref={ref} className={cn(styles.ratingWrapper, {
            [styles.error]: error
        })}>
            {ratingArray.map( (rating, index) => (<span key={index}>{rating}</span>) )}
            {error && <span className={styles.errorMessage}>{error.message}</span>}
        </div>
    )
})