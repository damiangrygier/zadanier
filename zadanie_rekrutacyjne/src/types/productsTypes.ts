export interface IProductCategory{
    id: number;
    name: string;
    image: string;
}
export interface IProduct {
    id?: number;
    title: string;
    price: number;
    description: string;
    category?: IProductCategory;
    categoryId?: number;
    images: string[];
}

export interface IProductStory {
    products: IProduct[]
}

export interface ICategoriesStory {
  categories: IProductCategory[]
}
