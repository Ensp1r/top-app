export enum TopLevelCategory {
    Courses,
    Services,
    Books,
    Products,
}

export interface TopPageAdventage {
    _id: string;
    title: string;
    description: string;
}

export interface HhData {
    _id: string;
    count: number;
    juniorSalary: number;
    middleSalary: number;
    seniorSalary: number;
    updateAt: Date;
}

export interface TopPageModel {
    tags: string[];
    _id: string;
    secondSalary: string;
    alias: string;
    title: string;
    category: string;
    seoText?: string;
    tagsTitle: string;
    metaTitle: string;
    metaDescription: string;
    firstCategory: TopLevelCategory;
    advantages: TopPageAdventage[];
    createdAt: Date;
    updatedAt: Date;
    hh?: HhData;
}