export interface Comment {
    title: string;
    comment: string;
    rating: number;
    reviewCount: number;
    date: string;
    user: {
        name: string;
        email: string;
    };
}
