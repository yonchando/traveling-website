import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

export interface Feature {
    id: number;
    title: string;
    content?: string;
    price: string;
    originalPrice?: string;
    duration: string;
    tag: string;
    imageUrl: string;
    category: string;
    date?: string;
    author?: string | undefined;
    rating?: number;
    reviewCount?: number;
}

@Injectable({
    providedIn: 'root',
})
export class HomeService {
    getCategories() {
        return of([
            {
                id: 'adventure',
                title: 'Adventure',
            },
            {
                id: 'nature',
                title: 'Nature',
            },
            {
                id: 'food',
                title: 'Food',
            },
        ]);
    }

    getFeatures() {
        return of<Feature[]>([
            {
                id: 1,
                title: `Centipede Tour - Guided ArizonaDesert Tour by ATV`,
                price: '$189.25',
                duration: '4 days 3 nights',
                tag: 'Paris, France',
                originalPrice: '$229.25',
                imageUrl: 'assets/images/home/features/image.png',
                category: 'adventure',
                rating: 2.8,
                reviewCount: 269,
                content: `The Phi Phi archipelago is a must-visit while in Phuket, and this speedboat trip.`,
            },
            {
                id: 2,
                title: `All Inclusive Ultimate Circle Island`,
                price: '$771',
                originalPrice: '$1099',
                duration: '4 days',
                tag: 'New York, USA',
                imageUrl: 'assets/images/home/features/image-1.png',
                category: 'adventure',
                rating: 3,
                reviewCount: 200,
            },
            {
                id: 3,
                title: `Day Tour with Lunch`,
                price: '$189.25',
                duration: '4 days',
                tag: 'Paris, France',
                imageUrl: 'assets/images/home/features/image-2.png',
                category: 'adventure',
                rating: 3.5,
                reviewCount: 300,
            },
            {
                id: 4,
                title: `Centipede Tour - Guided Arizona Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex iure laboriosam laborum odit placeat, voluptatum.`,
                price: '$943',
                duration: '4 days',
                tag: 'London, UK',
                imageUrl: 'assets/images/home/features/image-3.png',
                category: 'adventure',
                rating: 3,
                reviewCount: 121,
            },
            {
                id: 5,
                title: `Centipede Tour - Guided Arizona Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex iure laboriosam laborum odit placeat, voluptatum.`,
                price: '$943',
                duration: '4 days',
                tag: 'London, UK',
                imageUrl: 'assets/images/home/features/n-image.png',
                category: 'nature',
            },
            {
                id: 6,
                title: `Centipede Tour - Guided Arizona Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex iure laboriosam laborum odit placeat, voluptatum.`,
                price: '$943',
                duration: '4 days',
                tag: 'London, UK',
                imageUrl: 'assets/images/home/features/n-image-1.png',
                category: 'nature',
            },
            {
                id: 7,
                title: `Centipede Tour - Guided Arizona Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex iure laboriosam laborum odit placeat, voluptatum.`,
                price: '$943',
                duration: '4 days',
                tag: 'London, UK',
                imageUrl: 'assets/images/home/features/n-image-2.png',
                category: 'nature',
            },
            {
                id: 8,
                title: `Centipede Tour - Guided Arizona Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex iure laboriosam laborum odit placeat, voluptatum.`,
                price: '$943',
                duration: '4 days',
                tag: 'London, UK',
                imageUrl: 'assets/images/home/features/n-image-3.png',
                category: 'nature',
            },
            {
                id: 9,
                title: `Centipede Tour - Guided Arizona Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex iure laboriosam laborum odit placeat, voluptatum.`,
                price: '$943',
                duration: '4 days',
                tag: 'London, UK',
                imageUrl: 'assets/images/home/features/f-image.png',
                category: 'food',
            },
            {
                id: 10,
                title: `Centipede Tour - Guided Arizona Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex iure laboriosam laborum odit placeat, voluptatum.`,
                price: '$943',
                duration: '4 days',
                tag: 'London, UK',
                imageUrl: 'assets/images/home/features/f-image-1.png',
                category: 'food',
            },
            {
                id: 11,
                title: `Centipede Tour - Guided Arizona Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex iure laboriosam laborum odit placeat, voluptatum.`,
                price: '$943',
                duration: '4 days',
                tag: 'London, UK',
                imageUrl: 'assets/images/home/features/f-image-2.png',
                category: 'food',
            },
            {
                id: 12,
                title: `Centipede Tour - Guided Arizona Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex iure laboriosam laborum odit placeat, voluptatum.`,
                price: '$943',
                duration: '4 days',
                tag: 'London, UK',
                imageUrl: 'assets/images/home/features/f-image-3.png',
                category: 'food',
            },
        ]);
    }

    getArticles() {
        return of<Feature[]>([
            {
                id: 1,
                title: `Kenya vs Tanzania Safari: The Better African`,
                price: '$943',
                duration: '4 days',
                tag: 'Trips',
                imageUrl: 'assets/images/home/articles/image.png',
                category: 'food',
                date: 'April 06 2023',
                author: 'Ali Tufan',
            },
            {
                id: 2,
                title: `Safari Experience`,
                price: '$943',
                duration: '4 days',
                tag: 'Trips',
                imageUrl: 'assets/images/home/articles/image-1.png',
                category: 'food',
                date: 'April 07 2023',
                author: 'Emily Johnson',
            },
            {
                id: 3,
                title: `Exploring the Serengeti: A Wildlife Adventure`,
                price: '$943',
                duration: '4 days',
                tag: 'Trips',
                imageUrl: 'assets/images/home/articles/image-2.png',
                category: 'food',
                date: 'April 08 2023',
                author: 'Maxwell Rhodes',
            },
        ]);
    }

    topAttractions() {
        return of([
            {
                id: 1,
                title: 'Antelope Canyon',
                imageUrl:
                    'assets/images/home/top-attractions/antelope-canyon.png',
                visitedCount: '100+ Tours',
            },
            {
                id: 2,
                title: 'Colosseum',
                imageUrl: 'assets/images/home/top-attractions/colosseum.png',
                visitedCount: '100+ Tours',
            },
            {
                id: 3,
                title: 'Eiffel tower',
                imageUrl: 'assets/images/home/top-attractions/eiffel-tower.png',
                visitedCount: '100+ Tours',
            },
            {
                id: 4,
                title: 'Louvre',
                imageUrl: 'assets/images/home/top-attractions/louvre.png',
                visitedCount: '100+ Tours',
            },
            {
                id: 5,
                title: 'National September 11 Memorial',
                imageUrl:
                    'assets/images/home/top-attractions/national-september-11-memorial.png',
                visitedCount: '100+ Tours',
            },
            {
                id: 6,
                title: 'Statue of Liberty',
                imageUrl:
                    'assets/images/home/top-attractions/statue-of-liberty.png',
                visitedCount: '100+ Tours',
            },
            {
                id: 7,
                title: 'Stonehenge',
                imageUrl: 'assets/images/home/top-attractions/stonehenge.png',
                visitedCount: '100+ Tours',
            },
            {
                id: 8,
                title: 'Tower of London',
                imageUrl:
                    'assets/images/home/top-attractions/tower-of-london.png',
                visitedCount: '100+ Tours',
            },
            {
                id: 9,
                title: 'Vatican Museums',
                imageUrl:
                    'assets/images/home/top-attractions/vatican-museums.png',
                visitedCount: '100+ Tours',
            },
        ]);
    }

    features = toSignal(this.getFeatures());
    articles = toSignal(this.getArticles());

    getAll() {
        return [...(this.features() ?? []), ...(this.articles() ?? [])];
    }
}
