import type { NextApiRequest, NextApiResponse } from 'next';
import { ProductModel } from '../../../interfaces/product.interface';

const mockProducts: ProductModel[] = [
  {
    _id: '1',
    categories: ['javascript', 'typescript', 'react', 'nodejs', 'webdev', 'programming'],
    tags: ['tutorial'],
    title: 'TypeScript с нуля до PRO',
    link: 'https://example.com',
    price: 28000,
    credit: 5600,
    oldPrice: 49000,
    description: 'Студенты изучают полный цикл работы с TypeScript: типизацию, интерфейсы, классы, generics, работу с Node.js и фронтенд-фреймворками. Курс сочетает hard skills — реальное программирование и отладку кода, и soft skills — работа в команде, презентация решений. Выпускники готовы к позициям junior/middle разработчика.',
    characteristics: [
      {
        name: 'Документ об окончании',
        value: 'Диплом',
      },
      {
        name: 'Сложность',
        value: 'Начальная/средняя',
      },
      {
        name: 'Длительность',
        value: '5 месяцев',
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 0,
    image: 'https://placehold.co/70x70',
    initialRating: 4,
    reviews: [
      {
        _id: 'r1',
        name: 'Алексей',
        title: 'Отличный курс',
        description: 'Очень понравился подход к обучению, всё структурировано.',
        rating: 5,
        createdAt: new Date('2023-03-10T12:00:00Z'),
      },
      {
        _id: 'r2',
        name: 'Марина',
        title: 'Хорошо для старта',
        description: 'Хорошо объясняются основы TypeScript.',
        rating: 4,
        createdAt: new Date('2023-04-22T15:45:00Z'),
      },
    ],
    reviewAvg: 5,
    reviewCount: 2,
    advantages: 'Много практики, проекты для портфолио, поддержка наставников',
    disadvantages: 'Некоторые темы требуют самостоятельного повторного изучения',
  },
  {
    _id: '2',
    categories: ['javascript', 'typescript', 'react', 'nodejs', 'webdev', 'programming'],
    tags: ['tutorial'],
    title: 'TypeScript для фронтенд-разработки',
    link: 'https://example.com',
    price: 25000,
    credit: 5000,
    oldPrice: 36000,
    description: 'Студенты погружаются в использование TypeScript с React, Angular и Vue, изучают строгую типизацию и современные паттерны разработки. Курс включает hard skills — компоненты, хуки, типы для API, и soft skills — код-ревью, совместная работа над проектами.',
    characteristics: [
      {
        name: 'Документ об окончании',
        value: 'Сертификат',
      },
      {
        name: 'Сложность',
        value: 'Начальная/средняя',
      },
      {
        name: 'Длительность',
        value: '4 месяцa',
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 0,
    image: 'https://placehold.co/70x70',
    initialRating: 1,
    reviews: [
      {
        _id: 'r3',
        name: 'Игорь',
        title: 'Полезный курс',
        description: 'Много практических заданий, которые реально помогают.',
        rating: 5,
        createdAt: new Date('2023-03-12T10:15:00Z'),
      },
      {
        _id: 'r4',
        name: 'Ольга',
        title: 'Средне',
        description: 'Немного не хватает глубины по React.',
        rating: 3,
        createdAt: new Date('2023-04-01T09:20:00Z'),
      },
      {
        _id: 'r5',
        name: 'Дмитрий',
        title: 'Неплохо',
        description: 'Курс понравился, но хотелось бы больше проектов.',
        rating: 4,
        createdAt: new Date('2023-04-15T14:45:00Z'),
      },
      {
        _id: 'r6',
        name: 'Елена',
        title: 'Очень информативно',
        description: 'Много полезной информации по Node.js и API.',
        rating: 5,
        createdAt: new Date('2023-03-18T11:00:00Z'),
      },
    ],
    reviewAvg: 4,
    reviewCount: 4,
    advantages: 'Практические задания, проекты, работа в командных репозиториях',
    disadvantages: 'Быстрое освоение некоторых тем требует самостоятельной практики',
  },
  {
    _id: '3',
    categories: ['javascript', 'react', 'nodejs', 'webdev', 'programming'],
    tags: ['tutorial'],
    title: 'TypeScript для Node.js и Backend',
    link: 'https://example.com',
    price: 30000,
    credit: 6000,
    oldPrice: 60000,
    description: 'Студенты изучают использование TypeScript для серверной разработки: Express, NestJS, базы данных, API и микросервисы. Курс сочетает hard skills — архитектура приложений, типизация и тестирование, и soft skills — работа с документацией и командная разработка.',
    characteristics: [
      {
        name: 'Документ об окончании',
        value: 'Диплом',
      },
      {
        name: 'Сложность',
        value: 'Средняя',
      },
      {
        name: 'Длительность',
        value: '6 месяцев',
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 0,
    image: 'https://placehold.co/70x70',
    initialRating: 1,
    reviews: [
      {
        _id: 'r7',
        name: 'Сергей',
        title: 'Хороший курс',
        description: 'Понравилась практическая часть, теория тоже полезна.',
        rating: 4,
        createdAt: new Date('2023-03-25T13:15:00Z'),
      },
      {
        _id: 'r8',
        name: 'Наталья',
        title: 'Довольно сложно',
        description: 'Курс требует базового опыта в JS, но материал отличный.',
        rating: 4,
        createdAt: new Date('2023-04-05T16:40:00Z'),
      },
      {
        _id: 'r9',
        name: 'Владимир',
        title: 'Рекомендую',
        description: 'Полезные проекты и разбор реальных кейсов.',
        rating: 5,
        createdAt: new Date('2023-04-12T09:30:00Z'),
      },
    ],
    reviewAvg: 4,
    reviewCount: 3,
    advantages: 'Полный стек backend-проектов, наставники и разбор реальных кейсов',
    disadvantages: 'Требуется базовое знание JavaScript для комфортного прохождения',
  },
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductModel[] | { error: string }>
) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { category, limit = 10 } = req.body ?? {};

    if (!category || typeof category !== 'string') {
      return res.status(400).json({ error: 'Category is required' });
    }

    const filtered = mockProducts
      .filter((p) => p.categories.includes(category))
      .slice(0, Number(limit) || 10);

    return res.status(200).json(filtered);
  } catch (error: any) {
    return res.status(500).json({ error: error?.message || 'Internal server error' });
  }
}