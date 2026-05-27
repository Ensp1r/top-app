import cn from 'classnames'
import { motion } from 'framer-motion'
import Image from "next/image"
import { ForwardedRef, forwardRef, JSX, useRef, useState } from "react"
import { declOfNum, priceRu } from "../../helpers/helpers"
import { Button } from "../Button/Button"
import { Card } from "../Card/Card"
import { Divider } from "../Divider/Divider"
import { Rating } from "../Rating/Rating"
import { Review } from '../Review/Review'
import { ReviewForm } from '../ReviewForm/ReviewForm'
import { Tag } from "../Tag/Tag"
import styles from './Product.module.css'
import { ProductProps } from "./Product.props"


export const Product = motion(forwardRef(( { product, className, ...props }: ProductProps, ref: ForwardedRef<HTMLDivElement> ): JSX.Element => {
    const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false)
    const reviewRef = useRef<HTMLDivElement>(null)

    const variants = {
        visible: {
            opacity: 1,
            height: 'auto'
        },
        hidden: {
            opacity: 0,
            height: 0
        }
    }
    
    const scrollToReview = () => {
        setIsReviewOpened(true)
        reviewRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
        reviewRef.current?.focus()
    }

    

    return (
        <div className={className} ref={ref} {...props}>
            <Card className={styles.product}>
                <div className={styles.logo}>
                    <Image 
                        src={product.image}
                        alt={product.title}
                        width={70}
                        height={70}
                        unoptimized
                    />
                </div>
                <div className={styles.title}>{product.title}</div>
                <div className={styles.price}>
                    <span className='visualyHidden'>Цена</span>{priceRu(product.price)}
                    {
                        product.oldPrice && 
                        <Tag className={styles.oldPrice} color="green">
                            <span className='visualyHidden'>Скидка</span>
                            {priceRu(product.price - product.oldPrice)}
                        </Tag>
                    }
                </div>
                <div className={styles.credit}>
                    <span className='visualyHidden'>Кредит</span>{priceRu(product.credit)}
                    <span className={styles.month}>/мес</span>
                </div>
                <div className={styles.rating}>
                    <span className='visualyHidden'>{'рейтинг' + (product.reviewAvg ?? product.initialRating)}</span>
                    <Rating rating={product.reviewAvg ?? product.initialRating}/>
                </div>
                <div className={styles.tags}>{product.categories.map(category => <Tag key={category} className={styles.category} color='ghost'>{category}</Tag>)}</div>
                <div className={styles.priceTitle} aria-hidden={true}>цена</div>
                <div className={styles.creditTitle} aria-hidden={true}>кредит</div>
                <div className={styles.rateTitle}>
                    <a href='#ref' onClick={scrollToReview}>
                        {product.reviewCount} {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
                    </a>
                </div>
                <Divider className={styles.hr}/>
                <div className={styles.description}>{product.description}</div>
                <div className={styles.feature}>
                    {product.characteristics.map(characteristic => (
                        <div className={styles.characteristics} key={characteristic.name}>
                            <span className={styles.characteristicsName}>{characteristic.name}</span>
                            <span className={styles.characteristicsDots}></span>
                            <span className={styles.characteristicsValue}>{characteristic.value}</span>
                        </div>
                    ))}
                </div>
                <div className={styles.advBlock}>
                    {product.advantages &&
                    <div className={styles.advantages}>
                        <div className={styles.advTitle}>Преимущества</div>
                        <div>{product.advantages}</div>
                    </div>}
                    {product.disadvantages &&
                    <div className={styles.disadvantages}>
                        <div className={styles.advTitle}>Недостатки</div>
                        <div>{product.disadvantages}</div>
                    </div>}                     
                </div>
                <Divider className={cn(styles.hr, styles.hr2)}/>
                <div className={styles.actions}>
                    <Button appearance="primary">Узнать подробнее</Button>
                    <Button 
                        onClick={() => setIsReviewOpened(!isReviewOpened)}
                        className={styles.reviewButton} 
                        appearance="ghost" 
                        arrow={isReviewOpened ? 'down' : 'right'}
                        aria-expanded={isReviewOpened}
                    >
                        Читать отзывы
                    </Button>
                </div>
            </Card>
            
            <motion.div
                variants={variants}
                initial={'hidden'}
                animate={isReviewOpened ? 'visible' : 'hidden'}
            >
                <Card color='blue' className={cn(styles.reviews)} ref={reviewRef} tabIndex={isReviewOpened ? 0 : -1 }>
                    {product.reviews.map(review => (
                        <div key={review._id}>
                            <Review review={review}/>
                            <Divider />
                        </div>
                    ))}
                    <ReviewForm productId={product._id} isOpened={isReviewOpened}/>
                </Card>
            </motion.div>
        </div>
    )
}))  