export interface Paginate<T> {
    data: T[];
    first: number;
    prev: number;
    next: number;
    last: number;
    pages: number;
    items: number;
    total: number;
}

export interface Product {
    id: number;
    title: string;
    slug: string;
    price: number;
    duration: string;
    tag: string;
    imageUrl: string;
    category: string;
    visitedCount: number;
    date: string;
    author: string;
    city: string;
    country: string;
    content: string;
    rating: number;
    reviewCount: number;
    discount: number;
}
