import { NextApiRequest, NextApiResponse } from 'next';
import { TopPageModel } from '../../../interfaces/page.interface';

const mockPages: TopPageModel[] = [
  {
    tags: ['design', 'tutorial'],
    _id: '1',
    secondSalary: 'Middle',
    alias: 'photoshop',
    title: 'Photoshop для начинающих',
    category: 'design',
    seoText: 'Полный курс по Adobe Photoshop для начинающих дизайнеров. Научитесь работать со слоями, фильтрами и создавать профессиональные изображения.',
    tagsTitle: 'Навыки для этого курса',
    metaTitle: 'Photoshop курс - Обучение с нуля',
    metaDescription: 'Полное обучение Photoshop для начинающих. Научитесь создавать графику и редактировать фото.',
    firstCategory: 0, 
    advantages: [
      {
        _id: '1',
        title: 'Понятные уроки',
        description: 'Доступное объяснение сложных концепций даже для полных новичков'
      },
      {
        _id: '2',
        title: 'Практические проекты',
        description: 'Создавайте реальные проекты параллельно с обучением'
      }
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    hh: {
      _id: '1',
      count: 50,
      juniorSalary: 40000,
      middleSalary: 80000,
      seniorSalary: 120000,
      updateAt: new Date()
    }
  },
  {
    tags: ['web', 'tutorial'],
    _id: '2',
    secondSalary: 'Senior',
    alias: 'react',
    title: 'React для профессионалов',
    category: 'webdev',
    seoText: 'Продвинутый курс по React с практическими примерами и real-world паттернами разработки.',
    tagsTitle: 'Требуемые навыки',
    metaTitle: 'React курс - Профессиональная разработка',
    metaDescription: 'Освойте React на высоком уровне. Изучите hooks, context, performance optimization.',
    firstCategory: 0,
    advantages: [
      {
        _id: '3',
        title: 'Production-ready код',
        description: 'Примеры из реальных production приложений'
      },
      {
        _id: '4',
        title: 'Современные паттерны',
        description: 'Изучите latest best practices React ecosystem'
      }
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    hh: {
      _id: '2',
      count: 150,
      juniorSalary: 60000,
      middleSalary: 120000,
      seniorSalary: 200000,
      updateAt: new Date()
    }
  },
  {
    tags: ['design', 'ui'],
    _id: '3',
    secondSalary: 'Middle',
    alias: 'figma',
    title: 'Figma: дизайн интерфейсов',
    category: 'design',
    seoText: 'Полный курс по Figma для создания современных интерфейсов. От базики до продвинутых техник прототипирования.',
    tagsTitle: 'Содержание курса',
    metaTitle: 'Figma курс - UI/UX дизайн',
    metaDescription: 'Научитесь создавать прототипы в Figma. Изучите компоненты, автоматизацию и collaboration.',
    firstCategory: 0,
    advantages: [
      {
        _id: '5',
        title: 'Командная работа',
        description: 'Научитесь работать в команде с другими дизайнерами'
      }
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    hh: {
      _id: '3',
      count: 75,
      juniorSalary: 45000,
      middleSalary: 90000,
      seniorSalary: 140000,
      updateAt: new Date()
    }
  },
  {
    tags: ['programming', 'tutorial'],
    _id: '4',
    secondSalary: 'Middle',
    alias: 'typescript',
    title: 'TypeScript: полный курс',
    category: 'typescript',
    seoText: 'Изучите TypeScript от основ до продвинутых типов. Научитесь писать типобезопасный код.',
    tagsTitle: 'Предварительные знания',
    metaTitle: 'TypeScript курс - Полное руководство',
    metaDescription: 'Полный курс TypeScript. Типы, интерфейсы, generics, утилиты для типов.',
    firstCategory: 0,
    advantages: [
      {
        _id: '6',
        title: 'Типобезопасность',
        description: 'Ловите ошибки на этапе разработки'
      },
      {
        _id: '7',
        title: 'Лучшая IDE поддержка',
        description: 'Автодополнение и рефактор��нг работают лучше'
      }
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    hh: {
      _id: '4',
      count: 120,
      juniorSalary: 55000,
      middleSalary: 110000,
      seniorSalary: 180000,
      updateAt: new Date()
    }
  }
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TopPageModel | { error: string }>
) {
  const { alias } = req.query;

  if (!alias || typeof alias !== 'string') {
    return res.status(400).json({ error: 'Alias is required.' });
  }

  try {
    const page = mockPages.find(p => p.alias === alias);

    if (!page) {
      return res.status(404).json({ error: 'Page not found.' });
    }

    return res.status(200).json(page);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch page data.' });
  }
}