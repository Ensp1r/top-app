import cn from 'classnames';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { JSX, KeyboardEvent, useContext, useState } from "react";
import { AppContext } from "../../context/app.context";
import { firstLevelMenu } from '../../helpers/helpers';
import { PageItem } from "../../interfaces/menu.interface";
import styles from './Menu.module.css';



export const Menu = (): JSX.Element => {
    const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>()
    const { menu, setMenu, firstCategory } = useContext(AppContext)
    const shouldReduceMotion = useReducedMotion()
    const router = useRouter()

    const variants = {
        visible: {
            marginBottom: 20,
            transition: shouldReduceMotion ? {} : {
                when: 'beforeChildren',
                straggerChildren: 0.1
            }
        },
        hidden: {
            marginBottom: 0
        }
    }

    const variantsChildren = {
        visible: {
            opacity: 1,
            height: 48
        },
        hidden: {
            opacity: shouldReduceMotion ? 1 : 0,
            height: 0
        }
    }

    const OpenSecondLevel = (secondCategory: string) => {
        setMenu && setMenu(menu.map(menuItem => {
            if (menuItem._id.secondCategory == secondCategory) {
                setAnnounce(menuItem.isOpened ? 'closed' : 'opened')
                menuItem.isOpened = !menuItem.isOpened  
            }
            return menuItem
        }))
    }

    const OpenSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
        if (key.code == 'Space' || key.code == 'Enter') {
            key.preventDefault()
            OpenSecondLevel(secondCategory)
        }
    }

    const BuildFirstLevel = () => {
        return (
            <ul className={styles.firstLevelList}>
                {firstLevelMenu.map(menuItem => (
                    <li key={menuItem.route} aria-expanded={menuItem.id == firstCategory}>
                        <Link href={`/${menuItem.route}`}>
                            <div className={cn(styles.firstLevel, {
                                [styles.firstLevelActive]: menuItem.id == firstCategory
                            })}>
                                {menuItem.icon}
                                <span>{menuItem.name}</span>
                             </div>
                        </Link>
                        {menuItem.id == firstCategory && BuildSecondLevel(menuItem.route)}
                    </li>
                ))}
            </ul>
        )
    }

    const BuildSecondLevel = (route: string) => {
        return (
            <ul className={styles.secondBlock}>
                {menu.map(menuItem => {
                    if (menuItem.pages.map(page => page.alias).includes(router.asPath.split('/')[2])) {
                        menuItem.isOpened = true
                    }
                    return (
                        <li key={menuItem._id.secondCategory}>
                            <button 
                                onKeyDown={(key: KeyboardEvent) => OpenSecondLevelKey(key, menuItem._id.secondCategory)}
                                className={styles.secondLevel} 
                                onClick={() => OpenSecondLevel(menuItem._id.secondCategory)}
                                aria-expanded={menuItem.isOpened}
                            >
                                {menuItem._id.secondCategory}
                            </button>
                            <motion.ul 
                                layout
                                variants={variants}
                                initial={menuItem.isOpened ? 'visible' : 'hidden'}
                                animate={menuItem.isOpened ? 'visible' : 'hidden'}
                                className={styles.secondLevelBlock}
                            >
                                {BuildThirdLevel(menuItem.pages, route, menuItem.isOpened ?? false)}
                            </motion.ul>
                        </li>
                    )
                })}
            </ul>
        )
    }

    const BuildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => {
        return (
            pages.map(page => (
                <motion.li 
                    key={page._id}
                    variants={variantsChildren}
                >
                    <Link 
                        aria-current={`/${route}/${page.alias}` == router.asPath ? 'page' : false}
                        tabIndex={isOpened ? 0 : -1}
                        href={`/${route}/${page.alias}`} 
                        className={cn(styles.thirdLevel, {
                        [styles.thirdLevelActive]: `/${route}/${page.alias}` == router.asPath
                    })}>
                        {page.title}
                    </Link>
                </motion.li>
            ))
        )
    }

    return (
        <nav className={styles.menu} role='navigation'>
            {announce && <span className='visualyHidden' role='log'>{announce == 'opened' ? 'развернуто' : 'свернуто'}</span>}
            {BuildFirstLevel()}
        </nav>
    )
}