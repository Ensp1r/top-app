import cn from 'classnames'
import { JSX } from 'react'
import styles from './Input.module.css'
import { InputProps } from './Input.props'

export const Input = ( { className, ...props }: InputProps ): JSX.Element => {
    return (
        <input className={cn(className, styles.input)} {...props} />
    )
}