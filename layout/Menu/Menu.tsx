import cn from 'classnames';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { JSX, KeyboardEvent, useContext } from "react";
import { AppContext } from "../../context/app.context";
import { firstLevelMenu } from '../../helpers/helpers';
import { PageItem } from "../../interfaces/menu.interface";
import styles from './Menu.module.css';



export const Menu = (): JSX.Element => {
    const { menu, setMenu, firstCategory } = useContext(AppContext)
    const router = useRouter()

    const variants = {
        visible: {
            marginBottom: 20,
            transition: {
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
            opacity: 0,
            height: 0
        }
    }

    const OpenSecondLevel = (secondCategory: string) => {
        setMenu && setMenu(menu.map(menuItem => {
            if (menuItem._id.secondCategory == secondCategory) {
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
            <>
                {firstLevelMenu.map(menuItem => (
                    <div key={menuItem.route}>
                        <Link href={`/${menuItem.route}`}>
                            <div className={cn(styles.firstLevel, {
                                [styles.firstLevelActive]: menuItem.id == firstCategory
                            })}>
                                {menuItem.icon}
                                <span>{menuItem.name}</span>
                            </div>
                        </Link>
                        {menuItem.id == firstCategory && BuildSecondLevel(menuItem.route)}
                    </div>
                ))}
            </>
        )
    }

    const BuildSecondLevel = (route: string) => {
        return (
            <div className={styles.secondBlock}>
                {menu.map(menuItem => {
                    if (menuItem.pages.map(page => page.alias).includes(router.asPath.split('/')[2])) {
                        menuItem.isOpened = true
                    }
                    return (
                        <div key={menuItem._id.secondCategory}>
                            <div 
                                tabIndex={0} 
                                onKeyDown={(key: KeyboardEvent) => OpenSecondLevelKey(key, menuItem._id.secondCategory)}
                                className={styles.secondLevel} 
                                onClick={() => OpenSecondLevel(menuItem._id.secondCategory)}
                            >
                                {menuItem._id.secondCategory}
                            </div>
                            <motion.div 
                                layout
                                variants={variants}
                                initial={menuItem.isOpened ? 'visible' : 'hidden'}
                                animate={menuItem.isOpened ? 'visible' : 'hidden'}
                                className={cn(styles.secondLevelBlock)}
                            >
                                {BuildThirdLevel(menuItem.pages, route, menuItem.isOpened ?? false)}
                            </motion.div>
                        </div>
                    )
                })}
            </div>
        )
    }

    const BuildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => {
        return (
            pages.map(page => (
                <motion.div 
                    key={page._id}
                    variants={variantsChildren}
                >
                    <Link 
                        tabIndex={isOpened ? 0 : -1}
                        href={`/${route}/${page.alias}`} 
                        className={cn(styles.thirdLevel, {
                        [styles.thirdLevelActive]: `/${route}/${page.alias}` == router.asPath
                    })}>
                        {page.title}
                    </Link>
                </motion.div>
            ))
        )
    }

    return (
        <div className={styles.menu}>
            {BuildFirstLevel()}
        </div>
    )
}