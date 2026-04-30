import cn from 'classnames'
import Image from "next/image"
import { JSX, useRef, useState } from "react"
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


export const Product = ( { product, className, ...props }: ProductProps ): JSX.Element => {
    const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false)
    const reviewRef = useRef<HTMLDivElement>(null)

    const scrollToReview = () => {
        setIsReviewOpened(true)
        reviewRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    }

    return (
        <div className={className} {...props}>
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
                    {priceRu(product.price)}
                    {product.oldPrice && <Tag className={styles.oldPrice} color="green">{priceRu(product.price - product.oldPrice)}</Tag>}
                </div>
                <div className={styles.credit}>
                    {priceRu(product.credit)}
                    <span className={styles.month}>/мес</span>
                </div>
                <div className={styles.rating}><Rating rating={product.reviewAvg ?? product.initialRating}/></div>
                <div className={styles.tags}>{product.categories.map(category => <Tag key={category} className={styles.category} color='ghost'>{category}</Tag>)}</div>
                <div className={styles.priceTitle}>цена</div>
                <div className={styles.creditTitle}>кредит</div>
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
                    >
                        Читать отзывы
                    </Button>
                </div>
            </Card>

            <Card color='blue' className={cn(styles.reviews, {
                [styles.opened]: isReviewOpened,
                [styles.closed]: !isReviewOpened,
            })} ref={reviewRef}>
                {product.reviews.map(review => (
                    <div key={review._id}>
                        <Review review={review}/>
                        <Divider />
                    </div>
                ))}
                <ReviewForm productId={product._id}/>
            </Card>
        </div>
    )
} 