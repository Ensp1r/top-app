import type { NextApiRequest, NextApiResponse } from 'next';
import { ProductModel } from '../../../interfaces/product.interface';

const mockProducts: ProductModel[] = [
  {
    _id: '1',
    categories: ['javascript', 'typescript', 'react', 'nodejs', 'webdev', 'programming'],
    tags: ['tutorial'],
    title: 'Product 1',
    link: 'https://example.com',
    price: 9900,
    credit: 0,
    oldPrice: 14900,
    description: 'Test',
    characteristics: [
      {
        name: 'Level',
        value: 'Beginner',
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 0,
    image: 'https://placehold.co/600x400',
    initialRating: 4,
    reviews: [],
    reviewAvg: 0,
    reviewCount: 0,
    advantages: 'Good',
  },
  {
    _id: '2',
    categories: ['javascript', 'typescript', 'react', 'nodejs', 'webdev', 'programming'],
    tags: ['tutorial'],
    title: 'Product 2',
    link: 'https://example.com',
    price: 990,
    credit: 0,
    oldPrice: 1490,
    description: 'Test 2',
    characteristics: [
      {
        name: 'Level',
        value: 'Junior',
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 0,
    image: 'https://placehold.co/600x400',
    initialRating: 1,
    reviews: [],
    reviewAvg: 0,
    reviewCount: 0,
    advantages: 'Good',
  },
  {
    _id: '3',
    categories: ['javascript', 'react', 'nodejs', 'webdev', 'programming'],
    tags: ['tutorial'],
    title: 'Product 3',
    link: 'https://example.com',
    price: 1099,
    credit: 0,
    oldPrice: 1949,
    description: 'Test',
    characteristics: [
      {
        name: 'Level',
        value: 'Middle',
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 0,
    image: 'https://placehold.co/600x400',
    initialRating: 5,
    reviews: [],
    reviewAvg: 0,
    reviewCount: 0,
    advantages: 'Good',
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