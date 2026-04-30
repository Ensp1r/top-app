import axios from 'axios';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from 'querystring';
import { JSX } from "react";
import { API } from '../../helpers/api';
import { firstLevelMenu } from "../../helpers/helpers";
import { MenuItem } from "../../interfaces/menu.interface";
import { withLayout } from "../../layout/Layout";


const firstCategory = 0


function CoursesPage ( { firstCategory }: CoursesPageProps ): JSX.Element {
    return (
        <>
            CoursesPage: {firstCategory}
        </>
    )
}

export default withLayout(CoursesPage)

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: firstLevelMenu.map(menu => '/' + menu.route),
        fallback: true
    }
}

export const getStaticProps: GetStaticProps<CoursesPageProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
    if (!params) {
        return {
            notFound: true
        }
    }

    const firstCategoryItem = firstLevelMenu.find(menu => menu.route == params.type)
    if (!firstCategoryItem) {
        return {
            notFound: true
        }
    }

    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
        firstCategory: firstCategoryItem.id
    })
    

    return {
        props: {
            menu,
            firstCategory,
        },
        revalidate: 3600
    }
}
  

interface CoursesPageProps extends Record<string, unknown>{
    menu: MenuItem[];
    firstCategory: number;
}
