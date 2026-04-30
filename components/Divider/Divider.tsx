import cn from 'classnames';
import { JSX } from "react";
import styles from './Divider.module.css';
import { DividerProps } from "./Divider.props";



export const Divider = ( { className, ...props }: DividerProps ): JSX.Element => {
    return (
        <hr className={cn(className, styles.hr)} {...props} />
    )
}