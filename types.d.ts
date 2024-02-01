import {resolveCaa} from "node:dns";

export interface Category{
    id: string;
    title: string;
    description: string;
}

export type CategoryWithoutId = Omit<Category, 'id'>;

export interface Location {
    id: string;
    name: string;
    description: string;
}

export type LocationWithoutId = Omit<Location, 'id'>;

export interface Item {
    id: string;
    category_id: string;
    location_id: string;
    name: string;
    description: string;
    image: string | null;
}

export type ItemWithoutId = Omit<Item, 'id'>;