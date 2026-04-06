import type { NextApiRequest, NextApiResponse } from 'next';
import { MenuItem } from '../../../interfaces/menu.interface';

const mockMenuData: MenuItem[] = [
  {
    _id: { secondCategory: 'Дизайн' },
    pages: [
      {
        alias: 'photoshop',
        title: 'Photoshop для начинающих',
        _id: '1',
        category: 'design'
      },
      {
        alias: 'figma',
        title: 'Figma для дизайнеров',
        _id: '2',
        category: 'design'
      }
    ]
  },
  {
    _id: { secondCategory: 'Веб-разработка' },
    pages: [
      {
        alias: 'react',
        title: 'React для профессионалов',
        _id: '3',
        category: 'webdev'
      },
      {
        alias: 'typescript',
        title: 'TypeScript: полный курс',
        _id: '4',
        category: 'webdev'
      }
    ]
  }
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MenuItem[] | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { firstCategory } = req.body;

    res.status(200).json(mockMenuData);
  } catch (error: any) {
    console.error('API Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
}