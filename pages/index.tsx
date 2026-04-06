import axios from 'axios';
import { GetStaticProps } from "next";
import { JSX, useState } from "react";
import { Button, Htag, P, Rating, Tag } from "../components";
import { MenuItem } from '../interfaces/menu.interface';
import { withLayout } from "../layout/Layout";

function Home( { menu, firstCategory }: HomeProps ): JSX.Element {
    const [rating, setRating] = useState<number>(0)

    const [counter, setCounter] = useState<number>(0);
    return (
        <>
            <Htag tag='h1'>{counter}</Htag>
            <Button appearance='primary' arrow="right" onClick={() => setCounter(x => x +1)}>Click on me</Button>
            <Button appearance='ghost' arrow='right'>Click on me</Button>
            <P size='s' >Example</P>
            <Tag size='m' color='green'>green</Tag>
            <Tag size='s'>ghost</Tag>
            <Tag size='m' color='red'>red</Tag>
            <Rating rating={rating} isEditable setRating={setRating}/>
            
        </>
    )
}

export default withLayout(Home)
  

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    const firstCategory = 0;
    const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
        firstCategory
    })

    return {
        props: {
            menu,
            firstCategory
        },
        revalidate: 3600
    }
}

interface HomeProps extends Record<string, unknown>{
    menu: MenuItem[];
    firstCategory: number;
}