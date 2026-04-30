import cn from 'classnames';
import { ForwardedRef, forwardRef, JSX, KeyboardEvent, useEffect, useState } from "react";
import styles from './Rating.module.css';
import { RatingProps } from "./Rating.props";
import StarIcon from './star.svg';


export const Rating = forwardRef(( { isEditable = false, rating, setRating, error, ...props }: RatingProps, ref: ForwardedRef<HTMLDivElement> ): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>))

    useEffect(() => {
        constructRating(rating)
    }, [rating])

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
                >
                    <StarIcon 
                        tabIndex={isEditable ? 0 : -1}
                        onKeyDown={(e: KeyboardEvent<SVGAElement>) => isEditable && handleSpace(index + 1, e) }
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

    const handleSpace = (index: number, e: KeyboardEvent<SVGAElement>) => {
        if (e.code != 'Space' || !setRating) return
        setRating(index)
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