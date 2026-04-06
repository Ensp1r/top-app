import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { JSX, useContext } from "react";
import { AppContext } from "../../context/app.context";
import { firstLevelMenu } from '../../helpers/helpers';
import { PageItem } from "../../interfaces/menu.interface";
import styles from './Menu.module.css';



export const Menu = (): JSX.Element => {
    const { menu, setMenu, firstCategory } = useContext(AppContext)
    const router = useRouter()
    
    const OpenSecondLevel = (secondCategory: string) => {
        setMenu && setMenu(menu.map(menuItem => {
            if (menuItem._id.secondCategory == secondCategory) {
                menuItem.isOpened = !menuItem.isOpened  
            }
            return menuItem
        }))
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
                        <div key={menuItem._id.secondCategory} onClick={() => OpenSecondLevel(menuItem._id.secondCategory)}>
                            <div className={styles.secondLevel}>{menuItem._id.secondCategory}</div>
                            <div className={cn(styles.secondLevelBlock, {
                                [styles.secondLevelBlockOpened]: menuItem.isOpened
                            })}>
                                {BuildThirdLevel(menuItem.pages, route)}
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    const BuildThirdLevel = (pages: PageItem[], route: string) => {
        return (
            pages.map(page => (
                <Link href={`/${route}/${page.alias}`} className={cn(styles.thirdLevel, {
                    [styles.thirdLevelActive]: `/${route}/${page.alias}` == router.asPath
                })}>
                    {page.title}
                </Link>
            ))
        )
    }

    return (
        <div className={styles.menu}>
            {BuildFirstLevel()}
        </div>
    )
}